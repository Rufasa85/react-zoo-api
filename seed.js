const animals = [
    {
      "species": "zebra",
      "class": "mammal",
      "eatsMeat": false,
      "weight": 200
    },
    {
      "species": "lion",
      "class": "mammal",
      "eatsMeat": true,
      "weight": 150
    },
    {
      "species": "whale shark",
      "class": "fish",
      "eatsMeat": false,
      "weight": 5000
    },
    {
      "species": "penguin",
      "class": "bird",
      "eatsMeat": true,
      "weight": 5
    },
    {
      "species": "bald eagle",
      "class": "bird",
      "eatsMeat": true,
      "weight": 10
    },
    {
      "species": "banana slug",
      "class": "insect",
      "eatsMeat": false,
      "weight": 1
    },
    {
      "species": "manatee",
      "class": "mammal",
      "eatsMeat": false,
      "weight": 75
    },
    {
      "species": "gorilla",
      "class": "mammal",
      "eatsMeat": false,
      "weight": 100
    },
    {
      "species": "cat",
      "class": "mammal",
      "eatsMeat": true,
      "weight": 4
    },
    {
      "species": "frog",
      "class": "amphibian",
      "eatsMeat": false,
      "weight": 2
    }
  ]

  const db = require("./models");

  db.Animal.bulkCreate(animals).then(data=>{
      console.log("dataSeeded");
  })