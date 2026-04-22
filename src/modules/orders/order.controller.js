//      /order/creatorder
import { Router } from "express";
import { createOrder ,order} from "./order.service.js";
const router = Router()


router.post("/createOrder",async(req,res,next)=>{
	const result = await createOrder(req.body)
	return res.status(201).json({
		message:"done",
		result
	})
})
// get order
router.get('/order',async(req,res,next)=>{
	const result = await order(req.body)
	return res.status(200).json({
		message:"done",
		result
	})
})



// 
export default router