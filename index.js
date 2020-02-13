var express = require('express');
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session")
// Sets up the Express App

// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));
app.use(session({ secret: "something secret here", resave: true, saveUninitialized: true,cookie:{maxAge: 7200000} }));
// app.use(cors({
//     origin:["https://joesreactzoo.herokuapp.com"]
// }));

// Requiring our models for syncing
var db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/animals", (req, res) => {
  db.Animal.findAll().then(animals => {
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
app.get("/api/animals/class/:classname", (req, res) => {
  db.Animal.findAll({
    where: {
      class: req.params.classname
    }
  }).then(animals => {
    res.json(animals);
  })
})
app.post("/api/animals", (req, res) => {
  if(req.session.user){

    db.Animal.create(req.body).then(data => {
      res.json(data)
    })
  } else {
    res.status(401).json("log in first")
  }
})

app.delete("/api/animals/delete/:id", (req, res) => {
  if(req.session.user){

    db.Animal.destroy({
      where: {
        id: req.params.id
      }
    }).then(deletedAnimal => {
      res.json(deletedAnimal);
    })
  } else {
    res.status(401).json("nope")
  }
})

app.post("/api/auth/signup", (req, res) => {
  db.User.create(req.body).then(userData => {
    res.json(userData);
  })
})
app.post("/api/auth/login", (req, res) => {
  db.User.findOne({
    where: {
      name: req.body.name
    }
  }).then(dbUser=>{
    if(bcrypt.compareSync(req.body.password,dbUser.password)){
      req.session.user={
        id:dbUser.id,
        name:dbUser.name
      }
      res.json(req.session.user)
    }
    else{
      res.status(401).json("not logged in")
    }
  })
})

app.get('/api/auth/loggedinuser',(req,res)=>{
  if(req.session.user){
    res.json(req.session.user)
  } else {
    res.status(401).json("not logged in")
  }
})

db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
  });
});
// app.listen(PORT, function () {
//     console.log('App listening on PORT ' + PORT);
// });