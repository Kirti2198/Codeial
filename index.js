const express=require('express');
const app=express();
const port= 8001;

app.listen(port, function(err){
    if(err){
        // console.log('Error:',err);
        // we can print error by another way interpolation as below
        console.log(`Error in running the server: ${err}`);     
    }
    console.log(`Server is running on Port: ${port}`);

});