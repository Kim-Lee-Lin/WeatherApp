const express = require("express");
//что бы брать данные из вне обьязаельно надо создать переменную https
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));


//создаем переменную с адресом на сайт и берем данные от внешнего источника
app.get("/", function(req, res) {
 res.sendFile(__dirname + "/index.html");
 app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "767f4995d1e28a28103c17f1a03e044a";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) {
   // response.on - может принимать несколько событий в течение жизненного цикла обьекта
     response.on("data", function(data) {
    //parse-делает данные более понятными и в одну строку
     const weatherData = JSON.parse(data);
     const temp = weatherData.main.temp;
     const weatherDescription = weatherData.weather[0].description;
     const icon = weatherData.weather[0].icon;
     const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
     res.write("<p>The weather is currently "+weatherDescription+"</p>");
     res.write("<h1>The temperation in " + query + " is " + temp + "</h1>");
     res.write("<img src="+imageURL+">"+"</img>");
   });

 });
 });



});





app.listen(3000, function() {

  console.log("Everything is working");

});


























//ПРИМЕР ДЛЯ ЯСНОСТИ JSON
// const object = {
// name: "Ali",
// favoriteFood:"Ramen"
// }
// console.log(JSON.stringify(object));
    // //выявляет нам статус обьекта (работает код или нет)
    // console.log(response.statusCode);
