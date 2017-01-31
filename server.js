var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var parserJson = bodyParser.json();
var Properties = require('./models/properties');
var Pictures = require('./models/pictures');
var fileUpload = require('express-fileupload');
var app = express();
app.use(express.static('public'));
app.use(fileUpload());
const {PORT, DATABASE_URL} = require('./config');



app.post('/list-properties', parserJson, function(request,response){
Properties.create({
  name:request.body.name,
  city:request.body.city,
  address:request.body.address,
  capacity:request.body.capacity,
  available_date_from:request.body.available_date_from,
  available_date_to:request.body.available_date_to,
  picture:request.body.picture
},function(error,result){
  if(error){
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



app.post('/upload', function(req, res) {
 console.log(req)
 var sampleFile;

 if (!req.files) {
   res.send('No files were uploaded.');
   return;
 }
// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
 sampleFile = req.files.sampleFile;
 var fileName=req.files.sampleFile.name;
 //Use the mv() method to place the file somewhere on your server
 //sampleFile.mv('uploads/filename.jpg', function(err) {
  sampleFile.mv('uploads/'+fileName, function(err) {
   if (err) {
     res.status(500).send(err);
   }
   else {
     res.send('File uploaded!');
   }
 });
});



/*******************************

app.post('/upload', function(request, response){
  var uploadedFile;
  if(!request.files){
    return response.send('problem with upload');
    
    //return response.status(500).json({message:'no uploaded file'});
  }
  uploadedFile=request.files.fileUpload;
  var fileName=request.files.fileUpload.name;
  uploadedFile.mv('./uploads/'+fileName, function(error){
    if(error){
  //return response.status(500).json({message:'no uploaded file'}); 
    return response.send('problem with upload'); 
  }
  else{
  return response.status(201).json({message:'file uploaded'});
  }

  });
  

});
*************************/


app.get('/owner', function(request, response){
  response.sendFile(__dirname + "/public/html/owner.html");
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

// `closeServer` function is here in original code

if (require.main === module) {
  runServer().catch(err => console.error(err));
};
exports.app = app;