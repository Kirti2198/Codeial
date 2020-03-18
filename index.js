const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port= 8001;
// express-layout
const expressLayouts= require('express-ejs-layouts');
// require mongoose
const db= require('./config/mongoose');
// require express-session for using passport
// use for session cookie
const session=require('express-session');
// require passport
const passport=require('passport');
// require passport-local(we need to require both passport and passport-local)
const passportLocal= require('./config/passport-local-strategy');
// require connect-mongo
const MongoStore= require('connect-mongo')(session);
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

// set up the view engine ejs
app.set('view engine', 'ejs');
app.set('views','./views');
// search it on google for more info
// mongo store isused to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        //  doscumentation-maxage.cookie- the milisecond 
         maxAge: (1000 * 60 * 100) 
    },
    store:new MongoStore(
        {
        mongooseConnection: db,
        autoRemove: 'disabled'
        },
        function(err){
        console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        // console.log('Error:',err);
        // we can print error by another way interpolation as below
        console.log(`Error in running the server: ${err}`);     
    }
    console.log(`Server is running on Port: ${port}`);

});