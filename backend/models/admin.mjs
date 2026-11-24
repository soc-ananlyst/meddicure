import mongoose from "mongoose";



const adminSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,

    },
    lastName:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        

    },
    password:{
        type:String,
        reqruied:true,
        
    },
    role:{
        type:String,
        enum:['patient','doctor','admin'],
        default:'admin'
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isVerified:{
        type:Boolean,
        default:true
    },
    status:{
        type:String,
        enum:['Pending','Approved','Inactive','Suspended','Banned'],
        default:'Approved'
    },
    loginAttempts:{
        type:Number,
        default:0
    },
    lastLoginAttempt:{
        type:Number,
        default:new Date
    },
    lastLogin:{
        type:Number,
        default:new Date
    },
    joined:{
        type:Number,
        default:new Date
    },
    updatedAt:{
        type:Number,
        default:new Date
    }

})

const Admin  = mongoose.models.admin || mongoose.model('admin',adminSchema)

export default Admin