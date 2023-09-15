import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { handleError } from "../error.js";

export const signup = async (req,res,next) => {
    // console.log(req.body);
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body,password:hash});

        await newUser.save();

        const token = jwt.sign({id:newUser._id},process.env.JWT );


        const {password , ...othersData } = newUser._doc; // doc for unnecessary data , and for not sending the password 

        res.cookie('access_token',token,{
            httpOnly:true,

        }).status(200).json(othersData);

    }catch(err){
        next(err);
    }
};


export const signin = async (req,res,next) => {
    
    try {
        const  user = await User.findOne({username:req.body.username})
        if(!user){
            return next(handleError(404,'user not found'));
            // return res.status(401).json({message:"Invalid username or password"});
        }

        const isCorrect = await bcrypt.compare(req.body.password,user.password);
        if(!isCorrect){
            return next(handleError(400,'Invalid  password'));
            
        }

        const token = jwt.sign({id:user._id},process.env.JWT );
        const {password, ...othersData} = user._doc;
        res.cookie('access_token',token,{
            httpOnly:true,}).status(200).json(othersData)

    }catch(err){
        next(err);
    }
};


