import React, { useState, useRef, useEffect } from "react";
import { ValidateFormEmail } from "../utils/ValidateFormCode";
import Header from "./Header.js";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../utils/firebase.js";

const Landingpage = () => {
	const navigate = useNavigate();
	const activeUser = useSelector((state) => state.user.currentUser);
	useEffect(()=>{
		if (activeUser) {
			console.log("jii");
			navigate("/browse");
		}
	})

	const [signIn, setSignIn] = useState(true);
	const [emailErrorMsg, setEmailErrorMsg] = useState(null);
	const [authMessage, setAuthMessage] = useState(null);
	const [hidePassword, setHidePassword] = useState(true);
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);
	const [loading, setLoading] = useState(false);
	const [submitButtonContent, setSubmitButtonContent] = useState("Sign In");

	const dispatch = useDispatch();

	const name = useRef(null);
	const email = useRef(null);
	const password = useRef(null);

	const toggleShowPassword = () => {
		setHidePassword(!hidePassword);
	};

	useEffect(() => {
		if (signIn) {
			setSubmitButtonContent("Sign In");
		}
		if (!signIn) {
			setSubmitButtonContent("Sign Up");
		}

		if (loading) {
			setSubmitButtonContent("Loading! Please Wait...");
		}
	}, [signIn, loading]);

	const checkFocus = (e) => {
		if (e.target.value) {
			setIsPasswordFocused(true);
		} else {
			setIsPasswordFocused(false);
		}
	};

	const toggleSignUp = () => {
		setEmailErrorMsg(null);
		setSignIn(!signIn);
		setAuthMessage(null);
		if (password.current) {
			password.current.value = "";
		}
		if (name.current) {
			name.current.value = "";
		}
		if (email.current) {
			email.current.value = "";
		}
		setIsPasswordFocused(false);
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		try {
			e.preventDefault();
			
			setEmailErrorMsg(null);
			setAuthMessage(null);
			const emailError = ValidateFormEmail(email.current.value);

			if (emailError) {
				setEmailErrorMsg(emailError);
				return;
			}

			if (signIn) {
				//signin
			
				const formData = {
					email: email.current.value,
					password: password.current.value,
				};
				const response = await fetch(
					"https://flicko.onrender.com/api/v1/auth/login",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(formData),
					}
				);
				const jsonResponse = await response.json();
				if (jsonResponse.Success) {
					dispatch(addUser(jsonResponse.validUser));
					navigate("/browse");
				} else {
					setAuthMessage("Incorrect Email or Password");
				}
			setLoading(false);

			} else {
				//signup
			setLoading(true);

				const formData = {
					name: name.current.value,
					email: email.current.value,
					password: password.current.value,
				};
				const response = await fetch(
					"https://flicko.onrender.com/api/v1/auth/signup",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(formData),
					}

				);
				const jsonResponse = await response.json();
				if (jsonResponse.Success) {
					alert("Thanks for Signing Up");
					setSignIn(true);
					setEmailErrorMsg(null);
					if (password.current) {
						password.current.value = ""; // Reset the value to an empty string
					}
					if (name.current) {
						name.current.value = ""; // Reset the value to an empty string
					}
					if (email.current) {
						email.current.value = ""; // Reset the value to an empty string
					}
				} else {
					setEmailErrorMsg("Email Already Exist");
				}

			}
			setLoading(false);
		} catch (error) {
			navigate("/error");
		}
		setLoading(false);
	};

	const handleGoogleAuth = async () => {
		setLoading(true);
		try {
			const provider = new GoogleAuthProvider();
			const auth = getAuth(app);
			const result = await signInWithPopup(auth, provider);
			const userData = {
				name: result?.user?.displayName,
				email: result?.user?.email,
			};
			const response = await fetch(
				"https://flicko.onrender.com/api/v1/auth/gauth",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(userData),
				}
			);
			const jsonResponse = await response.json();
			if (jsonResponse.Success) {
				dispatch(addUser(jsonResponse.validUser));
				navigate("/browse");
			}
		} catch (error) {
			setLoading(false);
		}
		setLoading(false);
	};

	return (


		<div className="relative">
			<Header />

			<div className="form flex items-center justify-center absolute   min-h-[100vh]  bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_medium.jpg')]  w-full  bg-cover  ">
				<form
					onSubmit={handleSubmit}
					className="bg-black mt-4 sm:mt-0 rounded-3xl px-6 py-1 md:w-1/2  lg:w-[35%] w-[97%]
           bg-opacity-95 "
				>
					<h1 className="text-white flex items-center justify-center text-4xl font-bold m-3 ">
						{signIn ? "Sign In" : "Sign Up"}
					</h1>
					{!signIn && (
						<input
							className=" text-white px-3  w-[90%] p-[10px]  m-3 text-lg bg-[#333333] rounded-md outline-none"
							ref={name}
							type="text"
							name=""
							id=""
							placeholder="Full Name"
							required
						/>
					)}
					<input
						className=" text-white px-3  w-[90%] p-[10px] m-3 text-lg bg-[#333333] rounded-md outline-none"
						ref={email}
						type="text"
						name=""
						placeholder="abc@gmail.com"
						required
					/>

					{emailErrorMsg && (
						<p className="text-red-600 px-3  text-xl">
							{emailErrorMsg}
						</p>
					)}
					<div className="relative">
						<input
							className="text-white w-[90%] px-3 p-[10px] m-3 text-lg bg-[#333333] rounded-md outline-none"
							ref={password}
							type={hidePassword ? "password" : "text"}
							name=""
							placeholder="Password"
							required
							onChange={checkFocus}
						/>

						{isPasswordFocused && (
							<p
								onClick={toggleShowPassword}
								className="absolute top-7 right-10 text-gray-300 hover:cursor-pointer"
							>
								{hidePassword ? "Show" : "Hide"}
							</p>
						)}
					</div>
					{authMessage && (
						<p className="text-red-600 px-3  text-xl">
							{authMessage}
						</p>
					)}

					<button
						type="submit"
						disabled={loading}
						className="focus:outline-none disabled:hover:bg-opacity-80 w-[90%] font-bold text-xl p-2.5 m-3 bg-opacity-80 hover:bg-opacity-100  text-white bg-[#e50914] rounded-lg "
					>
						{submitButtonContent}
					</button>
					<button
						onClick={handleGoogleAuth}
						type="button"
						className=" focus:outline-none flex items-center justify-center gap-2 w-[90%] text-xl px-2 py-2.5  mx-3 my-2 bg-opacity-70 hover:bg-opacity-100 font-bold bg-white rounded-lg  "
					>
						<FcGoogle size={25} />
						Continue With Google
					</button>

					<p className="ml-2 m-3 mt-4  text-xl text-gray-400">
						{signIn ? "New to Flicko?" : "Already Registered!"}{" "}
						<span
							onClick={toggleSignUp}
							className=" hover:underline hover:cursor-pointer text-2xl text-white"
						>
							{signIn ? "Sign Up Now!" : "Sign In"}
						</span>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Landingpage;
