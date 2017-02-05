var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var parserJson = bodyParser.json();
var Properties = require('./models/properties');
var Users = require('./models/users');
var Pictures = require('./models/pictures');
var fileUpload = require('express-fileupload');
var uuid = require('uuid/v4');
const multer = require('multer');
var app = express();
app.use(express.static('public'));
app.use(fileUpload());
const {PORT, DATABASE_URL} = require('./config');


/*var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    var sampleFile = req.files.sampleFile;
    var fileName = uuid()+'.jpg';
    callback(null, file.filename);
  }
});

var upload = multer({ storage : storage}).single('propertyPhoto');

app.get('/owner', function(request, response){
  response.sendFile(__dirname + "/public/html/owner.html");
});

app.post('/owner',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const storage = multer.diskStorage({
 destination: function (req, file, cb) {
   cb(null, __dirname + "/uploads/");
 },
 filename: function (req, file, cb) {
     cb(null, file.originalname)
 }
});
const upload = multer({ storage: storage });



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
      amenities:request.body.amenities
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



app.post('/upload',upload.single('file'), function(req, res) {
 var sampleFile;
 //var fn = "public/uploads/" + req.file.originalname;
  // console.log("uploaded ", fn);
  console.log("test.....");
  var fn = __dirname + "/uploads/" + req.file.originalname; 
  console.log("uploaded ", fn);
   res.status(200).send(JSON.stringify({status: "SUCCESS"}));




/*
 var userid = req.body.userid;
console.log(req);
 if (!req.files) {
   res.send('No files were uploaded.');
   return;
 }
// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
 sampleFile = req.files.sampleFile;
 var fileName = uuid()+'.jpg';
  console.log(userid);

//var userid = mongoose.Types.ObjectId(userid);
  Properties.findOneAndUpdate({'_id':userid}, {$push:{'picture':fileName}}, {safe:true,upsert: true},function(err){
      if(err){
        res.status(500).send(err);
      }
     });  
  //return false;
  sampleFile.mv('./public/uploads/'+fileName, function(err) {
   if (err) {
     res.status(500).send(err);
   }
   else { 
   // console.log("before append", res);
     // res.append("filename", fileName); 
     // console.log("after append", res);
     // res.redirect('./owner');
      res.send('File uploaded!');
   }
 });*/
});

app.get('/owner', function(request, response){
  response.sendFile(__dirname + "/public/html/owner.html");
});

app.get('/details', function(request, response){
  response.sendFile(__dirname + "/public/html/details.html");
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