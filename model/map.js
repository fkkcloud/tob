// grab the mongoose module
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
var schema = new mongoose.Schema({
	data    : {type : String, default: '', required: true},
	author  : {type : String, default: '', required: true},
	name    : {type : String, default: '', required: true},
	rate    : {type : Number, default: 0, required: false},
	date    : {type : Date, required: true, default: Date.now}
});
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('MapData', schema);
