const express = require('express');
const app = express();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const port = process.env.PORT || 9200

//middleware
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','ejs');
app.set('views','./views/pages')

passport.serializeUser((user,cb)=>{
    return cb(null,userProfile)
})
//passport facebook login
passport.use(new FacebookStrategy({
    clientID: "1234256383665227",
    clientSecret: "badd6205307e2b2d8f41fdf2ce713c83",
    callbackURL: "http://localhost:9200/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      userProfile = profile
   
      return cb(null, userProfile);    
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });



//routing
app.get('/',(req,res)=>{
    return res.render('login')
});

app.get('/profile',(req,res)=>{
    return res.send(userProfile)
});

app.get('/error',(req,res)=>{
    return res.send('Error while login!Please try again')
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})