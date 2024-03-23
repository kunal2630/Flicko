import React, { useState } from "react";
import Moviecard from "./Moviecard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Moviesection = ({ sliderId, title, data }) => {
	const [slider, setSliderValue] = useState(false);

	const moviesData = data?.results;

	const slideImageLeft = () => {
		const slider = document.getElementById(sliderId);
		if (slider) {
			slider.scrollLeft -= 1200;
		}
	};
	const slideImageRight = () => {
		const slider = document.getElementById(sliderId);

		if (slider) {
			slider.scrollLeft += 1200;
		}
	};

	return (
		<div
			className=" pb-3 relative z-20  "
			onMouseOver={() => setSliderValue(true)}
			onMouseOut={() => setSliderValue(false)}
		>
			<h1 className=" ml-4 xl:ml-5 pb-2 text-2xl lg:text-4xl font-extrabold tracking-wide  text-white">
				{title}
			</h1>
			{slider && (
				<div
					className=" realtive  hover:cursor-pointer"
					onClick={slideImageLeft}
				>
					<MdChevronLeft
						className="absolute  hover:bg-white rounded-full z-20 top-40 left-12 "
						size={55}
						color="black"
					/>
				</div>
			)}

			<div
				id={sliderId}
				className=" scrollbar-hide flex  overflow-x-scroll items-center relative    scroll-smooth overflow-y-hidden p-2 ml-2 xl:ml-8"
			>
				{moviesData &&
					moviesData.length > 0 &&
					moviesData.map((movie) => (
						<Moviecard
							key={movie.id}
							posterId={movie.poster_path}
							id={movie.id}
						/>
					))}
			</div>

			{slider && (
				<div
					className=" realtive hover:cursor-pointer"
					onClick={slideImageRight}
				>
					<MdChevronRight
						className="absolute   hover:bg-white z-20 top-40   rounded-full right-2"
						size={55}
						color="black"
					/>
				</div>
			)}
		</div>
	);
};

export default Moviesection;
