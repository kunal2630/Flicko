const User = require("../modals/userInfo.schema.js");
const bcrypt = require("bcrypt");

class userRepository {
	createUser = async (name, email, password) => {
		const user = await User.findOne({ email: email });

		if (user) {
			return true;
		}
		await User.create({
			userName: name,
			email,
			password,
		});
	};
	getUser = async (email) => {
		const result = await User.findOne({
			email: email,
		});
		return result;
	};
	deleteUser = async (email) => {
		await User.findOneAndDelete({email:email});
		
	};
}
module.exports = userRepository;
