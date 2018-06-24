const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

/**
 * Passport js
 */
var jwt = require('jsonwebtoken');
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const app = express()

const PORT = 8081

app.set('trust proxy', 'loopback, 123.123.123.123') 

app.use(bodyParser())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors())

/**
 * Mock user
 */
let user = {
	username: 'admin',
	password: 'admin',
	id: 1
}

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromHeader('id');
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  return done(null, user);
}));

app.post('/login', function (req, res, next) {
	console.log('login', req.body.username, req.body.password)
	if ((req.body.username == user.username) && (req.body.password == user.password)) {
		var payload = {id: user.id};
		var token = jwt.sign(payload, opts.secretOrKey);
		res.cookie('token', token)
		return res.json({user, token});
	} else {
		res.status(401).json({message:"user not found"});
	}
})

app.get('/logout', (req, res) => {
	res.cookie('token', 'kek').json({ok: true})
})

app.get('/check', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.send({success: true})
})

app.listen(PORT, () => {
		console.log('server started')
})	
