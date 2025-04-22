const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const app = express();
const mongoose = require("mongoose");
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
const upload = multer({ storage: storage });

mongoose
  .connect(
    "mongodb+srv://adamgerrard:Adam.Gerrard27@winestoragecluster.duzoood.mongodb.net/?retryWrites=true&w=majority&appName=WineStorageCluster"
  )
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log("couldn't connect to mongodb", error);
  });

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

let wines = [
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
    res.send(wines);
});

app.post("/api/wines", upload.single("img"), (req, res)=>{
    console.log("I made it into the post");
    const result = validateWine(req.body);

    if(result.error) {
        console.log("I have an error");
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const wine = {
        _id: wines.length + 1,
        winery: req.body.winery,
        vintage: req. body.vintage,
        price: req.body.price,
        country: req.body.country,
        region: req.body.region,
        description: req.body.description,
        grape: req.body.grape,
        cellarLocation: req.body.cellarLocation,
    };

    if(req.file){
        wine.image = req.file.filename;
    }

    wines.push(wine);
    res.status(200).send(wine);
});

//learned this app.put in class, its finding a house with a matching id
app.put("/api/wines/:id", upload.single("img"),(req, res)=>{
    const wine = wines.find((wine)=>wine._id === parseInt(req.params.id));

    if(!wine) {
        res.status(404).send("The wine with the provided id was not found");
        return;
    }

    const result = validateWine(req.body);

    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    wine.winery = req.body.winery;
    wine.vintage = req.body.vintage;
    wine.price = req.body.price;
    wine.country = req.body.country;
    wine.region = req.body.region;
    wine.description = req.body.description;
    wine.grape = req.body.grape;
    wine.cellarLocation = req.body.cellarLocation;

    if(req.file){
        wine.image = req.file.filename;
    }

    res.status(200).send(wine);
});

app.delete("/api/wines/:id",(req,res)=>{
    const wine = wines.find((wine)=>wine._id === parseInt(req.params.id));

    if(!wine) {
        res.status(404).send("The wine with the provided id was not found");
        return;
    }

    const index = wines.indexOf(wine);
    wines.splice(index,1);
    res.status(200).send(wine);
});

const validateWine = (wine) => {
    const schema = Joi.object({
        _id:Joi.allow(""),
        winery:Joi.string().min(3).required(),
        vintage:Joi.number().required().min(1900),
        price:Joi.number().required().min(0),
        country:Joi.string().required().min(3),
        region:Joi.string().required().min(3),
        description:Joi.string().required().min(3),
        grape:Joi.string().required().min(3),
        cellarLocation:Joi.string().required().min(2),
    });

    return schema.validate(wine);
};

app.listen(3001, () => {
    console.log("listening....")
});