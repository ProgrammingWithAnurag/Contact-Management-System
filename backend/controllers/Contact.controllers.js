import { Contact } from "../models/Contact.models.js";

const addContact = async(req,res) => {
      try {
            const { name,email,phone,address } = req.body;

            const newContact = new Contact({
                  name,email,phone,address,postedBy: req.user._id
            })

            const result = await newContact.save();

            res.status(200).json({success: true, ...result._doc })
      } catch (error) {
            res.status(500).json({success: false, msg: "Internal Server Error"})
      }
}

const getContacts = async(req,res) =>{
      try {
            const contacts = await Contact.find({postedBy: req.user._id})

            res.status(200).json({success: true, contacts})
      } catch (error) {
            res.status(500).json({success: false,msg: "Internal Server Error"})
      }
}

const getContact = async(req,res) =>{
      try {
            const {id} = req.params;

            if(!id){
                  res.status(401).json({success: false,msg:"No Id Specified"})
            }

            const contacts = await Contact.findOne({_id: id})

            res.status(200).json({success: true, ...contacts._doc})
      } catch (error) {
            res.status(500).json({success: false,msg: "Internal Server Error"})
      }
}
const updateContact = async(req,res) =>{
      try {
            const {id} = req.params;

            if(!id){
                  res.status(401).json({success: false,msg:"No Id Specified"})
            }

            const result = await Contact.findByIdAndUpdate({_id: id}, {...req.body},{new: true})

            res.status(200).json({success: true, ...result._doc})
      } catch (error) {
            res.status(500).json({success: false,msg: "Internal Server Error"})
      }
}

const deleteContact = async(req,res) =>{
      try {
            const {id} = req.params;

            if(!id){
                  res.status(401).json({success: false,msg:"No Id Specified"})
            }

            const contact = await Contact.findOne({_id: id})
            if(!contact){
                  res.status(401).json({success: false,msg: "No Record Existed"})
            }

            const deleteRecord = await Contact.findByIdAndDelete({_id:id})
            const contacts = await Contact.find({postedBy: req.user._id}) 

            res.status(200).json({success: true, contacts})
      } catch (error) {
            res.status(500).json({success: false,msg: "Internal Server Error"})
      }
}

export { addContact,getContacts,getContact,updateContact,deleteContact }