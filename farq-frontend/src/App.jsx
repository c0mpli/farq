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
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useWindowDimensions from "./hooks/useWindowDimensions";

import fake1 from "./assets/fake/1.jpg";
import fake2 from "./assets/fake/2.jpg";
import fake3 from "./assets/fake/3.jpg";
import fake4 from "./assets/fake/4.jpg";
import fake5 from "./assets/fake/5.jpg";
import fake6 from "./assets/fake/6.jpg";

import real1 from "./assets/real/1.jpg";
import real2 from "./assets/real/2.jpg";
import real3 from "./assets/real/3.jpg";
import real4 from "./assets/real/4.jpg";
import real5 from "./assets/real/5.jpg";

function App() {
	const [isAnswerLoaded, setIsAnswerLoaded] = useState(false);
	const [inputImage, setInputImage] = useState(null);
	const [answer, setAnswer] = useState(null);
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
		slidesToShow: isMobile ? 3 : 8,
		slidesToScroll: 1,
	};
	async function getAnswer(image) {
		setIsAnswerLoaded(false);
		const formData = new FormData();
		formData.append("file", image);
		try {
			const res = await axios.post(`${BACKEND_URL}/predict`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			const data = res?.data;
			const fakeValue = data["FAKE"];
			const realValue = data["REAL"];
			setAnswer(() =>
				fakeValue > realValue
					? { answer: "fake", percent: fakeValue }
					: { answer: "real", percent: realValue }
			);
			setIsAnswerLoaded(true);
		} catch (err) {
			console.log(err);
		}
	}

	const [randomNumber, setRandomNumber] = useState(
		Math.floor(Math.random() * fun_facts.length)
	);

	const topImages = [
		fake1,
		fake2,
		fake3,
		fake4,
		fake5,
		fake6,
		fake1,
		fake2,
		fake3,
		fake4,
		fake5,
		fake6,
	];
	const bottomImages = [
		real1,
		real2,
		real3,
		real4,
		real5,
		real1,
		real2,
		real3,
		real4,
		real5,
	];

	const BACKEND_URL = "http://127.0.0.1:5000";

	useEffect(() => {
		//update the random number every 5 seconds
		const interval = setInterval(() => {
			setRandomNumber(Math.floor(Math.random() * fun_facts.length));
		}, 7000);
		return () => clearInterval(interval);
	}, []);

	function resetValues() {
		setIsAnswerLoaded(false);
		setInputImage(null);
		setAnswer(null);
	}
	return isAnswerLoaded ? (
		<div className="page-margin2">
			<nav>
				<div>
					<h1 style={{ cursor: "pointer" }}>FARQ</h1>
					<div className="rectangle"></div>
				</div>
			</nav>
			<div className="main">
				<img src={URL.createObjectURL(inputImage)} className="input-image" />
				<h1>
					Your image is {answer?.percent}% {answer?.answer}
				</h1>
				<button className="try-again" onClick={resetValues}>
					Try Another Image
				</button>
			</div>
		</div>
	) : (
		<>
			<div className="slider-wrapper">
				<Slider {...settings} className="slider slider-top">
					{topImages.map((img, index) => {
						return (
							<div key={index} style={{}}>
								<img src={img} className="slider-image" style={{}} />
							</div>
						);
					})}
				</Slider>
			</div>

			<div className="page-margin App">
				<nav>
					<div>
						<h1
							style={{ cursor: "pointer" }}
							className="hover-underline-animation"
						>
							FARQ
						</h1>
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
								onChange={(e) => {
									setInputImage(() => e.target.files[0]);
									getAnswer(e.target.files[0]);
								}}
							/>
						</>
					)}
				</div>
				<footer>
					<div className="hover-underline-animation">
						<a href="https://github.com/c0mpli" target="_blank">
							Github
						</a>
					</div>
					<div className="hover-underline-animation">
						<a href="https://www.linkedin.com/in/jashdoshi/" target="_blank">
							LinkedIn
						</a>
					</div>
				</footer>
			</div>
			<div className="slider-wrapper">
				<Slider {...settings} className="slider slider-bottom">
					{bottomImages.map((img, index) => {
						return (
							<div key={index} style={{}}>
								<img src={img} className="slider-image" style={{}} />
							</div>
						);
					})}
				</Slider>
			</div>
		</>
	);
}

export default App;
