#### Installation dependency package
1. Nodejs development framework and template engine: express, art-template, express-art-template
2. Front-end development framework: jquery, bootstrap
3. Information encryption plugin: blueimp-md5
4. Get post information: body-parser
5. Processing mongoDB database: mongoose
6. Plugin get the login statu: express-session

#### Run
1. Install nodejs and mongoDB database, and enter the `npm install` in the terminal to installation the packages that the project depends on.
2. Open the mongoDB database, enter the `node app.js` runtime server in the terminal, the project will automatically connect to the database.
3. You can log in to the administration page with the username: admin@itcast.com and password: 123456; you can also register for a new account via the registration button.

#### Description
1. This is a front-end hybrid development project, using nodejs to write the server, which can realize page jump and data interaction.
2. Use the express-session plugin to get the user's login status and implement a series of login, registration, setup, and logout functions.

#### 安装依赖包
1. nodejs开发框架和模板引擎: express, art-template, express-art-template
2. 前端开发框架: jquery, bootstrap
3. 信息加密插件: blueimp-md5
4. 获取post信息: body-parser
5. 处理mongoDB数据库; mongoose
6. 获取登录状态的插件: express-session

#### 运行
1. 安装nodejs和mongoDB数据库，并在终端输入`npm install`安装项目所依赖的包
2. 打开mongoDB数据库，在终端输入`node app.js`运行服务端，项目会自动连接数据库
3. 可以使用用户名： admin@itcast.com 和密码：123456，登录到管理页面；也可以通过注册按钮注册新的账号。

#### 说明
1. 这是一个前后端混合开发项目，使用nodejs编写服务端，可以实现页面跳转和数据交互
2. 通过使用express-session插件来获取用户的登录状态，并实现一系列的登录、注册、设置、退出功能。