import { handleError } from "../error.js";
import User from "../models/User.js";

export const getUser = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }

}   



export const update = async (req,res,next) => {
    if(req.params.id ===req.user.id) {
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },{
                new:true,
            }
            );
            res.status(200).json(updateUser);
        } catch (error) {
            next(error);
        }  
        
    } 
    else{
        return next(handleError(403,"only update"))
    } 
}


   
export const deleteUser = async (req,res,next) => {
    if(req.params.id ===req.user.id) {
         try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("user deleted");
         }catch(error) {
            next(error);
         }
        
    } 
    else{
        return next(handleError(403,"only update"))
    } 
}

export const follow = async (req, res, next) => {
    try {
      //user
      const user = await User.findById(req.params.id);
      //current user
      const currentUser = await User.findById(req.body.id);
  
      if (!user.followers.includes(req.body.id)) {
        await user.updateOne({
          $push: { followers: req.body.id },
        });
  
        await currentUser.updateOne({ $push: { following: req.params.id } });
      } else {
        res.status(403).json("you already follow this user");
      }
      res.status(200).json("following the user");
    } catch (err) {
      next(err);
    }
  };


  
  export const unFollow = async (req, res, next) => {
    try {
      //user
      const user = await User.findById(req.params.id);
      //current user
      const currentUser = await User.findById(req.body.id);
  
      if (currentUser.following.includes(req.params.id)) {
        await user.updateOne({
          $pull: { followers: req.body.id },
        });
  
        await currentUser.updateOne({ $pull: { following: req.params.id } });
      } else {
        res.status(403).json("you are not following this user");
      }
      res.status(200).json("unfollowing the user");
    } catch (err) {
      next(err);
    }
  };