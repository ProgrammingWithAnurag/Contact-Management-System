import express from 'express'
import cors from 'cors'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './db/index.js';
import userRouter from './routes/User.routes.js'
import contactRouter from './routes/Contact.routes.js'

dotenv.config()
const port = process.env.PORT || 5000
const app = express()
connectDB()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(cookieParser())
app.use(cors())
//Routes
app.use('/api/v1/users',userRouter)
app.use('/api/v1/contacts',contactRouter)

app.listen(port,() => {
      console.log(`App running on port: ${port}`.bgCyan.white);
})