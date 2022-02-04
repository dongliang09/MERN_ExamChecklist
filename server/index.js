const express = require('express');
const app = express();
const mongoose = require('mongoose')
const ExamModel = require('./models/exam')

const cors = require('cors')

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://admin-DLL:ThankYou1@cluster0.jftqn.mongodb.net/MernTest?retryWrites=true&w=majority"
)

/* localhost
mongoose.connect(
 'mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
 {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
); */

app.get("/getExam", (req,res) => {
    // get the data from database and sort by date
    ExamModel.find({}).sort('date').exec((err,result) => {
        if (err) {
            res.send(err) //res.json(err) //send error on html front page
        } else {
            res.send(result)  //res.json(result)
        }
    });

   /* without sorting  
    ExamModel.find({}, (err,result) => { 
        //callback function return 2 arguments -- error and result
        if (err) {
            res.send(err) //res.json(err) //send error on html front page
        } else {
            res.send(result)  //res.json(result)
        }
    }) */
})

app.post("/createExam", async (req,res) => {
    //send data from the frontend
    const name = req.body.name;
    const date = req.body.date;
    const exam = new ExamModel(
        {name:name, date:date}
    );
    await exam.save();

    //res.json(user)
})

app.put("/updateExam", async (req,res) => {
    const newName = req.body.newName;
    //const newDate = req.body.newDate;
    const id = req.body.id;
    try {
        await ExamModel.findByIdAndUpdate(id, {name: newName});
        /* await ExamModel.findById(id, (error, examToUpdate) => {
            examToUpdate.name = String(newName);
            //examToUpdate.date = newDate;
            examToUpdate.save();
        }) */ 
    } catch(err) {
        console.log(err)
    }
    res.send("updated");
})

app.delete("/deleteExam/:id", async (req,res) => {
    const id = req.params.id;
    await ExamModel.findByIdAndRemove(id).exec();
    res.send("deleted")
})

app.listen(3001, () => {
    console.log("connected to servers sucessfully")
})
