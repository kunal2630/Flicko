import { useEffect, useState } from "react";
import useFetchNowPlayingMovieTeaser from "../hooks/useFetchNowPlayingMovieTeaser";
import useFetchNowPlayingMovieData from "../hooks/useFetchNowPlayingMovieData";
import { useSelector } from "react-redux";
const HomepageMainComponent = () => {
	useFetchNowPlayingMovieData();

	const nowPlayingMovieData = useSelector(
		(store) => store.nowPlayingMovieData
	);

	const [movieInfo, setMovieInfo] = useState({
		id: null,
		title: "",
		description: "",
	});

	useEffect(() => {
		const results = nowPlayingMovieData?.nowPlayingMovie?.results;
		if (results && results.length > 0) {
			const { id, title, overview: description } = results[7];
			setMovieInfo({ id, title, description });
		}
	}, [nowPlayingMovieData]);

	useFetchNowPlayingMovieTeaser(movieInfo.id);

	const movieTeaserData = useSelector(
		(store) => store.nowPlayingMovieData.trailerData
	);

	const movieTeaserId = movieTeaserData?.key;

	return (
		<div className="relative w-full ">
			<div className="absolute left-6 lg:left-12  bottom-24 min-[400px]:bottom-32  min-[500px]:bottom-48  sm:bottom-36 md:bottom-40 lg:bottom-48 xl:bottom-64  w-1/2 z-20 text-white brightness-200	 ">
				<p className=" text-3xl lg:text-4xl italic font-extrabold  tracking-widest mb-2 ">
					{movieInfo.title}
				</p>
				<p className="hidden lg:flex text-sm  md:text-lg    font-medium tracking-tighter   text-white">
					{movieInfo?.description}
				</p>
			</div>
			<div className=" -mt-16  lg:-mt-24">
				<iframe
					className="flex w-full  aspect-square sm:aspect-video   "
					src={`https://www.youtube.com/embed/${movieTeaserId}?playlist=${movieTeaserId}&loop=1&autoplay=1&mute=1&rel=0&controls=0`}
					title="YouTube video player"
				></iframe>
			</div>
		</div>
	);
};

export default HomepageMainComponent;
