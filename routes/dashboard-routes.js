const router = require ('express').Router()
var mongoose = require("mongoose");
const mongo = require('mongodb')
var Categories = require("../models/categories-model");
const Posts = require("../models/post-model")
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
      db.collection('categories').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('admin/addpost', {user:req.user,categories: result})
  })
})

router.post('/post/save',(req,res,)=>{
var posts = new Posts(req.body);
  posts.save(function(err,result) {
    if(err) {
      console.log(err);
      res.render("admin/addpost",{user:req.user});
    } else {
      console.log("Successfully created an Categories.");
      // res.redirect("/employees/show/"+employee._id);
      console.log(result)
      res.redirect("../add-post");
      //res.redirect('/')
    }
  });
})


//List Posts

router.get('/list-post',(req,res)=>{
	db.collection('posts').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('admin/listpost', {user:req.user,posts: result})
    //console.log(result)
  })
})

router.get('/post/delete/:id', function(req, res){
  Posts.findByIdAndRemove({_id: req.params.id}, 
     function(err, docs){
     console.log(req.params.id)
    if(err) res.json(err);
    else    res.redirect("../list-post");
  });
});

router.get('/post/edit/:id',(req,res)=>{
  Posts.findOne({_id: req.params.id}).exec(function (err, posts)  {
    if (err) return console.log(err)
    res.render('admin/editpost', {user:req.user,posts: posts})
    //console.log(posts)
  })
})

router.post('/post/update/:id',(req,res)=>{
 Posts.findByIdAndUpdate(req.params.id, { $set: { post_title: req.body.post_title, post_tag: req.body.post_tag, post_content: req.body.post_content}}, { new: true }, function (err, posts) {
    if (err) return console.log(err)
    res.render('admin/editpost', {user:req.user,posts: posts})
    //console.log(posts)
  })
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

router.get('/delete/:id', function(req, res){
  Categories.findByIdAndRemove({_id: req.params.id}, 
     function(err, docs){
    if(err) res.json(err);
    else    res.redirect("../add-categories");
  });
});
module.exports = router