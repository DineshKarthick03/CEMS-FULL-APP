import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie=(user,res)=>{
    const token=jwt.sign({id:user._id,role:user.role},ENV_VARS.JWT_SECRET,{expiresIn:'1d'});
    const now = new Date();
    const expiresAtMidnight = new Date(now);
    expiresAtMidnight.setHours(23, 59, 59, 999);
    res.cookie('jwt-portal',token,{
        expires:expiresAtMidnight, // cookie expires at midnight
        httpOnly:true, // accessed only via browser and prevents xss attacks
        sameSite:"strict", // csrf attacks prevention 
        secure:ENV_VARS.NODE_ENV!=='development'
    });
    return token
}