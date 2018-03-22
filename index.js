const express = require('express');
const app = express();

// 加载hbs模块
var hbs = require('hbs');

// 指定模板文件的后缀名为html
app.set('view engine', 'html');

// 运行hbs模块
app.engine('html', hbs.__express);

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

app.get('/', function (req, res){
    res.render('index');
});


const server = app.listen(5000, function () {
    console.log("Express server listening on port: " + server.address().port + app.settings.env);
});



