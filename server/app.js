const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');
const User = require('./model/user');
const url = 'mongodb://localhost/blogDb';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
 
app.get('/api/user/login', (req, res) => {
    res.send('Hello World!')
})

passport.use(new LocalStrategy(
  function(username, password, done) {

  // Find the user by username.  If there is no user with the given
  // username, or the password is not correct, set the user to `false` to
  // indicate failure and set a flash message.  Otherwise, return the
  // authenticated `user`.

  findByUsername(username, function(err, user) {
      if (err) { return done(err); }
      if (!user) { 
          return done(null, false, { message: 'Unknown user ' + username }); 
      }
      if (user.password != password) { 
          return done(null, false, { message: 'Invalid password' }); 
      }
        return done(null, user);
      })
  }
));

app.use(passport.initialize());
app.use(passport.session());
 
app.post('/api/user/login', (req, res) => {
    mongoose.connect(url,{ useMongoClient: true }, function(err){
        if(err) throw err;
        User.find({
            username : req.body.username, password : req.body.password
        }, function(err, user){
            if(err) throw err;
            if(user.length === 1){  
                return res.status(200).json({
                    status: 'success',
                    data: user
                })
            } else {
                return res.status(200).json({
                    status: 'fail',
                    message: 'Login Failed'
                })
            }
             
        })
    });
})

//Passport Middleware - this was from https://www.youtube.com/watch?v=6pdFXmTfkeE
// app.use(passport.initialize());
// app.use(passport.session());

app.listen(3000, () => console.log('blog server running on port 3000!'))


