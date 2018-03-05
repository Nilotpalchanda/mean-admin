const router = require ('express').Router()

const authCheck = (req,res,next)=>{
  if(!req.user){
    // if user not login then redirect basrd on user details (req.user)
    res.render('admin/login')
  }else{
    // if login go to progile page
    next()
  }
}

router.get('/dashboard',authCheck,(req,res)=>{
  res.render('admin/dash',{user:req.user})
  //res.send('user name is :' + req.user.username)
})

router.get('/add-post',(req,res)=>{
	res.render('admin/addpost')
})

//List Posts

router.get('/list-post',(req,res)=>{
	res.render('admin/listpost')
})
//
router.get('/add-categories',(req,res)=>{
	res.render('admin/categories')
})
//
router.get('/add-tags',(req,res)=>{
	res.render('admin/addtags')
})


module.exports = router