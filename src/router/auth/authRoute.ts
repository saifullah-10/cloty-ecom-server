import express,{Router} from 'express'
import { loginUser, registerUser } from '../../controllers/auth/auth'

export default (router: Router)=>{
router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)
}