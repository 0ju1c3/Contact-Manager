const asyncHandler = require('express-async-handler')
const Contact = require("../models/contactModel")
//mongodb and mongoose, upon interaction we always get a promise hence ... the async
//since we are dealing with async we need to have an error handler -- luckily express has async error handler middleware which needs to be installed by typing "npm install express-async-handler" on the terminal
//whenver an exception occurs express-async-handler will pass it through the errorHandler
//@desc get all contacts
//@route get /api/contacts
//@access private 
const getContacts = asyncHandler(async (req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts)
})
//@desc create a contact
//@route post /api/contacts
//@access private 
//201-- resource created
const createContact= asyncHandler(async (req,res)=>{
    console.log("The request body is:", req.body)//will give undefined output without the use of body-parser i.e app.use(express.json())
    //console.log(req.body.name)
    const {name, email, phone} = req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are mandatory")//will be in .html format -- for .json format a custom middleware needs to be made
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user,
    })
    res.status(201).json(contact)
})

//@desc update contact 
//@route put /api/contacts/:id 
//@access private 
const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not Found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User doesn't have permission to update other user contacts")
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({updatedContact})
})

//@desc get contact
//@route get /api/contacts/:id 
//@access private
const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})

//@desc delete contact
//@route delete /api/contacts/:id 
//@access private
const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User doesn't have permission to update other user contacts")
    }
    await Contact.deleteOne({"_id":req.params.id})
    res.status(200).json({contact})
})
module.exports = {getContacts, createContact,updateContact,getContact,deleteContact}
