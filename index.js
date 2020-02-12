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