const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')
const keys = require ('./config/keys')
const authRoutes = require('./routes/auth-routes')
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

//

app.get('/logout', (req, res) => {
   // res.send('logout happy to sea you next time')
   req.logout()
   res.redirect('/')
})
app.use('/auth', authRoutes)