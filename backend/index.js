import express, { request, response } from "express";
import { PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app =express();
//middleware for parsing request body
app.use(express.json());

//middleware for handling cors
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

app.get('/',(request,response)=>{
    console.log(request);
    return response.status(255).send('Welcome to book store app');
});

app.use('/books',booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(()=>{
    console.log('App connected to database');
    app.listen(PORT,() =>{
        console.log(`App is listening to port:${PORT}`);
     });
  })
  .catch((error)=>{
    console.log(error);
  })