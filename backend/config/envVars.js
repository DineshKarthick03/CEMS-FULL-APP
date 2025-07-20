import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

//console.log('DEBUG MONGO_URI from envVars.js:', process.env.MONGO_URI);

export const ENV_VARS={
    MONGO_URI:process.env.MONGO_URI,
    PORT:process.env.PORT || 8000,
    JWT_SECRET:process.env.JWT_SECRET,
    NODE_ENV:process.env.NODE_ENV,
}