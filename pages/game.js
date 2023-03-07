import React, { useEffect, useState } from "react";
import Editor from "../components/Editor";
import HexGridDemo from "../components/Grid";
import axios from "axios";
import World from "../components/3d/World";
import {
	IconZoomIn,
	IconZoomOut,
	IconArrowsDiagonal,
	IconX,
} from "@tabler/icons-react";
import { escape } from "lodash";

export default function Game() {
	const player1={
		name: "Test1",
		budget: 1000,
		player_id: 1,
		cityCenter: [0, 0],
	};
	const player2={
		name: "Test2",
		budget: 1000,
		player_id: 2,
		cityCenter: [3, 3],
	};

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
					<World />
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
				<div className="player-status">
					<div className="st player1">
						<h3>
							{player1.name} : {player1.player_id}
						</h3>
						<p1>money : {player1.budget}</p1>
						<p1>territor: </p1>
					</div>
					<div className="st player2">
						<h3>
							{player2.name} : {player2.player_id}
						</h3>
						<p1>money : {player2.budget}</p1>
						<p1>territor: </p1>
					</div>
				</div>
				<div className="roundTime">
					<h3>Round</h3>
					<p1>1</p1>
					<div>time :</div>
					<p1>50</p1>
				</div>
			</div>
		</div>
	);
}
