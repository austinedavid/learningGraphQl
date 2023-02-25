const mongoose = require("mongoose")

// creating a new schema
const bookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
   authorId:{
        type: String,
        required: true
   }

}, {timestamps: true})

module.exports = mongoose.model("Books", bookSchema)