const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

let houses = [
    {
        "_id": 1,
        "winery": "Gundlach Bundschu",
        "vintage": "2010",
        "price": "40.00",
        "country": "United States",
        "region": "California",
        "description": "Red wine",
        "grape": "Cabernet Sauvignon",
        "cellarLocation": "A1",
        "image": "wine01.jpg"
    },
    {
        "_id": 2,
        "winery": "Frog's Leap",
        "vintage": "2015",
        "price": "54.00",
        "country": "United States",
        "region": "California",
        "description": "Red wine",
        "grape": "Cabernet Sauvignon",
        "cellarLocation": "A2",
        "image": "wine02.jpg"
    },
    {
        "_id": 3,
        "winery": "Chateau Montelena",
        "vintage": "2014",
        "price": "45.86",
        "country": "United States",
        "region": "California",
        "description": "Red wine",
        "grape": "Cabernet Sauvignon",
        "cellarLocation": "A3",
        "image": "wine03.jpg"
    },
    {
        "_id": 4,
        "winery": "Fantesca",
        "vintage": "2017",
        "price": "129.00",
        "country": "United States",
        "region": "California",
        "description": "Red wine",
        "grape": "Pinot Noir",
        "cellarLocation": "A4",
        "image": "wine04.jpg"
    },
    {
        "_id": 5,
        "winery": "Joseph Phelps",
        "vintage": "2019",
        "price": "100.00",
        "country": "United States",
        "region": "Sonoma Coast",
        "description": "Red wine",
        "grape": "Pinot Noir",
        "cellarLocation": "B1",
        "image": "wine05.jpg"
    },
    {
        "_id": 6,
        "winery": "Meadowcroft",
        "vintage": "2021",
        "price": "42.00",
        "country": "United States",
        "region": "California",
        "description": "Red wine",
        "grape": "Pinot Noir",
        "cellarLocation": "B2",
        "image": "wine06.jpg"
    },
    {
        "_id": 7,
        "winery": "Amapola Creek",
        "vintage": "2014",
        "price": "48.00",
        "country": "United States",
        "region": "California",
        "description": "Red wine",
        "grape": "Zinfandel",
        "cellarLocation": "B3",
        "image": "wine07.jpg"
    },
    {
        "_id": 8,
        "winery": "Kunde Estate Winery",
        "vintage": "2005",
        "price": "32.80",
        "country": "United States",
        "region": "California",
        "description": "Red wine",
        "grape": "Zinfandel",
        "cellarLocation": "B4",
        "image": "wine08.jpg"
    },
    {
        "_id": 9,
        "winery": "Hudson",
        "vintage": "2023",
        "price": "45.00",
        "country": "United States",
        "region": "California",
        "description": "Rose",
        "grape": "Grenache",
        "cellarLocation": "C1",
        "image": "wine09.jpg"
    },
    {
        "_id": 10,
        "winery": "Relic",
        "vintage": "2015",
        "price": "60.00",
        "country": "United States",
        "region": "California",
        "description": "Red wine",
        "grape": "Cabernet Blend",
        "cellarLocation": "C2",
        "image": "wine10.jpg"
    },
    {
        "_id": 11,
        "winery": "Chateauneuf-Du-Pape ",
        "vintage": "2007",
        "price": "70.00",
        "country": "France",
        "region": "Vallée du Rhône",
        "description": "Red wine",
        "grape": "Grenache",
        "cellarLocation": "C3",
        "image": "wine11.jpg"
    },
    {
        "_id": 12,
        "winery": "Torciano",
        "vintage": "2018",
        "price": "68.00",
        "country": "Italy",
        "region": "Toscana",
        "description": "Red wine",
        "grape": "Sangiovese/Merlot Blend",
        "cellarLocation": "C4",
        "image": "wine12.jpg"
    }
];

app.get("/api/wines", (req, res)=>{
    res.send(houses);
});

app.listen(3001, () => {
    console.log("listening....")
});