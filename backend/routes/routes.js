const {HealthTrackerDB} = require('../db');
const cors = require('cors');
const crypto = require('crypto');
const express = require('express');
const app = express();
app.use(express.json());    
app.use(cors());


function calculateHash(data) {
    return crypto
        .createHash("sha256")
        .update(data)
        .digest("hex");
}

app.post('/addRecord',async(req,res)=>{{
    const form=req.body;
    const lastBlock = await HealthTrackerDB.findOne().sort({ timeStamp: -1 });
    const previousHash = lastBlock ? lastBlock.hash : "0";
    const timeStamp = form.timeStamp;
    const dataString = req.body.patientUID+req.body.patientName+req.body.patientAge+req.body.patientDescription+req.body.timeStamp+previousHash;
    const hash = calculateHash(dataString);
    form.timeStamp = timeStamp;
    form.hash = hash;
    form.previousHash = previousHash;

    const newRecord = await HealthTrackerDB.create(form);
    res.status(200).json({"msg":"Record added successfully", "record": newRecord});
}})

app.get('/getRecords',async(req,res)=>{
    let records;
    if(req.query.searchUID){
        console.log("Searching for UID: ", req.query.searchUID);
        records=await HealthTrackerDB.find({patientUID: req.query.searchUID});
    }else{
        records=await HealthTrackerDB.find({});
    }
    res.status(200).json(records);
})

app.delete('/deleteRecord',async(req,res)=>{
    const result = await HealthTrackerDB.findByIdAndDelete(req.body.id);
    if (result) {
        console.log("Deleted record: ", result);
        res.status(200).json(result);
    } else {
    res.status(400).send("No document found with the id ", req.body.id);
    }
});

app.delete('/deleteAll',async(req,res)=>{
    const result = await HealthTrackerDB.deleteMany({});
    if (result) {
        console.log("Deleted all records: ", result);
        res.status(200).json(result);
    } else {
    res.status(500).send("Internal Server Error");
    }
});

app.get('/ping',(req,res)=>{
    res.status(200).send("Pong");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
