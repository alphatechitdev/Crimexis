import mongoose, { Schema } from "mongoose";



const sessionSchema = new mongoose.Schema({
    sessionID:String,
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    ip: {type:String},
    isActive:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now},
    expiresAt:{type:Date}
});

