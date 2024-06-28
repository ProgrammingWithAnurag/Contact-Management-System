import { generateToken } from "../middleware/Auth.middleware.js";
import { User } from "../models/User.models.js";

const userRegister = async(req,res) => {
      try {
            const { username,email,password } = req.body;

            if(!username || !email || !password){
                  res.status(401).json({success: false,msg: "Please fill all fields"})
            }

            const user = await User.findOne({email})

            if(user){
                  res.status(401).json({success: false,msg: "Email Already Registered"})
            }

            const newUser = new User({username,email,password})

            const response = await newUser.save();

            const payload = {
                  id: response.id
            }

            const token = generateToken(payload)

            res.status(200).json({success: true,msg: "User Registered Successfully",response: response,token:token})
      } catch (error) {
            res.status(500).json({success: false,msg: "Internal Server Error"})
      }
}

const userLogin = async(req,res) => {
      try {
            const { email,password } = req.body;

            if(!email || !password){
                  res.status(401).json({success: false,msg: "Please fill all fields"})
            }

            const user = await User.findOne({email})

            if(!user || !( await user.comparePassword(password))){
                  res.status(401).json({success: false,msg: "Please Enter Valid Email Or Password"})
            }

            const payload = {
                  id: user.id
            }
            const token = generateToken(payload)

            res.status(200).json({success: true,msg: "User Login Successfully",user,token})
      } catch (error) {
            res.status(500).json({success: false,msg: "Internal Server Error"})
      }
}


export { userRegister, userLogin }