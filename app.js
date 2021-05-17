const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static("public"));

app.get("/", function(req,res){

res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req,res){

  const query = req.body.cityName;
  const apiKey = "98f2bb5b34a4a0dca16b48c76d77113e";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + "";
  https.get(url, function(response){
    console.log(response.statusCode);

  response.on("data", function(data){
  const weatherData = JSON.parse(data);
  const temp = weatherData.main.temp;
  const description = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
  const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
  res.write("<h1>The temperature of " + query + " is " + temp + " degress celcius.</h1>");
  res.write("<p>The description of atmosphere is " + description + " .</p>");
  res.write("<img src = " + imageURL + " >");
  res.send();
   });














   });

});




app.listen(3000, function(){
  console.log("Server is running on port 3000");

});
