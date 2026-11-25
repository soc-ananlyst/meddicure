import { json, request, response, Router } from "express";
import Admin from "../models/admin.mjs";
import Doctor from "../models/doctor.mjs";
import jwt from 'jsonwebtoken'
import User from "../models/users.mjs"
import { loginValidator, registerValidator } from "../validators/validator.mjs";
import { body, checkSchema, matchedData, validationResult } from "express-validator";
import bcrypt from 'bcrypt'
import checkLockout from "../middleware/lockout.mjs";

const router = Router()



export const generateJwtToken = (payload)=>{

    const token = jwt.sign({payload},process.env.JWT_SECRET,{expiresIn:'1h'})

    return token

}


/*
router.post('/api/user/admin/auth',async(request,response)=>{

    const {email,password} = request.body

    if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD)
        return response.status(403).json({success:false,message:"Invalid email or password"})



    const token = generateAdminToken(process.env.ADMIN_EMAIL,process.env.ADMIN_PASSWORD)

    return response.status(200).json({success:true,token:token,type:'Bearer'})



})
*/



/**
 * @swagger
 * /api/super/list-users:
 *   get: 
 *     summary: Retrieve list of users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListOfUsers'
 * 
 * 
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *     
 */
router.get('/api/super/list-users',async(request,response)=>{
    try {
        const users = await User.find({})
        if(!users)
        {
            return response.status(404).json({success:false,error:"No users retrieved"})
        }

        return response.status(200).json({success:true,users:users})
    } catch (error) {
        
    }
})

/**
 * @swagger
 * /api/super/list-doctors:
 *   get: 
 *     summary: Retrieve all doctors
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListOfUsers'
 * 
 * 
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *     
 */

router.get('/api/super/list-doctors',async(request,response)=>{
    try {
        const users = await Doctor.find({})
        if(!users)
        {
            return response.status(404).json({success:false,error:"No users retrieved"})
        }

        return response.status(200).json({success:true,users:users})
    } catch (error) {
        
    }
})
router.post('/api/super/delete/patients',async(request,response)=>{
   try {
     await User.deleteMany({})
     return response.json({success:true,messages:"Database cleared"})
   } catch (error) {
    return response.json({success:false,message:error.message})
    
   }
    
})


router.post('/api/super/auth',checkSchema(loginValidator),(request,response,next)=>{
    const validation_result = validationResult(request)

    if(!validation_result.isEmpty())
    {
        return response.status(400).json({success:false,error:validation_result.array()})
    }

    return next()
},checkLockout,async(request,response)=>{
    try{
        const {email,password} = request.body;

        const user = await Admin.findOne({email});

        if(!user)
        {
            return response.status(401).json({success:false,message:"invalid username or password"});
        }

        if(user.role !== 'admin')
            return response.status(403).json({success:false,message:"Endpoint protected"})

       

        // COMPARING PASSWORDS ENTERED AND THE USER PASSWORD IN OUR DATABASE
        const passswordMatch =await bcrypt.compare(password,user.password)

       

        if(!passswordMatch)
        {
            user.loginAttempts +=1
            user.lastLoginAttempt = new Date
            await user.save();
            return response.status(409).json({success:false,message:"Invalid email or password"})
        }
        user.loginAttempts = 0;
        await user.save();
      


        const payload = {
            id:user._id,
            role:user.role,
        }

        const token = generateJwtToken(payload);

        return response.status(200).json({success:true,token:token,type:"Bearer"});


    }catch(err)
    {
        console.error('Admin authentication failed:',err)
        return response.status(500).json({success:false,message:"Unable to process authentication request"})

    }

})

router.post('/api/super/add',checkSchema(registerValidator),async(request,response)=>{
    try
    {
        const result = validationResult(body)

        if(!result.isEmpty)
            return response.status(409),json({success:false,error:result.array});

        const data = matchedData(request.body);

        const {email,firstName,lastName,gender,password1,password2} = request.body;

        const user = await Admin.findOne({email});

        //check whether another user with same email exists

        if(user)
            return response.status(409).json({success:false,message:"user exists"});

        // compare the user passwords
        if(password1 !== password2)
        {
            return response.status(409).json({success:false,message:"passwords mismatch"});
        }

        const salt = await bcrypt.genSalt(10);

        const hashed_password =await bcrypt.hash(password2,salt);

        data.password = hashed_password;

        const newUser = new Admin({
            firstName:firstName,
            lastName:lastName,
            email:email,
            gender:gender,
           
            role:'admin',
            password:hashed_password
        })

        newUser.status = 'Approved';
        await newUser.save();

        const user_out = {
            id:newUser._id,
            email:newUser.email,
            first_name:newUser.firstName,
            last_name:newUser.lastName,
            role:newUser.role,
            gender:newUser.gender

        }

        return response.status(201).json({success:true,user:user_out});



        //console.log(data);
    }catch(error)
    {
        console.log(error)
    }
})

export default router