import React, { useState } from "react";
import Editor from "../components/Editor";
import HexGridDemo from "../components/Grid";
import axios from "axios";
import Map from "../components/3d/Map";
export default function game() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	let [showGrid, setShowGrid] = useState(false);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	let [ct, setCT] = useState([]);
	const Grid = async () => {
		let res = await axios.get("http://localhost:8080/api/random");
		let data = res.data;
		for (let i in data) {
			ct.push(data[i]);
		}
		setShowGrid(true);
	};
	return (
		<div className="container">
			<div className="main-container">
				<div
					className="map"
					style={{
						width: "700px",
						height: "600px",
						backgroundColor: "black",
					}}
				>
					<Map />
				</div>
				<div className="editor">
					<Editor />
				</div>
			</div>
			<div className="status-container">
				<div className="player1">
					<h3>Player 1</h3>
					<p>money</p>
				</div>
				<div className="player2">
					<h3>Player 2</h3>
					<p>money</p>
				</div>
				<div className="roundTime">
					<h3>Round</h3>
					<p>1</p>
					<div>tiem :</div>
					<p>50</p>
				</div>
			</div>
		</div>
	);
}
