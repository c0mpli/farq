import { useState, useEffect } from "react";

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	const isMobile = width < 768;
	const isTablet = width < 1024 && width >= 768;
	const isDesktop = width >= 1024;
	return {
		isMobile,
		isTablet,
		isDesktop,
	};
}

function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
}

export default useWindowDimensions;
