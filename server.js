var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var parserJson = bodyParser.json();
var Properties = require('./models/properties');
var Users = require('./models/users');
var Reservations = require('./models/reservations');
var uuid = require('uuid/v4');
const multer = require('multer');
const nodemailer = require('nodemailer');

var app = express();
app.use(express.static('public'));
const {PORT, DATABASE_URL} = require('./config');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const storage = multer.diskStorage({
 destination: function (req, file, cb) {
   cb(null, "./public/uploads/");
 },
 filename: function (req, file, cb, propertyId) {
    var fileName = uuid()+'.jpg';
    saveFileToDB(fileName, req.body.propertyId);
     cb(null, fileName);
 }
});
const upload = multer({ storage: storage });




// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'contactus.workablespaces@gmail.com',
        pass: 'forWorkableSpaces'
    }
});

app.post('/contactus',parserJson, function(request, response){
  let mailOptions = {
    from: '"contactus 👻" <contactus.workablespaces@gmail.com>', // sender address
    to: request.body.email, // list of receivers
    subject: 'Hello', // Subject line
    html: '<b>Hello '+ request.body.name+',<b><p> Thanks for contacting us. This is an automated email. One of our valuable team member will contact you within 24 hours.</p><p>Best wishes, <br>Team workable spaces.</p>' // plain text body
};
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return response.status(500).json({message:'server error'});;
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    return response.status(201).json(info.response);
});
});

app.post('/list-properties', parserJson, function(request,response){ 
    Properties.create({
      name:request.body.name,
      city:request.body.city,
      address:request.body.address,
      capacity:request.body.capacity,
      rate:request.body.rate,
      owner:request.body.userid,
      available_date_from:request.body.available_date_from,
      available_date_to:request.body.available_date_to,
      available_time_from:request.body.available_time_from,
      available_time_to:request.body.available_time_to,
      amenities:JSON.parse(request.body.amenities)
    },function(error,result){
      if(error){
        console.log(error);
        return response.status(500).json({message:'server error'});
      }
      response.status(201).json(result);
    });
});


app.get('/list-properties', function(req, res, next){
console.log("i am here ", req.query);
console.log("In between");
Properties.find(req.query, function(err, doc) {
  console.log(doc);
  if (err) return next(err);
  res.send(doc);
});
});

app.get('/list-properties/:id', function (req, res, next) {
  console.log("inside get by id", req.params.id);
  Properties.findById(req.params.id, function(err, doc) {
    if (err) return next(err);
    else {
      res.send(doc);
    }
  });
});

function saveFileToDB(fileName,propertyId){
  var propertyId = mongoose.Types.ObjectId(propertyId);
  Properties.findOneAndUpdate({'_id':propertyId}, {$push:{'picture':fileName}}, {safe:true,upsert: true},function(err){
      if(err){
        res.status(500).send(err);
      }
     });  
  //return false;
}

app.post('/upload',upload.single('file', null, saveFileToDB), function(req, res) {
   res.status(200).send(JSON.stringify({status: "SUCCESS"}));
});

app.get('/owner', function(request, response){
  response.sendFile(__dirname + "/public/html/owner.html");
});

app.get('/details', function(request, response){
  response.sendFile(__dirname + "/public/html/details.html");
});

app.get('/reviews', function(request, response){
  response.sendFile(__dirname + "/public/html/review.html");
});

app.post('/signup', parserJson, function(request,response){
Users.create({
  firstName:request.body.firstName,
  lastName:request.body.lastName,
  address:request.body.address,
  username:request.body.username,
  password:request.body.password,
  email:request.body.email
},function(error,result){
  if(error){
    console.log(error);
    return response.status(500).json({message:'server error'});
  }
  response.status(201).json(result);
});

});

app.post('/reservations', parserJson, function(request,response){
  Reservations.create({
    propertyId:request.body.propId,
    reservation_date:request.body.dateReserved,
    reservation_starttime:request.body.bookStTime,
    reservation_endtime:request.body.bookEndtime,
    reserved_by:request.body.userId
  }, function(error, result){
    if(error){
    console.log(error);
    return response.status(500).json({message:'server error'});
  }
  response.status(201).json(result);
  });
});

app.get('/reservations', function(request, response, next){
  Reservations.find(request.query, function(err, doc){
     console.log(doc);
  if (err) return next(err);
  response.send(doc);
  });

});

app.get('/users', function(req, res, next){
Users.find(req.query, function(err, doc) {
  console.log(doc);
  if (err) return next(err);
  res.send(doc);
});
});

app.get('/users/:id', function (req, res, next) {
  console.log("inside get by id", req.params.username);
  Users.findById(req.params.username, function(err, doc) {
    if (err) return next(err);
    else {
      res.send(doc);
    }
  });
});


app.get('/signup', function(request, response){
  response.sendFile(__dirname + "/public/html/signup.html");

});

app.get('/fileUpload', function(request, response){
  response.sendFile(__dirname + "/public/html/imageDrop.html");

});

app.get('/payment', function(request, response){
  response.sendFile(__dirname + "/public/html/payment.html");
});

app.delete('/list-properties/:id', (req, res) => {
  Properties
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.status(204).json({message: 'success'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});


let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};
exports.app = app;