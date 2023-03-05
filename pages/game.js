import React, { useEffect, useState } from "react";
import Editor from "../components/Editor";
import HexGridDemo from "../components/Grid";
import axios from "axios";
import Map from "../components/3d/Map";
import {
	IconZoomIn,
	IconZoomOut,
	IconArrowsDiagonal,
	IconX,
} from "@tabler/icons-react";
import { escape } from "lodash";

export default function Game() {
	const [player1, setPlayer1] = useState({
		name: "Test1",
		budget: 1000,
		player_id: 1,
		cityCenter: [0, 0],
	});
	const [player2, setPlayer2] = useState({
		name: "Test2",
		budget: 1000,
		player_id: 2,
		cityCenter: [3, 3],
	});

	const glow = () => {
		document.querySelector(".boom").style.color = "#e5d772";
		// document.querySelector(".boom").style.fontSize = "60px";
	};

	const unglow = () => {
		document.querySelector(".boom").style.color = "#f2f2f2";
		document.querySelector(".boom").style.fontSize = "30px";
	};

	const [isFullScreen, setIsFullScreen] = useState(false);

	const handleClick = () => {
		const mapElement = document.querySelector(".map");
		if (isFullScreen) {
			if (document.fullscreenElement) {
				document.exitFullscreen();
			}
			setIsFullScreen(false);
		} else {
			if (mapElement.requestFullscreen) {
				mapElement.requestFullscreen();
			} else if (mapElement.webkitRequestFullscreen) {
				mapElement.webkitRequestFullscreen();
			} else if (mapElement.msRequestFullscreen) {
				mapElement.msRequestFullscreen();
			}
			setIsFullScreen(true);
		}
	};

	const handleFullscreenChange = () => {
		setIsFullScreen(!!document.fullscreenElement);
	};

	const handleKeyUp = (e) => {
		//if esc key is pressed then exit full screen and set full screen to false
		//&& isFullScreen
		if (e.keyCode === 27 && document.fullscreenElement) {
			document.exitFullscreen();
			setIsFullScreen(false);
		}
	};

	useEffect(() => {
		//wait for local storage to be set
		setTimeout(() => {}, 100);
		setPlayer1(JSON.parse(localStorage.getItem("init_player1")));
		setPlayer2(JSON.parse(localStorage.getItem("init_player2")));

		// add event listener for "Esc" key
		window.addEventListener("keyup", (e) => {
			if (document.fullscreenElement) {
				document.exitFullscreen();
			}
		});

		// add event listener for fullscreenchange
		document.addEventListener("fullscreenchange", handleFullscreenChange);

		// cleanup function to remove the event listeners
		return () => {
			window.removeEventListener("keyup", (e) => {
				if (e.keyCode === 27 && isFullScreen) {
					document.exitFullscreen();
				}
			});
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, [isFullScreen]);
	return (
		<div className="container">
			<div className="main-container">
				<div className={`map ${isFullScreen ? "full-screen" : ""}`}>
					<Map />
					<div
						className="boom"
						onMouseOut={unglow}
						onMouseOver={glow}
						onKeyUp={handleClick}
					>
						{isFullScreen ? (
							<IconX onClick={handleClick} />
						) : (
							<IconArrowsDiagonal onClick={handleClick} />
						)}
					</div>
				</div>
				<div className="editor">
					<Editor />
				</div>
			</div>
			<div className="status-container">
				<div className="player1">
					<h3>
						{player1.name} | {player1.player_id}
					</h3>
					<p>money : {player1.budget}</p>
				</div>
				<div className="player2">
					<h3>
						{player2.name} | {player2.player_id}
					</h3>
					<p>money : {player2.budget}</p>
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
