const authRepository = require("../repository/auth.repository");
const user = new authRepository();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/server.config");

class User {
	createUser = (name, email, password) => {

		const hash = bcrypt.hashSync(password, 10);
		const checkUser = user.createUser(name, email, hash);
		return checkUser;
	};
	createGoogleUser=async (name,email)=>{
		const checkUser=await user.getUser(email);
		if(checkUser){
			return checkUser;
		}
		const firstName=name.split(" ")[0];
		const randomPassword=Math.random().toString(36).slice(2) +
        Math.random().toString(36)
        .toUpperCase().slice(2);
		const hash = bcrypt.hashSync(randomPassword, 10);
		await user.createUser(firstName,email,hash);
		const validUser=await user.getUser(email);
		return validUser;

	};

	getUser = async (email, password) => {
		const validUser = await user.getUser(email);
		if (!validUser) {
			return false;
		}
		const hash = await validUser?.password;
		const match = bcrypt.compareSync(password, hash);
		if (!match) {
			return false;
		}
		const token = jwt.sign({ id: validUser._id }, JWT_KEY);
		return { validUser, token };
	};
	deleteUser = (email) => {
		user.deleteUser(email);
	};
}
module.exports = User;
