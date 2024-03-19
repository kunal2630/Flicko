const catchAsyncError = require("../middleware/catchAsyncError");
const authService = require("../service/auth.service");
const ErrorHandler = require("../utils/customError");
const User = new authService();
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/server.config");

const signUp = catchAsyncError(async (req, res, next) => {
	const { name, email, password } = req.body;
	const user = await User.createUser(name, email, password);
	if (user) {
		return next(new ErrorHandler("User Already Exist", 501));
	}

	return res.status(201).json({
		Success: true,
		msg: "User Created Successfully",
	});
});
const signIn = catchAsyncError(async (req, res, next) => {
	const { email, password } = req.body;
	const { validUser, token } = await User.getUser(email, password);
	if (!validUser) {
		return next(new ErrorHandler("Incorrect Email or Password", 401));
	}
	//cookie expires after 3 hour
	const expiryDate = new Date(Date.now() + 3 * 60 * 60 * 1000);
	res.cookie("access_token", token, { httpOnly: true, expires: expiryDate })
		.status(201)
		.json({
			Success: true,
			msg: "Login Successfully",
			validUser,
		});
});

const deleteUser = catchAsyncError(async (req, res) => {
	const { email } = req.body;

	const result = await User.deleteUser(email);

	res.status(201).json({
		Status: "ok",
		msg: "Deleted Successfully",
	});
});
const handleGoogleAuth = catchAsyncError(async (req, res, next) => {
	const { name, email } = req.body;
	const validUser = await User.createGoogleUser(name, email);

	const token = jwt.sign({ id: validUser._id }, JWT_KEY);
	const expiryDate = new Date(Date.now() + 3 * 60 * 60 * 1000);
	res.cookie("access_token", token, { httpOnly: true, expires: expiryDate })
		.status(201)
		.json({
			Success: true,
			msg: "Login Successfully",
			validUser,
		});
});

module.exports = {
	signUp,
	signIn,
	deleteUser,
	handleGoogleAuth,
};
