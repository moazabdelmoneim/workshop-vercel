
import userModel from "../../DB/models/user.model.js";

export const deleteProfile = async (inputs) => {
	const { firstName, id } = inputs;
	const user = await userModel.findByIdAndDelete(id);
	if (!user) {
		throw new Error("user not found ", { cause: { status: 404 } });
	}
	return user;
};
