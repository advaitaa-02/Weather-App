const express =  require ("express");
const https = require("https");
const bodyParser=require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");   
});

app.post("/",function(req,res){
    console.log(req.body.CityName);
    const query =req.body.CityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=fbe701bd94e057cc530060ba6b6c9cd2&units=metric";
https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        // console.log(weatherData);
        const temp = weatherData.main.temp;
        const desc=weatherData.weather[0].description
        // console.log(desc);
        const icon = weatherData.weather[0].icon;
        const imgURL="http://openweathermap.org/img/wn/"+icon +"@2x.png";
        res.write("<p>The weather is currently " + desc +"</p>")
        res.write("<h1>The temperature in "+ query+" is "+ temp + " degrees Celsius</h1>");
        // res.write("<img src=" + imgURL +"</img>");
        res.write("<img src=" + imgURL +">");

        res.send();
    })

})
})



app.listen(3000, function(){
    console.log("server is runnin gon port 3000");
});