var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReservationSchema = new Schema({
	propertyId:{type:String, require:true},
	reservation_date:{type:Date, default:Date.now},
	reservation_starttime:{type:String, require:true},
	reservation_endtime:{type:String, require:true},
	reserved_by:{type:mongoose.Schema.Types.ObjectId, ref:'User'}
});
var Reservation = mongoose.model('Reservation', ReservationSchema);
module.exports = Reservation;