import userModel from "../../DB/models/user.model.js"

export const signup = async(inputs)=>{
	//check if exists
	const {email} =inputs
	console.log(inputs);
	const userExists = await userModel.findOne({email})
	console.log(userExists);
	
	// if exists return error 409
	if(userExists){
		throw new Error("invalid email",{cause:{status:409}})
	}
	// create 
	const user = await userModel.create(inputs)

	return user
}
export const login = async(inputs)=>{
	//check if exists
	const {email,password} =inputs
	const userExists = await userModel.findOne({email})
	// ifnot exists return error 409
	if(!userExists){
		throw new Error("invalid email",{cause:{status:409}})
	}
	if(password !== userExists.password){
		throw new Error("invalid Password",{cause:{status:409}})
	}


}