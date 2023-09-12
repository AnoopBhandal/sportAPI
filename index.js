const express = require("express");
const app = express();
const port = process.env.PORT;
const sports = require("./sports.json");
require('dotenv').config();

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello Sports API")
})

app.get("/sports", (req, res) => {
    res.send(sports)
})

const getSportIndex = name => {
    return sports.findIndex((sport) => sport.name.toLowerCase() == name)
}

app.get('/sports/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const sport = sports.find(sport => sport.name.toLowerCase() == name);
    if (sport == undefined) {
        res.status(404).send(`The sport ${name} was not found`);
    } else {
        res.send(sport);
    }
});

app.post('/sports', (req, res) => {
    const fi = getSportIndex(req.body.name.toLowerCase())
    if (fi > -11){  
        res.status(409).send("The sport already exists.")
    } else{
        sports.push(req.body)
        res.status(201).send(req.body)
    }
 
 
    // const sport = req.body;
    // console.log(sport);
    // res.send('new sport created with POST');
    // next()
});

app.patch('/sports', (req, res) =>{
    const fi = getSportIndex(req.body.name.toLowerCase())
    if (fi == -1){
        res.status(404).send("Sport can not be found.")
    } else{
        sports.splice(fi, sports[fi].length, req.body)
        res.sendStatus(200);
    }
    
    
    // const sport = req.body
    // console.log(sport)
    // res.send('Update sport with PATCH.')   

})

app.delete('/sports', (req, res, next) =>{
    const fi = getSportIndex(req.param.name.toLowerCase())
    if (fi == -1){
        res.status(404).send("Sport can not be found.")
    } else{
        sports.splice(fi, 1);
        res.sendStatus(200);
    }
  
  
    // const sport = req.body
    // console.log(sport)
    // res.send('Delete with DELETE.')   
})


app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`)
})
