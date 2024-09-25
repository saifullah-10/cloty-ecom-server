
import express, { Request, Response } from 'express';
import dotEnv from 'dotenv'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import router from './router';
dotEnv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(compression())
app.use('/', router())
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with ');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

