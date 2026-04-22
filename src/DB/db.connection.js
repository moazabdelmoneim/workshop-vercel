import mongoose from "mongoose";
import { appConfig } from "../../config/config.service.js";
const connectDb = async()=>{
	await mongoose.connect(appConfig.db_url)
	.then(()=>{
		console.log('db connected successfully');
	})
	.catch(err=> console.log(err))
}


export default connectDb