var mongoose = require('mongoose');

// �������ݿ�
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
    // default��Date.now,����дData.now();
    // ���½�һ������ʱ�����û�д��� create_time ���� mongoose �ͻ���� default ָ����Date.now ������ʹ���䷵��ֵ��ΪĬ��ֵ
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
