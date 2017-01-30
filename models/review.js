var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
	reviewer:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	property:{type:mongoose.Schema.Types.ObjectId, ref: 'Property'},
	rating:{type:Number, require:true},
	comment:{type:String, require:false}
});

var Review = mongoose.model('Review', ReviewSchema);
module.exports=Review;