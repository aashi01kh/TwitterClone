import express from 'express';
import dotenv from "dotenv";
import mongoose from"mongoose";
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import tweetRoutes from './routes/tweets.js';
import cors from 'cors';


const app = express();
app.use(cors());
dotenv.config();


const connect = () =>{
    mongoose.set("strictQuery",false);//warning was coming
    mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('connected to database')
        // listen to port
        app.listen(process.env.PORT, () => {
          console.log('listening for requests on port', process.env.PORT)
        })
      })
      .catch((err) => {
        console.log(err)});

}

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/tweets",tweetRoutes)



app.listen(8000 , () => {
    connect();
    console.log("Listening to port 8000")
});