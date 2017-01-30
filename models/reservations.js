var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReservationSchema = new Schema({
	reservation_date:{type:Date, default:Date.now},
	reservation_starttime:{type:Date, default:Date.now},
	reservation_endtime:{type:Date, default:Date.now},
	reserved_by:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
	status:{type:String,require:true}
});
var Reservation = mongoose.model('Reservation', ReservationSchema);
module.exports = Reservation;