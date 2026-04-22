import { orderModel } from "../../DB/models/orders.model.js"




export const createOrder = async(inputs)=>{
	const order = await orderModel.create(inputs)
	return order
}

export const order = async(inputs)=>{
	const {id} = inputs
	const order = await orderModel.aggregate([
		{ // stage 1
			$match:{
				totalPrice:{$gt:50}
			}  // select all orders that total price more than 50
		},
		// stage 
		{
			$lookup:{
				from:"User",
				localField:"userId",
				foreignField:"_id",
				as :"user"
			} // join with userModel
		},
		{
			$sort:{
				totalPrice:-1
			}
		},
		{
			$limit:3
		}
		// {
		// 	$group:{
		// 		// userid1 ==> 3000
		// 		// userId ==> 8000
		// 		_id:"$userId",
		// 		totalSpend:{$sum:"$totalPrice"}
		// 	}
		// }
	])
	return order
}
/*
aggregation
data =====> process add some analysis - project - join - grouping ===> return data after processing 

stage 1
match ==> 

stage 2
lookup ==> join 

stage 3


unwind 

order : [ product1 , product 2 , product 3]

order product1 {}

order1 product2 {}



*/