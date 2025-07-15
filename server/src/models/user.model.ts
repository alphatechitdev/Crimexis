import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name:{type:String, unique:true},
    userId:{type:String, unique:true},
    password:String
});

const User = mongoose.model('users', userSchema);


export default User;