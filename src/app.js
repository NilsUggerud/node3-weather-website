const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js')

//Define paths for express configs
const public_dir_path= path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

//Setup static directory for server
app.use(express.static(public_dir_path)); 

//Setup handlebars engine and views location
app.set('view engine','hbs') //Serve dynamic content
app.set('views', views_path);
hbs.registerPartials(partials_path);


//Använd res.render för att rendera view, alltså dynamiskt innehåll. "index" räcker då den automatiskt söker i folder views
app.get("", (req,res)=>{
    res.render('index', {
        name: "Nils",
        title: "WeatherApp"
    }); 
})

app.get('/about',(req,res)=>{
    res.render("about", {
        name: "Nils Uggerud",
        title: "About Me"
    });
})

app.get('/help',(req,res)=>{
    res.render("help", {
        title: "Help",
        message: "I might help you here",
        name: "Nils Uggerud"
    })
})


app.get('/weather', ({query},res)=>{
    if (!query.address){
        return res.send({
            errMessage: "You must provide an address to search for :)"
        })
    };
    geocode(query.address, (err, { lat, lng, address} = {})=>{
        if (err){
            res.send({
                err
            })
            return;
        }
        forecast(lat, lng, (error, forecast) => {
            if (error){
                res.send({
                    error
                })
                return;
            };
        res.send({
            address,
            forecast
            });
        })
     })

})

// app.get('/products', (req,res)=>{
//     console.log(req.query);
//     if (!req.query.search){
//         return res.send({
//             err: 'You must provide a search term'
//         })  
//     }
//     res.send({
//         products : [],
//     })
// })

app.get('/help/*', (req,res)=>{
    res.render("404", {
        errMessage: "Help Article not found",
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        errMessage: "Page not found"
    })
})

app.listen(3000, ()=>{
    console.log('Server up and running');
})