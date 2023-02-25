const mongoose = require("mongoose")

// creating a new schema
const bookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    origin:{
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Authors", bookSchema)