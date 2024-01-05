import { useEffect, useState } from "react";
import "./App.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
	Navigation,
	Pagination,
	Scrollbar,
	A11y,
	Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { InfinitySpin } from "react-loader-spinner";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useWindowDimensions from "./hooks/useWindowDimensions";
function App() {
	const [isAnswerLoaded, setIsAnswerLoaded] = useState(false);
	const [inputImage, setInputImage] = useState(null);
	const fun_facts = [
		"Did you know that real images capture subtle imperfections, while AI-generated images exhibit unnaturally flawless perfection?",
		"Did you know that authentic photos portray genuine emotions, contrasting with AI-generated images that may simulate expressions lacking real human sentiment?",
		"Did you know that real landscapes depict the unpredictability of nature, unlike AI-generated scenes that sometimes include physically impossible elements?",
		"Did you know that genuine lighting conditions in real photos create nuanced shadows, adding depth and realism absent in artificially generated images?",
		"Did you know that authentic smiles in real images reflect genuine happiness, whereas AI-generated smiles can appear exaggerated and artificial?",
		"Did you know that real perspectives maintain consistency in scenes, while AI-generated images may struggle with spatial coherence and realistic proportions?",
		"Did you know that authentic poses in real photos adhere to the laws of physics, contrasting with AI-generated figures placed in physically impossible or awkward positions?",
		"Did you know that real images are contextually aware, with objects and figures appropriately placed, unlike AI-generated scenes that may lack contextual understanding?",
		"Did you know that real patterns in photographs exhibit natural variations, as opposed to the sometimes repetitive and artificial patterns found in AI-generated content?",
		"Did you know that unintentional symbolism may emerge in AI-generated images, as algorithms lack the cultural understanding to avoid conveying unintended messages or associations?",
		"Did you know that FARQ means difference in Hindi?",
	];
	const { isMobile } = useWindowDimensions();
	var settings = {
		dots: false,
		infinite: true,
		autoplay: true,
		speed: 500,
		slidesToShow: isMobile ? 7 : 10,
		slidesToScroll: 1,
	};
	function getAnswer() {}

	const [randomNumber, setRandomNumber] = useState(
		Math.floor(Math.random() * fun_facts.length)
	);

	useEffect(() => {
		//update the random number every 5 seconds
		const interval = setInterval(() => {
			setRandomNumber(Math.floor(Math.random() * fun_facts.length));
		}, 7000);
		return () => clearInterval(interval);
	}, []);
	return isAnswerLoaded ? (
		<></>
	) : (
		<>
			<div className="slider-wrapper">
				<Slider {...settings} className="slider slider-top">
					<div>
						<h3>1</h3>
					</div>
					<div>
						<h3>2</h3>
					</div>
					<div>
						<h3>3</h3>
					</div>
					<div>
						<h3>4</h3>
					</div>
					<div>
						<h3>5</h3>
					</div>
					<div>
						<h3>6</h3>
					</div>
					<div>
						<h3>1</h3>
					</div>
					<div>
						<h3>2</h3>
					</div>
					<div>
						<h3>3</h3>
					</div>
					<div>
						<h3>4</h3>
					</div>
					<div>
						<h3>5</h3>
					</div>
					<div>
						<h3>6</h3>
					</div>
				</Slider>
			</div>

			<div className="page-margin App">
				<nav>
					<div>
						<h1 style={{ cursor: "pointer" }}>FARQ</h1>
						<div className="rectangle"></div>
					</div>
				</nav>
				<div className="main">
					<h1>
						Detect Fake Images <br></br>with Us
					</h1>

					{inputImage ? (
						isAnswerLoaded ? (
							<></>
						) : (
							<>
								<InfinitySpin
									visible={true}
									width="200"
									color="#000"
									ariaLabel="infinity-spin-loading"
								/>
								<p className="fun-fact">{fun_facts[randomNumber]}</p>
							</>
						)
					) : (
						<>
							<label htmlFor="image-input">Upload Image</label>
							<input
								type="file"
								id="image-input"
								name="image-input"
								accept="image/png, image/jpeg"
								onChange={(e) => setInputImage(e.target.files[0])}
							/>
						</>
					)}
				</div>
			</div>
			<div className="slider-wrapper">
				<Slider {...settings} className="slider slider-bottom">
					<div>
						<h3>1</h3>
					</div>
					<div>
						<h3>2</h3>
					</div>
					<div>
						<h3>3</h3>
					</div>
					<div>
						<h3>4</h3>
					</div>
					<div>
						<h3>5</h3>
					</div>
					<div>
						<h3>6</h3>
					</div>
					<div>
						<h3>1</h3>
					</div>
					<div>
						<h3>2</h3>
					</div>
					<div>
						<h3>3</h3>
					</div>
					<div>
						<h3>4</h3>
					</div>
					<div>
						<h3>5</h3>
					</div>
					<div>
						<h3>6</h3>
					</div>
				</Slider>
			</div>
		</>
	);
}

export default App;
