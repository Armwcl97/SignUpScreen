const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address:email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName,
      }
    }]

  };

  const jsonData = JSON.stringify(data);
  const url = "https://us8.api.mailchimp.com/3.0/lists/cd202960f3";
  const options = {
    method: "POST",
    auth: "Armandocolm:d666bbd8c1542d0686e0064ba83ff329-us8"
  }

  const request = https.request(url, options, function(response){

    if (response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });

request.write(jsonData);
request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000 ,function(){
  console.log("abierto");
});


//API KEY
// d666bbd8c1542d0686e0064ba83ff329-us8

// list id
// cd202960f3
