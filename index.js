var express = require('express');
const cors = require("cors");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// app.use(cors({
//     origin:["http://localhost:3000"]
// }));
app.use(cors({
    origin:["https://joesreactzoo.herokuapp.com"]
}));

// Requiring our models for syncing
var db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/animals",(req,res)=>{
    db.Animal.findAll().then(animals=>{
        res.json(animals);
    })
})
// app.get('/seedit',(req,res)=>{
//     const animals = [
//         {
//           "species": "zebra",
//           "class": "mammal",
//           "eatsMeat": false,
//           "weight": 200
//         },
//         {
//           "species": "lion",
//           "class": "mammal",
//           "eatsMeat": true,
//           "weight": 150
//         },
//         {
//           "species": "whale shark",
//           "class": "fish",
//           "eatsMeat": false,
//           "weight": 5000
//         },
//         {
//           "species": "penguin",
//           "class": "bird",
//           "eatsMeat": true,
//           "weight": 5
//         },
//         {
//           "species": "bald eagle",
//           "class": "bird",
//           "eatsMeat": true,
//           "weight": 10
//         },
//         {
//           "species": "banana slug",
//           "class": "insect",
//           "eatsMeat": false,
//           "weight": 1
//         },
//         {
//           "species": "manatee",
//           "class": "mammal",
//           "eatsMeat": false,
//           "weight": 75
//         },
//         {
//           "species": "gorilla",
//           "class": "mammal",
//           "eatsMeat": false,
//           "weight": 100
//         },
//         {
//           "species": "cat",
//           "class": "mammal",
//           "eatsMeat": true,
//           "weight": 4
//         },
//         {
//           "species": "frog",
//           "class": "amphibian",
//           "eatsMeat": false,
//           "weight": 2
//         }
//       ]
//     db.Animal.bulkCreate(animals).then(data=>{
//         console.log("dataSeeded");
//         res.json("seeded!")
//     })
// })
app.get("/api/animals/class/:classname",(req,res)=>{
    db.Animal.findAll({
        where:{
            class:req.params.classname
        }
    }).then(animals=>{
        res.json(animals);
    })
})

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});
// app.listen(PORT, function () {
//     console.log('App listening on PORT ' + PORT);
// });