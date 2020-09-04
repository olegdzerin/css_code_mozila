var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var flexRouter = require('./routes/flex');
var floatsRouter = require('./routes/floats');
var gridsRouter = require('./routes/grids');
var positioningRouter = require('./routes/positioning');


var app = express();
var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
  });
  app.engine('hbs', handlebars.engine);
  app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/positioning', positioningRouter);
app.use('/grids', gridsRouter);
app.use('/floats', floatsRouter);
app.use('/flex', flexRouter);
module.exports = app;
