import { Router } from "express";
import { deleteProfile } from "./user.service.js";
const router = Router()
router.delete('/deleteProfile',async (req,res,next)=>{
	const results= await deleteProfile(req.body)
	return res.json({
		message:"update profile",
		results
	})
})




export default router