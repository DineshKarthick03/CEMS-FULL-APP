import express from 'express';
import authRoutes from "./routes/auth.route.js"; 
import eventRoutes from "./routes/event.route.js";
import dotenv from 'dotenv';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { protectRoute } from './middleware/protectRoute.js';


dotenv.config();
const app=express();
const PORT=ENV_VARS.PORT
app.use(
  cors({
    origin: ["https://cems-full-app.vercel.app","http://localhost:5173"], // frontend URL
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true // if you use cookies
  })
);
console.log(process.env.MONGO_URI);

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth",authRoutes); 
app.use("/api/v1/event",protectRoute,eventRoutes); 


app.listen(PORT,()=>{
    console.log("Server is running on port "+PORT);
    connectDB();
}); 

