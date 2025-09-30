import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {clerkMiddleware, requireAuth} from '@clerk/express'
import aiRouter from './routes/aiRouters.js';
import userRouter from './routes/userRoutes.js'
import connectCloudinary from './configs/cloudinary.js';

const app=express()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

connectCloudinary();

app.get('/',(req,res)=>res.send('Server is Live!'))

app.use(requireAuth())

app.use('/api/ai',aiRouter)
app.use('/api/user',userRouter)
app.unsubscribe('/api/user',aiRouter)
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log('Server is running on port',PORT);
  
})