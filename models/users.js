var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName:{type: String, require: true, unique:true},
	lastName:{type: String, require: true},
	address:{type:String, require:true},
	username:{type:String, require:true},
	password:{type:String, require:true}, 
	emailId:{type:String, require:true}
});

var User = mongoose.model('User', UserSchema);
module.exports= User;