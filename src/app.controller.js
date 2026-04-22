import express from 'express'
import { authRouter, userRouter, orderRouter } from './modules/index.js'
import { appConfig} from '../config/config.service.js'
import connectDb from './DB/db.connection.js'
const bootstrap = async (app)=>{
	app.use(express.json())
	app.use('/uploads',express.static('uploads'))
	app.use("/auth", authRouter)
	app.use("/user", userRouter)
	app.use('/orders',orderRouter)



	await connectDb()
	app.use((err,req,res,next)=>{
		const statusCode = err.cause?.status || 500
		return res.status(statusCode).json({
			message:err.message
		})
	})
	app.listen(appConfig.port,()=>{
		console.log(`app is running on ${appConfig.port}`);
		
	})
} 

export default bootstrap