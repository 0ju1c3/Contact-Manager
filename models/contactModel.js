const mongoose = require('mongoose')
  
const contactSchema = mongoose.Schema({
  name:{
    type:String,
    required:[true,"name is required"],
  },
  email:{
    type:String,
    required:[true,'email id is required'],
  },
  phone:{
    type:String,
    required:[true,'phone number is required'],
  }
},{
    timestamps:true, 
  }
)

module.exports = mongoose.model("Contact",contactSchema)
