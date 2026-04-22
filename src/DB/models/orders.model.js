// userId. ---- totalPrice
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		userId : {
			type:mongoose.Types.ObjectId,
			required:true,
			ref:"User"
		},
		totalPrice:{
			type:Number,
			required:true
		}
	},{
		timestamps:true
})










//.                         doesnt exits false
export const orderModel =mongoose.models.Order || mongoose.model("Order",orderSchema)