import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name:{type:String},
    userId:{type:String},
    password:String
});

const User = mongoose.model('users', userSchema);


export default User;