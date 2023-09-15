import express from "express"
import { getUser,update,deleteUser ,follow ,unFollow} from '../controllers/user.js'
import { verifyToken } from "../verifyToken.js";


const router = express.Router();

//update user
router.put('/:id',verifyToken, update );


router.get('/find/:id',getUser)

//Delete user
router.delete('/:id',verifyToken,deleteUser);


//follow
router.put("/follow/:id",verifyToken,follow);

router.put("/unfollow/:id", verifyToken, unFollow);

export default router;