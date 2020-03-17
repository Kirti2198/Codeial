module.exports.home= function(req,res){
    // return res.end('<h1>Express is up for codeial!</h1>');
    // printing the cookies on the terminal 
    console.log(req.cookies);
    // change the value of cookie on response
    res.cookie('user_id',25); 
    return res.render('home', {
         title:"Home"
    });
}
// module.exports.actionName=function(req,res){return res.end}