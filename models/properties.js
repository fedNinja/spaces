var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PropertySchema = new Schema({
 name:{type:String,require:true},
 city:{type:String, require:true},
 address:{type:String,require:true},
 amenities:{type:[],require:false},
 capacity:{type:Number,require:true},
 picture:{type:[], require: false},
 rate:{type:Number, require:true},
 available_date_from:{type:Date, require:true},
 available_date_to:{type:Date, require:true},
 available_time_from:{type:String, require:true},
 available_time_to:{type:String, require:true},
 owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
 reservations:[{type:mongoose.Schema.Types.ObjectId, ref: 'Reservation'}],
 reviews:[{type:mongoose.Schema.Types.ObjectId, ref: 'Review'}]
});

var Property = mongoose.model('Property',PropertySchema);
module.exports = Property;