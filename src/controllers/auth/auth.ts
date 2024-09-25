import express,{Request,Response} from 'express'

export const test = (req:Request, res: Response )=>{

res.send("from test")


}