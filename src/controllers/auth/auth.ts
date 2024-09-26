import express,{Request,Response} from 'express'
import { createUser, getUserByEmail, getUserByEmailWithPassword } from '../../models/auth/register';
import bcrypt from 'bcrypt'
import {z} from 'zod'
import dotEnv from 'dotenv'
dotEnv.config()
const registerValidationSchema = z.object({
    firstName: z.string().min(1, "First Name Is Required"),
    lastName: z.string().min(1, "Last Name Is Required"),
phone: z.string().min(1, "Phone Number Is Require").transform(val=>Number(val)),
email: z.string().email("Invalid Email Format"),
password: z.string().min(6 , "Password Must Be 6 characters")
})

const loginValidationSchema = z.object({
    email: z.string().email("Invalid Format Of Email"),
    password: z.string().min(6, "Password Must Be 6 Characters")
})

//login

export const loginUser = async(req:Request, res: Response)=>{

    try{

        const {email,password} = req.body;
        if(!email || !password){
            return res.status(403).json({
                message: "All Fields Are Require"
            }).end()
        }

        const checkValidation = loginValidationSchema.parse({email,password})

        const user = await getUserByEmailWithPassword(email)
        if(user && checkValidation){

            const isMatch = await bcrypt.compare(password, user?.hashPassword)
      if(isMatch){
        const userWithoutPass = await getUserByEmail(email)
        return res.status(200).json(userWithoutPass)
      }else{
        return res.status(403).json({
            message: "Email Or Password Mismatched"
        })
      }

        }else{
            return res.status(400).json({message: "User Not Found"})
        }




    }catch(err){
        return res.status(400).json(err)
    }

}

//register 
export const registerUser = async (req:Request, res: Response )=>{

try{
    const {firstName, lastName, phone, email, password} = req.body;
if(!firstName || !lastName || !phone || !email || !password){
    return res.status(403).json({
        message: "All Field Are Require"
    }).end()
}
const valid = registerValidationSchema.parse({firstName, lastName, phone, email, password})
if(!valid){
    return res.status(400).json({
        message: "Provide valid Information"
    }).end() 
}
const existingUser = await getUserByEmail(email);

if(existingUser){
    return res.status(401).json({message:"User Already Exist"}).end()
}
const salt = await bcrypt.genSalt(10); 

const hashPassword = await bcrypt.hash(password, salt)
const value = {firstName, lastName, phone, email, hashPassword, salt}
const registerUserToDB = await createUser(value)



return res.status(200).json(registerUserToDB).end()
}catch(err){
   return res.status(400).json(err).end()
}



}

