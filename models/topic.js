var mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost/topics', { useMongoClient: true });

var Schema = mongoose.Schema;

var topicSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  created_time: {
    type: Date,
    // default：Date.now,不能写Data.now();
    // 当新建一个数据时，如果没有传递 create_time ，则 mongoose 就会调用 default 指定的Date.now 方法，使用其返回值作为默认值
    default: Date.now
  },
  message:{
	type:String,
	require:true
  },
  select:{
	type:String,
	require:true
  }
});

module.exports = mongoose.model('Topic', topicSchema);
