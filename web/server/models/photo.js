var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
  createdAt : {type: Date, required: true, default: Date.now},
  likes : [{type: Schema.Types.ObjectId, ref : 'User'}],
  description : {type: String},
  comments : [{type: Schema.Types.ObjectId, ref : 'Comment'}]
});

module.exports = mongoose.model('Photo', photoSchema);
