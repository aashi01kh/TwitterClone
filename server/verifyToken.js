 import jwt from 'jsonwebtoken'
 import {handleError} from './error.js';

 export const verifyToken = (req, res,next) =>{
    const token  = req.cookies.access_token;
    if(!token) return next(handleError(401,"you are not authen"));

    jwt.verify(token,process.env.JWT,(err,user) => {
        if(err) return next(createError(403,"TOken is invalid"));
        req.user = user;
        next();
    });
 }  ;