const request = require('postman-request');
const API_KEY = "0c9e7d7cba551df6e43b2fb77c10e001";

const forecast = (lat,lng, callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=" + API_KEY +"&query=" + lat + ',' + lng;
    request({url, json:true}, (err,{body})=>{
        if (err){
            callback("Unable to connect to weather services", undefined)
        } else if(body.error){
            callback("Seems to be an error!", undefined);
        } else {
            console.log(body)
            let message = "It is " + body.current.weather_descriptions[0] + ". "  + body.current.temperature + " degrees. Current wind speed is " + body.current.wind_speed + " m/s";
            callback(undefined, message);
        }
    })
}



module.exports = forecast;