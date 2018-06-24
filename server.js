const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromHeader('id');
opts.secretOrKey = 'secret';
// mock user
const user = {
    username: 'admin',
    password: 'admin',
    id: 1
}

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log('worked')
    done(null, user)
}))

app.use(passport.initialize())
app.use('/static', express.static('dist'));

app.post('/login', (req, res) => {
    if ((req.body.username == user.username) && (req.body.password == user.password)) {
        console.log(req.body)
        let token = jwt.sign(user, opts.secretOrKey)
        req.user = {user, token}
        res.cookie('token', token)
        res.json({user, token})
    } else {
        res.send('error')
    }
})

app.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log(req.user)
    res.send('It worked! User is is' + req.user.username)
})

app.get('/logout', (req, res) => {
    res.cookie('token', '')
    res.send('clean')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(3000, (call) => {
    console.log('listening port :3000')
})