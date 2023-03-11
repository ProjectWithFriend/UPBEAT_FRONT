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
            const socket = new SockJS(`http://${document.domain}:8080/ws`);
            stompClient.current = over(socket);
            stompClient.current.connect({}, () => {
                stompClient.current.subscribe("/topic/gameUpdate", (data) => {
                    data = JSON.parse(data.body);
                    setTerritory(data.territory);
                    setCurrentPlayer(data.currentPlayer);
                    setPlayer1(data.player1);
                    setPlayer2(data.player2);

                    localStorage.setItem("init_player1", JSON.stringify(data.player1));
                    localStorage.setItem("init_player2", JSON.stringify(data.player2));
                    localStorage.setItem("current_player", JSON.stringify(data.currentPlayer));
                    localStorage.setItem("territory", JSON.stringify(data.territory));
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
    const player1DomElement = useRef(null)
    const player2DomElement = useRef(null)
    const [player1Children, sSlayer1Children] = useState(null)
    const [player2Children, sSlayer2Children] = useState(null)
    useEffect(() => {
        if (player1DomElement.current !== null && player2DomElement.current !== null) {
            let turns = {p1: false, p2: false}
            if (playerPage === '1') {
                //player 1 section
                let isMineTurn = currentPlayer.id === player1.id
                player1DomElement.current.style.boxShadow = `0 0 ${isMineTurn ? '10px' : '0px'} #e5d772`
                player1DomElement.current.style.border = '3px solid #e5d772'

                //player 2 section
                player2DomElement.current.style.boxShadow = `0 0 0px #e5d772`
                player2DomElement.current.style.border = '3px solid #e5d772'
                player2DomElement.current.style.color = '#000000'

            }else{
                //player 2 section
                let isMineTurn = currentPlayer.id === player2.id
                player2DomElement.current.style.boxShadow = `0 0 ${isMineTurn ? '10px' : '0px'} #e5d772`
                player2DomElement.current.style.border = '3px solid #e5d772'

                //player 1 section
                player1DomElement.current.style.boxShadow = `0 0 0px #e5d772`
                player1DomElement.current.style.border = '3px solid #e5d772'
                player1DomElement.current.style.color = '#000000'
            }
            sSlayer1Children(
                <>
                    <h3 style={{color: playerPage === '1' ? 'blue' : 'red'}}>
                        {`${player1.name} : ${player1.id} `}
                        {currentPlayer.id === player1.id && currentPlayer.id === getPlayerId() ? '(Your turn)' : ''}
                    </h3>
                    <p>money : {player1.budget}</p>
                    <p>Time left : 00 mins</p>
                </>
            )
            sSlayer2Children(
                <>
                    <h3 style={{color: playerPage === '2' ? 'blue' : 'red'}}>
                        {`${player2.name} : ${player2.id} `}
                        {currentPlayer.id === player2.id && currentPlayer.id === getPlayerId() ? '(Your turn)' : ''}
                    </h3>
                    <p>money : {player2.budget}</p>
                    <p>Time left : 00 mins</p>
                </>
            )
        }
    }, [player1DomElement, player2DomElement, player1, player2, playerPage])

    const getPlayerId = () => {
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
                    <World territory={territory} playerId={getPlayerId()}/>
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
                    <div className="st player1" ref={player1DomElement}>
                        {player1Children}
                    </div>
                    <div className="st player2" ref={player2DomElement}>
                        {player2Children}
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
