import React, {useEffect, useRef, useState} from "react";
import Editor from "../components/Editor";
import World from "../components/3d/World";
import {IconArrowsDiagonal, IconX,} from "@tabler/icons-react";
import {useRouter} from "next/router";
import {over} from "stompjs";
import SockJS from "sockjs-client";

export default function Game() {
    const router = useRouter();
    let playerPage = router.query.playerSlot;
    const [player1, setPlayer1] = useState({
        name: "Test1",
        budget: 1000,
        id: 1,
    });

    const [player2, setPlayer2] = useState({
        name: "Test2",
        budget: 1000,
        id: 2,
    });
    const [territory, setTerritory] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState([]);
    const glow = () => {
        document.querySelector(".boom").style.color = "#e5d772";
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

    const stompClient = useRef(null);
    const fixUseEffect = useRef(false);

    useEffect(() => {
        //connect websocket
        if (!fixUseEffect.current) {
            const socket = new SockJS("http://localhost:8080/ws");
            stompClient.current = over(socket);
            stompClient.current.connect({}, () => {
                stompClient.current.subscribe("/topic/gameUpdate", (data) => {
                    data = JSON.parse(data.body);
                    setTerritory(data.territory);
                    setCurrentPlayer(data.currentPlayer);
                    setPlayer1(data.player1);
                    setPlayer2(data.player2);
                })
            })

            return () => {
                fixUseEffect.current = true;
            }
        }

        setPlayer1(JSON.parse(localStorage.getItem("init_player1")));
        setPlayer2(JSON.parse(localStorage.getItem("init_player2")));
        setCurrentPlayer(JSON.parse(localStorage.getItem("current_player")));
        setTerritory(JSON.parse(localStorage.getItem("territory")));
    }, []);

    useEffect(() => {
        // add event listener for "Esc" key
        window.addEventListener("keyup", (e) => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        }, []);
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
    }, [isFullScreen])

    //decorate the player when is his turn
    const [p1Turn, setP1Turn] = useState(true)
    const [p2Turn, setP2Turn] = useState(false)
    useEffect(() => {
        if (playerPage === '1') {
            document.querySelector(`.player${playerPage}`).style.boxShadow = '0 0 10px #e5d772'
            document.querySelector(`.player${playerPage}`).style.border = '3px solid #e5d772'
            if(currentPlayer.id === player1.id){
                document.querySelector(".h3-player1").style.textShadow = '0 0 10px #cc72e5'
                document.querySelector(".h3-player1").style.color = '#000000'
                document.querySelector(".h3-player1").innerHTML = `${player1.name} : ${player1.id} (Your Turn)`
            }else{
                document.querySelector(".h3-player1").style.textShadow = '0 0 0px #cc72e5'
                document.querySelector(".h3-player1").innerHTML = `${player1.name} : ${player1.id}`
            }
        } else {
            document.querySelector(`.player${playerPage}`).style.boxShadow = '0 0 10px #e5d772'
            document.querySelector(`.player${playerPage}`).style.border = '3px solid #e5d772'
            if(currentPlayer.id === player2.id){
                document.querySelector(".h3-player2").style.textShadow = '0 0 10px #cc72e5'
                document.querySelector(".h3-player2").innerHTML = `${player2.name} : ${player2.id} (Your Turn)`
            }else{
                document.querySelector(".h3-player2").style.textShadow = '0 0 10px #cc72e5'
                document.querySelector(".h3-player2").innerHTML = `${player2.name} : ${player2.id}`
            }
        }
    }, [currentPlayer])

    const getPlayerId = (playerPage) => {
        if (playerPage === '1') {
            return player1.id
        } else {
            return player2.id
        }
    }
    return (
        <div className="container">
            <div className="main-container">
                <div className={`map ${isFullScreen ? "full-screen" : ""}`}>
                    <World territory={territory}/>
                    <div
                        className="boom"
                        onMouseOut={unglow}
                        onMouseOver={glow}
                        onKeyUp={handleClick}
                    >
                        {isFullScreen ? (
                            <IconX onClick={handleClick}/>
                        ) : (
                            <IconArrowsDiagonal onClick={handleClick}/>
                        )}
                    </div>
                </div>
                <div className="editor">
                    <Editor playerPage={playerPage} currentPlayer={currentPlayer} player1={player1} player2={player2}/>
                </div>
            </div>
            <div className="status-container">
                <div className="player-status">
                    <div className="st player1">
                        <h3 className="h3-player1">
                            {player1.name} : {player1.id}
                        </h3>
                        <p>money : {player1.budget}</p>
                        <p>Time left : 00 mins</p>
                    </div>
                    <div className="st player2">
                        <h3 className="h3-player2">
                            {player2.name} : {player2.id}
                        </h3>
                        <p>money : {player2.budget}</p>
                        <p>Time left : 00 mins</p>
                    </div>
                </div>
                <div className="roundTime">
                    <h3>Round 1</h3>
                    <div>time : 50</div>
                </div>
            </div>
        </div>
    );
}
