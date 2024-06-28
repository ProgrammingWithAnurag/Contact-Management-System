import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const contactSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true,
            unique: true
      },
      phone: {
            type: String,
            required: true,
            unique: true
      },
      address: {
            type: String,
            required: true
      },
      postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
      }
},{timestamps: true})

export const Contact = mongoose.model("Contact",contactSchema)