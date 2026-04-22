import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
	firstName:{
		type:String,
		required:true,
		minlength:3,
		trim: true 
	},
	lastName:{
		type:String,
		required:true,
		minlength:3,
		trim: true 
	},
	email:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true,
	},
	role:{
		type:String,
		enum:['user','admin'],
		default:'user'
	},
	age:{
		type:Number,
		required:true,
		validate:{
			validator: function (value) {
				return value>18
			},
			message:"age must be greater than 18"
		}
	},
	_2SV:{
		type:Boolean,

		default:false
	},
	otp:{
		type:String,
		default:null
	}
},{
	collection:"User",
	timestamps:true,
	toJSON:{virtuals:true},
	toObject:{virtuals:true}
})
// moaz abdelmoneim

userSchema.virtual("fullName").set(
	function (value) {
		const parts = value.split(' ')

		this.firstName= parts[0]
		this.lastName= parts[1]
	}
)





//.                      false         ||      true 
const userModel = mongoose.model("User", userSchema)

export default userModel