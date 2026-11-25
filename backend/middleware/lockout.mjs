import { response } from "express";
import Admin from "../models/admin.mjs";

const checkLockout = async (request,response,next)=>{

    try
    {
    const {email} = request.body;
    const LOCKOUT_TIME_MS = 15*60*1000;
    const user  = await Admin.findOne({email});

    if(user && user.lastLoginAttempt && user.loginAttempts >= 5)
    {
        const timeSinceLastAttempt = Date.now() - new Date(user.lastLoginAttempt).getTime();
        if(timeSinceLastAttempt < LOCKOUT_TIME_MS)
        {
            const remainingMinutes = Math.ceil((LOCKOUT_TIME_MS - timeSinceLastAttempt) / (1000 * 60));
            return response.json({success:false,message:`Account locked try again in ${remainingMinutes} minutes`});
        }

        user.loginAttempts = 0;
        await user.save();

    };
    request.admin = user;
    return next();
    }
    catch(error)
    {
        return next(error);
    }

};


export default checkLockout;