const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const GitHubStrategy = require('passport-github').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;
const keys = require('./keys')
const User = require('../models/user-model')

//serealized process store cookie and id means mongodb id

passport.serializeUser((user, done) => {

    done(null, user.id)

})


//deserialzed process grab the id from the cookie and say user is authenticate

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)

    })
})



passport.use(new GoogleStrategy({

    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret

}, (accessToken, refreshToken, profile, done) => {
    //passport callback function
    // console.log('callback function fiered--')
    //console.log(profile);
    
    User.findOne({ googleId: profile.id }).then((currentUser) => {

        if (currentUser) {
            //if exsist user in our db
            console.log('user exist and details is :' + currentUser)

            done(null, currentUser)
        } else {
            // if user not in our db then save the user in our db
            new User({
                username: profile.displayName,
                googleId: profile.id,
                thumbnail: profile._json.image.url
            }).save().then((newUser) => {
                console.log('new user created: ' + newUser)
                done(null, newUser)
            })

        }

    })

}))

// github

passport.use(new GitHubStrategy({
        clientID: 'ac5235f3862841dc826c',
        clientSecret: '4a7de666c57f6c0a73e1b2a683988d3cfc22c76f',
        callbackURL: 'https://socialoauthnode.herokuapp.com/auth/github/callback'
    },


    function(accessToken, refreshToken, profile, done) {
        console.log(profile);

        User.findOne({ githubId: profile.id }).then((currentUser) => {

            if (currentUser) {
                //if exsist user in our db
                console.log('user exist and details is :' + currentUser)

                done(null, currentUser)
            } else {
                // if user not in our db then save the user in our db
                new User({
                    username: profile.displayName,
                    githubId: profile.id,
                    thumbnail: profile._json.avatar_url
                }).save().then((newUser) => {
                    console.log('new user created: ' + newUser)
                    done(null, newUser)
                })

            }

        })

    }));

//twitter

passport.use(new TwitterStrategy({
        consumerKey: '4thdI7cygRTQzR2OKuKmqDSS1',
        consumerSecret: 'wbJbInZooOdZsLgL9FbnAUgGNeGhpx1i7x9cDNJEO6crAD4jiM',
        callbackURL: "https://socialoauthnode.herokuapp.com/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
        console.log(profile)
        User.findOne({ twitterId: profile.id }).then((currentUser) => {

            if (currentUser) {
                //if exsist user in our db
                console.log('user exist and details is :' + currentUser)

                done(null, currentUser)
            } else {
                // if user not in our db then save the user in our db
                new User({
                    username: profile.displayName,
                    twitterId: profile.id,
                    thumbnail: profile.photos[0].value
                }).save().then((newUser) => {
                    console.log('new user created: ' + newUser)
                    done(null, newUser)
                })

            }

        })


    }));

//instagram
passport.use(new InstagramStrategy({
        clientID: '139dcdc4955c4eb09f3a4a4ca05b8340',
        clientSecret: '39c3a0e4ca744502807412d2b19f5d1e',
        callbackURL: "https://socialoauthnode.herokuapp.com/auth/instagram/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile)
        User.findOne({ instagramId: profile.id }).then((currentUser) => {

            if (currentUser) {
                //if exsist user in our db
                console.log('user exist and details is :' + currentUser)

                done(null, currentUser)
            } else {
                // if user not in our db then save the user in our db
                new User({
                    username: profile.displayName,
                    instagramId: profile.id,
                    thumbnail: profile._json.data.profile_picture
                }).save().then((newUser) => {
                    console.log('new user created: ' + newUser)
                    done(null, newUser)
                })

            }

        })
    }
));