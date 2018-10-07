var express = require('express');
var User = require('./models/user');
var Topic = require('./models/topic');
var md5 = require('blueimp-md5');

var router = express.Router();

router.get('/', function (req, res) {
    // console.log(req.session.user)
    res.render('index.html', {
        user: req.session.user
    })
});

router.get('/login', function (req, res) {
    res.render('login.html')
});

router.post('/login', function (req, res) {
    // 1. 获取表单数据
    // 2. 查询数据库用户名密码是否正确
    // 3. 发送响应数据
    var body = req.body;
    User.findOne({
        email: body.email,
        password: md5(md5(body.password))
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }

        // 如果邮箱和密码匹配，则 user 是查询到的用户对象，否则就是 null
        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: 'Email or password is invalid.'
            })
        }

        // 用户存在，登陆成功，通过 Session 记录登陆状态
        req.session.user = user;

        res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
    })
});

router.get('/settings/profile',function (req,res) {
		res.render('settings/profile.html',{
            user:req.session.user
        });
});

router.post('/settings/profile',function (req,res) {
	var body = req.body;
	User.update({email:body.email,nickname:body.nickname},{self_introdution:body.self_introdution},function(err){
		if(err){
			return res.status(500).json({
                success: false,
                message: '服务端错误'
            })
		}
		 res.status(200).json({
			err_code: 0,
			message: 'OK'
		})
	})
});

router.post('/settings/admin',function(req,res){
	 // 1. 获取表单数据
    // 2. 查询数据库用户名密码是否正确
    // 3. 发送响应数据
    var body = req.body;
    User.findOne({
        email: body.email,
        password: md5(md5(body.now_password))
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }

        // 如果邮箱和密码匹配，则 user 是查询到的用户对象，否则就是 null
        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: 'Email or password is invalid.'
            })
        }

		if(body.new_password1 !== body.new_password2){
			return res.status(200).json({
                err_code: 2,
                message: 'Two passwords are inconsistent.'
            })
		}

		User.update({email:body.email},{password:md5(md5(body.new_password1))},function(err){
			if(err){
				return res.status(500).json({
                success: false,
                message: '服务端错误'
            })}
			console.log("成功");
			 res.status(200).json({
				err_code: 0,
				message: 'OK'
			})
		})
    })
});

router.get('/settings',function (req,res) {
    res.render('settings/index.html',{
		user:req.session.user
	});
});

router.get('/settings/admin',function (req,res) {
    res.render('settings/admin.html',{
        user:req.session.user
    });
});

router.get('/details/control',function (req,res) {
    res.render('details/control.html');
});
router.get('/details/warehouse',function (req,res) {
    res.render('details/warehouse.html');
});
router.get('/details/transform',function (req,res) {
    res.render('details/transform.html');
});

router.get('/topics/show',function (req,res) {
    Topic.find(function(err,data){
		if(err){
			console.log(err);
		}else{
			res.render('topic/show.html',{
				topic:data,
				user:req.session.user
		    });
		}
	});
});

router.get('/topics/new',function (req,res) {
    res.render('topic/new.html',{
        user:req.session.user
    });
});

router.post('/topics/new',function(req,res){
	var body = req.body;
	Topic.create(body,function(err,data){
		if(err){
			return res.status(500).json({
                success: false,
                message: '服务端错误'
            })
		}
		 res.status(200).json({
			err_code: 0,
			message: 'OK'
		})
	})
	
});

router.get('/register', function (req, res) {
	res.render('register.html')
});

router.post('/register', function (req, res) {
    // 1. 获取表单提交的数据
    //    req.body
    // 2. 操作数据库
    //    判断改用户是否存在
    //    如果已存在，不允许注册
    //    如果不存在，注册新建用户
    // 3. 发送响应
    var body = req.body;
    User.findOne({
        $or: [{
            email: body.email
        },
            {
                nickname: body.nickname
            }
        ]
    }, function (err, data) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: '服务端错误'
            })
        }
         console.log(data)
        if (data) {
            // 邮箱或者昵称已存在
            return res.status(200).json({
                err_code: 1,
                message: 'Email or nickname aleady exists.'
            });
            return res.send("邮箱或者昵称已存在，请重试");
        }

        // 对密码进行 md5 重复加密
        body.password = md5(md5(body.password));

        new User(body).save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'Internal error.'
                })
            }

            // 注册成功，使用 Session 记录用户的登陆状态
            req.session.user = user;

            // Express 提供了一个响应方法：json
            // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
            res.status(200).json({
                err_code: 0,
                message: 'OK'
            })

            // 服务端重定向只针对同步请求才有效，异步请求无效
            // res.redirect('/')
        })
    })
});

router.get('/loginout', function (req, res) {
    // 清除登陆状态
    req.session.user = null;

    // 重定向到登录页
    res.redirect('/login');
});

module.exports = router;
