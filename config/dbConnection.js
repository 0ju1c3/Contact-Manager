const mongoose = require('mongoose')
const dotenv = require("dotenv").config()


const connectDb = async ()=>{
  try{
    //console.log(process.env.CONNECTION_STRING)
    //const connect = await mongoose.connect(process.env.CONNTECTION_STRING)
    const connect = await mongoose.connect("mongodb+srv://admin:admin@ojascluster.heatu2h.mongodb.net/mycontacts-backend?retryWrites=true&w=majority")
    console.log("Connection established")
    console.log("Database connected:",connect.connection.host,connect.connection.name)
  }
  catch(err){
    console.log(err)
    process.exit(1)
  }
}

module.exports = connectDb
