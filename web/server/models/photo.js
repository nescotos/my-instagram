var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
  url : {type: String, required: true},
  createdAt : {type: Date, required: true, default: Data.now},
  likes : {type: Number, required: true, default: 0},
  description : {type: String},
  comments : [{type: Schema.Types.ObjectId, ref : 'Comments'}]
});

module.exports = mongoose.model('Photo', photoSchema);
