import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
	return (
		<div className="min-h-[100vh] gap-4 px-auto w-full grid items-center place-content-center ">
			<div>
				<p className="font text-3xl">Something Went Wrong</p>
			</div>
			<Link to="/">
				<div className="text-center">
					<button className="focus:outline-none p-2 px-4  text-white  bg-red-500 font-bold text-lg rounded-lg">
						Home
					</button>
				</div>
			</Link>
		</div>
	);
};

export default Error;
