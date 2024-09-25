import express,{Router} from 'express'
import { test } from '../../controllers/auth/auth'
export default (router: Router)=>{
router.get('/auth', test)
}