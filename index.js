const express = require('express')
const errorHandler = require('./middleware/errorHandler.js')
const connectDb = require('./config/dbConnection.js')
const app = express()
const port = process.env.PORT || 5000

connectDb()
app.use(express.json())//express built-in middleware ---- body-parser
app.use(errorHandler)//use of app.use() whenever middleware is being used
app.use("/api/contacts",require("./routes/contacts.js"))//middleware
app.use("/api/users",require("./routes/users.js"))//middleware
//controllers are going to contain all our logic for the request response and is going to connect with our database
//201 -- resource created
//user authentication
app.use("/api/users",require("./routes/users.js"))
app.listen(port,()=>{
  console.log(`Server is running at ${port}`)
})
