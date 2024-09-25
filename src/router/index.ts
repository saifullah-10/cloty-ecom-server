import express from 'express'
import authRoute from './auth/authRoute';

const router = express.Router();

export default ():express.Router =>{
    authRoute(router);
    return router;
}