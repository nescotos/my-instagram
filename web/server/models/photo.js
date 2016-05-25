var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
  createdAt : {type: Date, required: true, default: Date.now},
  likes : {type: Number, required: true, default: 0},
  description : {type: String},
  comments : [{type: Schema.Types.ObjectId, ref : 'Comments'}]
});

module.exports = mongoose.model('Photo', photoSchema);
