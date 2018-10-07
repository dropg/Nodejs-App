var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// 连接数据库
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  now_password: {
	type: String
  },
  new_password1: {
	type: String
  },
  new_password2: {
	type: String
  },
  created_time: {
    type: Date,
    // default：Date.now,不能写Data.now();
    // 当新建一个数据时，如果没有传递 create_time ，则 mongoose 就会调用 default 指定的Date.now 方法，使用其返回值作为默认值
    default: Date.now
  },
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  self_introdution: {
	type:String,
    default:''
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-default.png'
  },
  bio: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1
  },
  birthday: {
    type: Date
  },
  status: {
    type: Number,
    // 0 没有权限限制
    // 1 不可以评论
    // 2 不可以登录
    enum: [0, 1, 2],
    default: 0
  }
});

module.exports = mongoose.model('User', userSchema);
