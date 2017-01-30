var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PictureSchema = new Schema({
	path: { type: String, required: true }
});

var Picture = mongoose.model('Picture', PictureSchema);
module.exports = Picture;