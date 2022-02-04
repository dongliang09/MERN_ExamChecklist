const mongoose = require('mongoose')

const ExamSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        required: true
    }
})

const ExamModel = mongoose.model("exam", ExamSchema)
module.exports = ExamModel;