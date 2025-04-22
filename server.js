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
    "mongodb+srv://adamgerrard:nPIuHBbPoLSoC9Ck@winestoragecluster.duzoood.mongodb.net/?retryWrites=true&w=majority&appName=WineStorageCluster"
  )
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log("couldn't connect to mongodb", error);
  });

const wineSchema = new mongoose.Schema({
    winery:String,
    vintage:Number,
    price:Number,
    country:String,
    region:String,
    description:String,
    grape:String,
    cellarLocation:String,
    image:String
});

const Wine = mongoose.model("Wine", wineSchema);

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/wines", async(req, res)=>{
    const wines = await Wine.find();
    res.send(wines);
});

app.post("/api/wines", upload.single("img"), async (req, res)=>{
    console.log("I made it into the post");
    const result = validateWine(req.body);

    if(result.error) {
        console.log("I have an error");
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const wine = new Wine({
        winery: req.body.winery,
        vintage: req. body.vintage,
        price: req.body.price,
        country: req.body.country,
        region: req.body.region,
        description: req.body.description,
        grape: req.body.grape,
        cellarLocation: req.body.cellarLocation,
    });

    if(req.file){
        wine.image = req.file.filename;
    }

    const newWine = await wine.save();
    res.status(200).send(newWine);
});

//learned this app.put in class, its finding a house with a matching id
app.put("/api/wines/:id", upload.single("img"), async(req, res)=>{

    const result = validateWine(req.body);

    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const fieldsToUpdate = {
        winery:req.body.winery,
        vintage:req.body.vintage,
        price:req.body.price,
        country:req.body.country,
        region:req.body.region,
        description:req.body.description,
        grape:req.body.grape,
        cellarLocation:req.body.cellarLocation
    }

    if(req.file){
        fieldsToUpdate.image = req.file.filename;
    }

    const wentThrough = await Wine.updateOne({_id:req.params.id}, fieldsToUpdate);
    const wine = await Wine.findOne({_id:req.params.id});

    res.status(200).send(wine);
});

app.delete("/api/wines/:id", async(req,res)=>{
    const wine = await Wine.findByIdAndDelete(req.params.id);
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