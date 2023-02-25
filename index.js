const express = require("express")
const app  = express()
require("dotenv").config()
const cors = require("cors")
const {graphqlHTTP} = require("express-graphql")
const ourSchema = require("./schema")
const mongoose = require("mongoose")


// assigning port 
const port = process.env.PORT || 3000

// connecting to our database
const dbConnect = async()=>{
    try {
        mongoose.connect(process.env.MONGODB__URL).then((res)=>{
            console.log("mongodb connected successfully")
        })
    } catch (error) {
        console.log(error)
    }
}
mongoose.set('strictQuery', false)
// creating a middleware
app.use(express.json())
app.use(cors())
// adding our graphql middleware
app.use('/graphql', graphqlHTTP({
    schema: ourSchema,
    graphiql: true
}))

// here we listen to our ports
app.listen(port, ()=>{
    dbConnect()
    console.log(`app is running on port: ${port}`)
})