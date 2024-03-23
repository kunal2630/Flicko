import { useEffect, useState } from "react";
import userLogo from "../images/Netflix-avatar.png";
import logo from "../images/logo.png";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { updateSearchValue } from "../utils/searchSlice";
import { removeGptSuggestedMovies } from "../utils/nowPlayingMovieSlice";
import {
	addCastDetailsFromId,
	addMovieDetailsFromId,
	addMovieId,
} from "../utils/movieSlice";

const Header = () => {
	const userName = useSelector((store) => store?.user?.currentUser);
	const searchValue = useSelector((store) => store?.search?.searchValue);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [scrolling, setScrolling] = useState(false);

	const signoutHandler = () => {
		dispatch(addMovieId(null));
		dispatch(addMovieDetailsFromId(null));
		dispatch(addCastDetailsFromId(null));
		dispatch(removeUser());

		navigate("/");
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setScrolling(true);
			} else {
				setScrolling(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="absolute  ">
			<div
				className={`flex  justify-between   bg-gradient-to-b from-[#141414] transition-all ease-in-out duration-1000 text-white ${
					userName ? "fixed" : "relative"
				} w-[100%] top-0 z-30  p-1 py-2  ${
					scrolling && userName ? "bg-[#141414] " : " "
				}  `}
			>
				<div
					className={` ml-3 overflow-hidden ${
						searchValue
							? "hover:cursor-auto"
							: "hover:cursor-pointer"
					}  `}
					onClick={() => {
						dispatch(addMovieId(null));
						dispatch(addMovieDetailsFromId(null));
						dispatch(addCastDetailsFromId(null));
					}}
				>
					{!searchValue ? (
						<Link to="/browse">
							<img
								src={logo}
								className="xl:w-28 pt-2 pb-1 lg:w-24 w-20  overflow-hidden"
								alt="logo"
							/>
						</Link>
					) : (
						<img
							src={logo}
							className="xl:w-28 pt-2 pb-1 lg:w-24 w-20  overflow-hidden"
							alt="logo"
						/>
					)}
				</div>

				{userName && (
					<>
						<div className=" flex items-center  gap-6 relative ">
							<div
								className="hover:cursor-pointer outline-none focus:outline-none"
								onClick={() => {
									dispatch(updateSearchValue());
									dispatch(removeGptSuggestedMovies());
									dispatch(addMovieId(null));
									dispatch(addMovieDetailsFromId(null));
								}}
							>
								<button
									className={`flex hover:bg-opacity-70 hover:text-white text-lg outline-none focus:outline-none rounded-lg items-center gap-2 hover:bg-black p-1 px-2 ${
										searchValue
											? "text-red-600 bg-black"
											: ""
									}`}
								>
									{searchValue ? (
										"BROWSE"
									) : (
										<>
											{" "}
											GPT <FaSearch size={15} />{" "}
										</>
									)}
								</button>
							</div>

							<p className="hidden md:flex text-xl font-bold">
								{userName?.userName.charAt(0).toUpperCase() +
									userName?.userName.slice(1)}
							</p>
							<IoIosNotifications
								className="hidden sm:flex text-3xl  hover:cursor-pointer"
								size={25}
							/>
							<div className="flex gap-2 ">
								<img
									className="w-9 h-9 mt-1 object-cover rounded-md"
									src={userLogo}
									alt="userLogo"
								/>
								<div className="dropdown-sm mt-3 focus:outline-none">
									<button
										className="btn outline-none focus:outline-none btn-secondary btn-sm  border-none dropdown-toggle"
										type="button"
										id="dropdownMenuButton"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
									></button>
									<div
										className="dropdown-menu"
										aria-labelledby="dropdownMenuButton"
									>
										<button
											className="dropdown-item hover:bg-red-600 hover:text-white"
											onClick={signoutHandler}
										>
											Sign Out
										</button>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Header;
