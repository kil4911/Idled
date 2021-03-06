/**
 * @author King David Lawrence
 * @since 10/01/17
 */

var express = require('express'),
    app = express();
var path = require('path');
var logger = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var compress = require('compression');
var apiRouter = require('./app/routes/api')(express, mongoose);

// connect to our database (hosted locally)
mongoose.connect(config.database);
//uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization,x-access-token');
    res.setHeader('X-Powered-By', 'The tears of children');
    next();
});

app.use(compress({level: 7}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//app.options('/*', function(req, res){
//    res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
//    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
//    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with,x-access-token');
//});

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

//homepage
app.get('/', function(req, res){
    //res.send("Hello World");
    res.sendFile(path.join(__dirname, '/public/app/views/index.html'));
});

//uploader
app.get('/makepost', function(req, res){
    //res.send("Hello World");
    res.sendFile(path.join(__dirname, '/public/app/services/uploadTest/index.html'));
});

//card directive test
app.get('/testCard', function(req, res){
    //res.send("Hello World");
    res.sendFile(path.join(__dirname, '/public/app/views/newIndex.html'));
});

app.get('/testAudio', function(req, res){
    //res.send("Hello World");
    res.sendFile(path.join(__dirname, '/public/app/directives/testAudio.html'));
});

app.get('/gritzle', function(req, res){
    //res.send("Hello World");
    res.sendFile(path.join(__dirname, '/public/app/views/newIndex.html'));
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
        console.log('OJError: ' + err.stack);
    });
}

var server = app.listen(config.port);

server.timeout = 3600000;
console.log(app.get('env'));
console.log('Running on port' + config.port);
