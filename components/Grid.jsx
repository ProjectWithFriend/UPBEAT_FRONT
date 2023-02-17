import React from "react";
import HexagonGrid from "./HexagonGrid";
import times from "lodash/times";

const HexGridDemo = () => {
	//create a random in range function
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}
	let rand = getRandomInt(102);
	console.log(rand);
	//fill another color in the hexagon that receive from the random function
	const RandomCity = (hexagon) => {
		if (hexagon === rand) {
			return {
				style: {
					fill: "#000000",
					stroke: "white",
				},
				onClick: () => alert(`Hexagon n.${hexagon} has been clicked`),
			};
		} else {
			return {
				style: {
					fill: "#007aff",
					stroke: "white",
				},
				onClick: () => alert(`Hexagon n.${hexagon} has been clicked`),
			};
		}
	};

	const getHexProps = (hexagon, props) => {
		const style = {
			...props.style,
			...(props.cityProps &&
				props.cityProps(hexagon) &&
				props.cityProps(hexagon).style),
		};
		console.log(style);
		return {
			props,
			style,
		};
	};

	const renderHexagonContent = (hexagon) => {
		return (
			<text
				x="50%"
				y="50%"
				fontSize={100}
				fontWeight="lighter"
				style={{ fill: "white" }}
				textAnchor="middle"
			>
				{hexagon}
			</text>
		);
	};

	let hexagons = times(102, (id) => id);

	return (
		<HexagonGrid
			gridWidth={500}
			gridHeight={500}
			hexagons={hexagons}
			hexProps={(getHexProps, RandomCity)}
			renderHexagonContent={renderHexagonContent}
			cityProps={RandomCity}
		/>
	);
};

export default HexGridDemo;
