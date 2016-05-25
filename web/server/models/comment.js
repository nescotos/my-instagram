var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  createdAt : {type: Date, required: true, default: Data.now},
  content : {type: String, required: true},
  commenter : {type: Schema.Types.ObjectId, ref : 'User'}
});

module.exports = mongoose.model('Comment', commentSchema);
