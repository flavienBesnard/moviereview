var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var logger = require('morgan')
const tmdb = require('moviedb')('445ca8b8a196e69cdeb22e8b2ad82005')
var mongoStore = require('connect-mongo')(session)
var port = process.env.PORT || 3000
var app = express()
var dbUrl = 'mongodb://localhost/movie'
module.exports = require('./public/libs/moviedb');
mongoose.connect(dbUrl, { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true, autoIndex: false});
app.set('view engine', 'pug')
app.set('views', './app/views/pages')

app.use(bodyParser())
app.use(cookieParser())
app.use(session({

	secret: 'imooc',
			resave: true,
		saveUninitialized: true,
	store: new mongoStore({
		url: dbUrl,
		useNewUrlParser: true, 
		useUnifiedTopology: true 

		
	})
}))
const TMDb = require('moviedb')('445ca8b8a196e69cdeb22e8b2ad82005');
//odule.exports = TMDb
//TMDb.searchMovie({ query: 'Alien' }, (err, res) => {
  //console.log(res);
//});
if('development' ===  app.get('env')){
	app.set('showStackError', true)
	app.use(logger(':method :url :status'))
	app.locals.pretty = true
	mongoose.set('debug', true)
}


require('./config/routes')(app)

app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')
app.listen(port)


console.log('Start Server')
