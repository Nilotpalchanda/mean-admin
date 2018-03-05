const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')
const keys = require ('./config/keys')
const authRoutes = require('./routes/auth-routes')
const dashboardRoutes = require('./routes/dashboard-routes')
// const profileRoutes = require('./routes/profile-routes')
const passportSetup = require('./config/passport-setup')
const port = process.env.PORT || 3000

//connect mongodb with mongoose

mongoose.connect(keys.mongodb.dbURI, (req, res) => {
    console.log('mongodb connected')
})

app.use(cookieSession({

    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]


}))

//initialze passoport

app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



app.listen(port)

console.log(`server listen port -> ${port}`)


app.get('/', (req, res) => {
    res.render('index')
})
//
app.get('/admin', (req, res) => {

    res.render('admin/login')
})
// app.get('/dash', (req, res) => {

//     res.render('admin/dash',{user:req.user})
// })
app.get('/profile', (req, res) => {

    res.render('admin/profile',{user:req.user})
})
//

app.get('/logout', (req, res) => {
   // res.send('logout happy to sea you next time')
   req.logout()
   res.redirect('/')
})

const authCheck = (req,res,next)=>{
  if(!req.user){
    // if user not login then redirect basrd on user details (req.user)
    res.render('admin/login')
  }else{
    // if login go to progile page
    next()
  }
}


app.get('/dash',authCheck,(req,res)=>{
  res.render('admin/dash',{user:req.user})
  //res.send('user name is :' + req.user.username)
})

// app.get('/add-post',(req,res)=>{
//   res.render('admin/addpost')
// })

app.use('/auth', authRoutes)
// app.use('/dash',profileRoutes)

app.use('/dash',dashboardRoutes)