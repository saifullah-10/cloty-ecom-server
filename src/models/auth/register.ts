import mongoose from "mongoose";

export const User = mongoose.model("User", new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: Number, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    hashPassword: {type: String, required: true, select: false},
    salt: {type:String, required: true, select:false}
    

}))

export const getUserByEmail = (email:string)=> User.findOne({email})
export const getUserByEmailWithPassword = (email:string)=> User.findOne({email}).select("+hashPassword")

export const getUserById = (id: string)=> User.findById(id)

export const getAllUsers  = () => User.find()

export const createUser = (value: Record<string, any>)=> new User(value).save().then(user=>user.toObject())

export const deleteUser = (id: string)=> User.findOneAndDelete({_id: id})

export const updateUser = (id:string, value:Record<string,any>)=> User.findByIdAndUpdate(id,value)