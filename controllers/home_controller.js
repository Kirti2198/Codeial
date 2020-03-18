const Post = require('../models/post');
const User = require('../models/user');

module.exports.home= function(req,res){
    // return res.end('<h1>Express is up for codeial!</h1>');
    // printing the cookies on the terminal 
    // console.log(req.cookies);
    // change the value of cookie on response
    // res.cookie('user_id',25); 

// display the posts on the home page
    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });


    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){

        User.find({}, function(err, users){
            return res.render('home', {
                title: "Codeial | Home",
                posts:  posts,
                all_users: users
            });
        });
    });   
}
    
// module.exports.actionName=function(req,res){return res.end}