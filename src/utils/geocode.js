const request = require('postman-request');
const token = "pk.eyJ1Ijoic3RqYXJ0aXMxMjMiLCJhIjoiY2tiOWVwdjBwMDkwOTJzdDN0MDBrMDR6ZSJ9.pilbEo4OJjjbjHrIHxMktw";


const geocode = (address, callback) => {
    
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" + token;
    request({url, json:true}, (err, {body})=>{
        if (err){
            callback("Unable to connect to location services");
        } else if(body.features.length === 0){
            callback("Unable to find location. Try another search");
        } else {
            callback(undefined, {
              lat: body.features[0].center[1],
              lng: body.features[0].center[0],
              address: body.features[0].place_name  
            });
        }
    });
}   

module.exports = geocode;
