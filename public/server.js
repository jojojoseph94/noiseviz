// Retrieve
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const path = require('path');
const port = process.env.PORT || 8080;

const db = require("./db");
const collection = "measurements";

app.get('/getdata',(req,res)=>{
    if(req.query.date1) {
        if (req.query.date2) {
            var query = {"date" : { $gte : req.query.date1, $lte : req.query.date2} };
            db.getDB().collection(collection).find(query).toArray((err,documents) => {
                if(err)
                    console.log(err);
                else{
                    console.log('Returning custom range data2');
                    res.header("Access-Control-Allow-Origin", "*");
                    res.json(documents);
                }
            } )    
        } else {
            db.getDB().collection(collection).find({ "date" : { $gte : req.query.date1} }).toArray((err,documents) => {
                if(err)
                    console.log(err);
                else{
                    console.log('Returning custom data');
                    res.header("Access-Control-Allow-Origin", "*");
                    res.json(documents);
                }
            } )
        }
    } else {
        db.getDB().collection(collection).find({}).toArray((err,documents) => {
            if(err)
                console.log(err);
            else{
                console.log('Returning data');
                res.header("Access-Control-Allow-Origin", "*");
                res.json(documents);
            }
        } )
    }
    
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
  });

app.use(express.static(__dirname));
db.connect((err)=>{
    if(err){
        console.log(err);
        console.log('unable to connect to db');
        process.exit(1);
    }else {
        app.listen(port,()=>{
            console.log("Connected to DB. App running on port 8000");
        })
    }
})