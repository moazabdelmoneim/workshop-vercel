import { Router } from "express";
import bcrypt from "bcrypt";
import userModel from "../../DB/models/user.model.js";
import { login, signup } from "./auth.service.js";
import { multer_local } from "../../middleware/multer.js";
import cloudinary from "../../utils/cloudinary.js";
import { sendEmail } from "../../utils/mail/sendEmail.js";
import { customAlphabet } from "nanoid";
const router = Router()

router.post("/signup",async(req,res,next)=>{
	const results = await signup(req.body)
	return res.status(200).json({
		message:"register router",
		results
	})
})

router.post("/login",async(req,res,next)=>{
	const results = await login(req.body)
	return res.status(200).json({
		message:"login router", 
		results
	})
})
router.post('/single',multer_local().single('attachment'),(req,res,next)=>{
	// Handle the single file upload
	const baseUrl = `${req.protocol}://${req.headers.host}`
	req.file.finalPath=`${baseUrl}/${req.file.destination}${req.file.filename}`
	return res.json({
		message:"single file upload",
		file:req.file,
		body:req.body
	})	
})
router.post('/array',multer_local().array('attachments'),(req,res,next)=>{
	// Handle the single file upload
	const baseUrl = `${req.protocol}://${req.headers.host}`
	req.files.forEach(file => {
		file.finalPath = `${baseUrl}/${file.destination}${file.filename}`;
	});
	return res.json({
		message:"array file upload",
		files:req.files,
		body:req.body
	})	
})
router.post('/fields',multer_local().fields([
	{name:"attachment",maxCount:1},
	{name:"attachment2",maxCount:1}	
]),(req,res,next)=>{
	// Handle the single file upload
	const baseUrl = `${req.protocol}://${req.headers.host}`
	// req.file.finalPath=`${baseUrl}/${req.file.destination}${req.file.filename}`
	return res.json({
		message:"single file upload",
		file:req.file,
		body:req.body
	})	
})


router.post('/singleCloud',multer_local().single('attachment'),async (req,res,next)=>{
	// Handle the single file upload
	const result = await cloudinary.uploader.upload(req.file.path)
	return res.json({
		message:"single file upload",
		result
	})	
})
router
// router.get('/test',multer_local().single('attachment'),(req,res,next)=>{
// 	const baseUrl = `${req.protocol}://${req.headers.host}`	
// 	req.file.finalPath=`${baseUrl}/${req.file.destination}${req.file.filename}`
// 	return res.json({
// 		message:"test router",
// 		file:req.file,
// 		body:req.body
// 	})
// })


// router.post('/test1',multer_local({customPath:"test1"}).fields([
// 	{name:"attachment",maxCount:1},
// 	{name:"attachment2",maxCount:1}	
// ]),(req,res,next)=>{
// 	const baseUrl = `${req.protocol}://${req.headers.host}`	
// 	console.log(req.files['attachment']);
// 	req.file.finalPath=`${baseUrl}/${req.file.destination}${req.file.filename}`
// 	return res.json({
// 		message:"test router",
// 		file:req.files,
// 		body:req.body
// 	})})		



// two step verification 
// send otp to email 


router.post('/toggle2sv', async(req,res)=>{
	const {email} = req.body	
	const user = await userModel.findOne({email})
	if(!user){
		return res.status(404).json({
			message:"invalid email"
		})
	}
	const otp = customAlphabet("0123456789",4)()
	console.log(otp);
	
	const hashOtp= bcrypt.hashSync(otp,8)
	await userModel.updateOne({email},{otp:hashOtp})
	await sendEmail({
		to:email,
		subject:user.tsv?"disable 2SV otp":"enable 2SV otp",
		html:`<h1>${otp}</h1>`
	})
	return res.json({
		message:"otp sent to email"
	})
})

router.patch('/confirm2sv',async(req,res)=>{

	const {email,otp} = req.body
	const user = await userModel.findOne({email})
	if(!user){
		return res.status(404).json({
			message:"invalid email"
		})
	}
	if(!user.otp){
		return res.status(400).json({
			message:"no otp for this email"
		})
	}
	const isValidOtp = bcrypt.compareSync(otp,user.otp)
	if(!isValidOtp){
		return res.status(400).json({
			message:"invalid otp"
		})
	}
	await userModel.updateOne({email},{_2SV:!user._2SV,otp:null})
	return res.json({
		message:user._2SV?"2SV disabled":"2SV enabled"
	})
})


export default router 