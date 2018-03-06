const router = require ('express').Router()
var mongoose = require("mongoose");
const mongo = require('mongodb')
var Categories = require("../models/categories-model");
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
	res.render('admin/addpost',{user:req.user})
})

//List Posts

router.get('/list-post',(req,res)=>{
	res.render('admin/listpost',{user:req.user})
})
//
router.get('/add-categories',(req,res,result)=>{
	  db.collection('categories').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('admin/categories', {user:req.user,categories: result})
  })
})
//
router.get('/add-tags',(req,res)=>{
	res.render('admin/addtags',{user:req.user})
})

router.post('/save',(req,res,)=>{
var categories = new Categories(req.body);
  categories.save(function(err,result) {
    if(err) {
      console.log(err);
      res.render("admin/categories",{user:req.user});
    } else {
      console.log("Successfully created an Categories.");
      // res.redirect("/employees/show/"+employee._id);
      console.log(result)
      res.redirect("../dash/add-categories");
      //res.redirect('/')
    }
  });
})

module.exports = router