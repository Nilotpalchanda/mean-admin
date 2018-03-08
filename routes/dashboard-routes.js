const router = require ('express').Router()
var mongoose = require("mongoose");
const mongo = require('mongodb')
const multer = require('multer')
const path = require('path')
var Categories = require("../models/categories-model");
const Posts = require("../models/post-model")


// configure multer
var upload = multer({storage: multer.diskStorage({

  destination: function (req, file, callback) 
  { callback(null, './public/uploads');},
  filename: function (req, file, callback) 
  { 
    callback(null, (file.originalname));
  }

}),fileFilter: function(req, file, callback) {
  var ext = path.extname(file.originalname)
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    return callback(/*res.end('Only images are allowed')*/ null, false)
  }
  callback(null, true)
}
});


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

router.post('/post/save', upload.any(), (req,res)=>{
  console.log("req.body"); //form fields
  console.log(req.body);
  console.log("req.file");
  console.log(req.files); //form files
var posts = new Posts({
   post_title : req.body.post_title,
   post_categories: req.body.post_categories,
   post_tag: req.body.post_tag,
   Post_image : req.files[0].filename,
   post_content : req.body.post_content
});
  posts.save(function(err,result) {
    if(err) {
      console.log(err);
      res.render("admin/addpost",{user:req.user});
    } else {
      console.log("Successfully Uploaded an Posts.");
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
     //console.log(req.params.id)
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

router.post('/post/update/:id', upload.any(), (req,res)=>{

 Posts.findByIdAndUpdate(req.params.id, { $set: { post_title: req.body.post_title, post_tag: req.body.post_tag, Post_image : req.files[0].filename, post_content: req.body.post_content}}, { new: true }, function (err, posts) {
    if (err) return console.log(err)
      console.log(posts)
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

router.get('/media-gallery',(req,res)=>{
  Posts.find({}, function(err,data){
    if(err){
      console.log(err);
      
    }else{
      console.log(data);
      res.render('admin/mediagallery',{user:req.user,data:data});
    }
  })

})



router.post('/save',(req,res)=>{
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