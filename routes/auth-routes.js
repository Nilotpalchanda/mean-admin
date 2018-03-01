const router = require('express').Router()
const passport = require('passport')


//

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

//github

router.get('/github', passport.authenticate('github', {
    scope: ['profile']
}))

//twitter
router.get('/twitter', passport.authenticate('twitter', {
    scope: ['profile']
}))


//instagram
router.get('/instagram', passport.authenticate('instagram'));



router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('you reach the callback URI')
    //res.redirect('/profile/')
})

router.get('/github/callback', passport.authenticate('github'), (req, res) => {
    //res.send('you reach the callback URI')
    res.redirect('/profile/')
})

router.get('/twitter/callback', passport.authenticate('twitter'), (req, res) => {
    //res.send('you reach the callback URI')
    res.redirect('/profile/')
})

router.get('/instagram/callback', passport.authenticate('instagram'), (req, res) => {
    //res.send('you reach the callback URI')
    res.redirect('/profile/')
})


module.exports = router