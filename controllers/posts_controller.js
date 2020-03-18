const Post = require('../models/post')
// accessing comments for deleting
const Comment = require('../models/comment');
// for creating a post(action)
module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){console.log('error in creating a post'); return;}
        return res.redirect('back');
    });
}
// for deleting a post
module.exports.destroy= function(req,res){
    // first check if it exist
    Post.findById(req.params.id, function(err,post){
    // authorization if the user is the who make the post who is deleting
    //  .id means converting the object id into string
      if(post.user== req.user.id){
             post.remove;
             Comment.deleteMany({post: req.params.id}, function(err){
                 return res.redirect('back');   
             });
      }
      else
      {
          return res.redirect('back');
      
      }
    });
}