const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port= 8001;
// express-layout
const expressLayouts= require('express-ejs-layouts');
// require mongoose
const db= require('./config/mongoose');
// middleware
app.use(express.urlencoded());
// for cookie-parser
app.use(cookieParser());
// accessing the static files
app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// use express router
app.use('/', require('./routes'));
// set up the view engine ejs
app.set('view engine', 'ejs');
app.set('views','./views');

app.listen(port, function(err){
    if(err){
        // console.log('Error:',err);
        // we can print error by another way interpolation as below
        console.log(`Error in running the server: ${err}`);     
    }
    console.log(`Server is running on Port: ${port}`);

});