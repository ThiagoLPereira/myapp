const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
app.use(cors())

// Calculator__________________________________________________________________

app.get ('/multiply', (req, res) => {
    const firstNum = req.query.firstNum;
    const secondNum = req.query.secondNum;
    console.log(' The result is: ');
    let result = parseInt(firstNum) * parseInt(secondNum);
    res.send(result.toString());
})

app.get ('/divide', (req, res) => {
    const firstNum = req.query.firstNum;
    const secondNum = req.query.secondNum;
    console.log(' The result is: ');
    let result = parseInt(firstNum) / parseInt(secondNum);
    res.send(result.toString());
})

app.get ('/subtract', (req, res) => {
    const firstNum = req.query.firstNum;
    const secondNum = req.query.secondNum;
    console.log(' The result is: ');
    let result = parseInt(firstNum) - parseInt(secondNum);
    res.send(result.toString());
})

app.get ('/add', (req, res) => {
    const firstNum = req.query.firstNum;
    const secondNum = req.query.secondNum;
    console.log(' The result is: ');
    let result = parseInt(firstNum) + parseInt(secondNum);
    res.send(result.toString());
})

//  http://localhost:3000/multiply?firstNum=3&secondNum=2
//  http://localhost:3000/divide?firstNum=10&secondNum=2
//  http://localhost:3000/subtract?firstNum=10&secondNum=5
//  http://localhost:3000/add?firstNum=3&secondNum=6

//_____________________________________________________________________________

//API__________________________________________________________________________

app.get ('/', (req, res) => {
    let newArray = myCities.map(minimizeObeject);
    res.send(newArray);
})

app.get('/weather', (req, res) => {
    let name = req.query.name;
    let country = req.query.country;
    console.log(name + '' + country)
    console.log("a client request the weather in all cities");
    res.send('The weather in ' + name +  ' is 24.5!')
}) 
const myLogger = (req, res, next) => {
        let visitTime = new Date();
        console.log(`visited ${req.url} at ${visitTime.toLocaleString()}`);
        next();
    };
    app.use(myLogger);
    
    const myCities = [
        {id:1, cityName: "Valencia", country:"Spain", latitude:39.46, longitude:-0.37, weather:28.5 },
        {id:2, cityName: "Paris", country:"France", latitude:48.85, longitude:2.27, weather:24.5 },
        {id:3, cityName: "Estambul", country:"Turkey", latitude:41.04, longitude:28.99, weather:34.5 },
        {id:4, cityName: "Tokyo", country:"Japan", latitude:35.50, longitude:138.64, weather:29.5 },
    ];
    
    function minimizeObeject(cityObject) {
        return {
            cityName: cityObject.cityName,
            weatherLatLon: cityObject.weather,
            id: cityObject.id,
            country: cityObject.country,
        };
    }
    app.get ('/city/:cityName', (req, res) => {
        const name = req.params.cityName;
        res.send(searchByName(myCities,name))
    })

    app.get('/city', (req, res) => {
        let name = req.query.name;
        let lat = req.query.lat;
        let lon = req.query.lon;
        let id = req.query.id;
        let country = req.query.country;
        let result = [];
        
        if (name != undefined) {
            result = searchByName(myCities,name)
        }
        else if (lat != undefined && lon !== undefined) {
            result = searchByLatLon(myCities,lat,lon)
        }
        else if (id != undefined) {
            result = searchById(myCities,id)
        }
        else if (country != undefined) {
            result = searchByCountry(myCities,country)
        }
        res.send(result)
    });
      
    app.get ('/citycrud/:id', (req, res) => {
        const id = req.params.id;
        res.send(searchById(myCities, id))
    })

    app.post('/citycrud/', (req, res) => {
        let newCity = req.fields;
        myCities.push(req.fields);
        res.send(myCities)
    })
    
    let searchByName = (cities, name) => {
        let result = myCities.filter(city => city.cityName.toLowerCase() == name.toLowerCase());
        return result.map(minimizeObeject);
    }
    let searchById = (cities, id) =>{
        let resulID = myCities.filter(city => city.id == id);
        return resulID.map(minimizeObeject);
    }
    let searchByLatLon = (cities, lat, lon) => {
        let resultLatLon = myCities.filter(city => city.latitude == lat && city.longitude == lon);
        return resultLatLon.map(minimizeObeject);
    }
    let searchByCountry = (cities, country) => {
        let resultCountry = myCities.filter(city => city.country == country);
        return resultCountry.map(minimizeObeject);
    }
    
    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


//  http://127.0.0.1:3000/city/paris    
//  http://127.0.0.1:3000/city?name=valencia
//  http://127.0.0.1:3000/city?lat=41.04&lon=28.99
//  http://127.0.0.1:3000/city?id=3
//  http://127.0.0.1:3000/city?country=Japan
//  http://127.0.0.1:3000/citycrud/3