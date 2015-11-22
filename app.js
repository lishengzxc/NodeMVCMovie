var express = require('express');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(express);

var path = require('path');
var port = 3000;
var app = express();
app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.listen(port);
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
    secret: 'ls',
    store: new mongoStore({
        url: 'mongodb://localhost/ls',
        collection: 'sid'
    })
}));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');

mongoose.connect('mongodb://localhost/ls');

if ('development' === app.get('env')) {
    app.set('showStackError', true);
    app.use(express.logger(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug', true);
}

require('./config/routes')(app);
