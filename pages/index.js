import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {over} from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

export default function Home() {
    const [nameP1, setNameP1] = useState("");
    const [nameP2, setNameP2] = useState("");
    const [readyP1, setReadyP1] = useState(false);
    const [readyP2, setReadyP2] = useState(false);
    const stompClient = useRef(null);
    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        let client = over(socket);
        client.debug = null;
        client.connect({}, () => {
            stompClient.current = client;
            stompClient.current.subscribe("/topic/name", (data) => {
                // console.log("Received data from server: " + data.body);
                data = JSON.parse(data.body);
                // if(data.nameP1 !== nameP1) setNameP1(data.nameP1);
                // if(data.nameP2 !== nameP2) setNameP2(data.nameP2);
                setNameP1(data.nameP1);
                setNameP2(data.nameP2);
                localStorage.setItem("nameP1", data.nameP1);
                localStorage.setItem("nameP2", data.nameP2);
            });
            stompClient.current.subscribe("/topic/ready", (data) => {
                // console.log("Received data from server: " + data.body);
                data = JSON.parse(data.body);
                setReadyP1(data.readyP1);
                setReadyP2(data.readyP2);
            });
            stompClient.current.subscribe("/topic/gameStart", async (data) => {
                try {
                    const body = {
                        player_1_name: localStorage.getItem("nameP1"),
                        player_2_name: localStorage.getItem("nameP2"),
                    }
                    const res = await axios.post(
                        "http://localhost:8080/api/createGame"
                        , body
                    );
                    const data = res.data;
                    localStorage.setItem("init_territory", JSON.stringify(data.territory));
                    localStorage.setItem("init_player1", JSON.stringify(data.player1));
                    localStorage.setItem("init_player2", JSON.stringify(data.player2));
                } catch (error) {
                    console.log(error);
                }

                router.push("/game");
            });
        });
    }, []);

    const nameChangeP1 = (name) => {
        setNameP1(name);
        stompClient.current.send(
            "/app/ready/typeName",
            {},
            JSON.stringify({
                nameP1: name,
                nameP2: nameP2,
            })
        );
    };

    const nameChangeP2 = (name) => {
        setNameP2(name);
        stompClient.current.send(
            "/app/ready/typeName",
            {},
            JSON.stringify({
                nameP1: nameP1,
                nameP2: name,
            })
        );
    };
    //Client state
    const updateReadyP1 = () => {
        if (nameP1.length === 0) {
            alert("Please enter your name at Player1");
        } else {
            // setReadyP1(!readyP1);
            stompClient.current.send(
                "/app/ready/changeReady",
                {},
                JSON.stringify({
                    readyP1: !readyP1,
                    readyP2: readyP2,
                })
            );
            // console.log("player1 ready: " + readyP1);
        }
    };

    const updateReadyP2 = () => {
        if (nameP2.length === 0) {
            alert("Please enter your name at Player2");
        } else {
            // setReadyP2(!readyP2);
            stompClient.current.send(
                "/app/ready/changeReady",
                {},
                JSON.stringify({
                    readyP1: readyP1,
                    readyP2: !readyP2,
                })
            );
            // console.log("player2 ready: " + readyP2);
        }
    };

    const router = useRouter();

    const start = async () => {
        //get api from server
        if (readyP1 && readyP2) {
            stompClient.current.send("/app/ready/start", {}, JSON.stringify({
                nameP1: nameP1,
                nameP2: nameP2
            }));
        } else {
            return;
        }
    };

    // To Block player can't enter name after ready
    useEffect(() => {
        if (readyP1) {
            document.querySelector(".input-name-1").disabled = true;
        } else {
            document.querySelector(".input-name-1").disabled = false;
        }
    }, [readyP1]);

    useEffect(() => {
        if (readyP2) {
            document.querySelector(".input-name-2").disabled = true;
        } else {
            document.querySelector(".input-name-2").disabled = false;
        }
    }, [readyP2]);

    //To clear local storage when come to web in first time
    useEffect(() => {
        localStorage.clear();
    },[])

    return (
        <div className="container">
            <h1>UPBEAT</h1>
            <div className="playerBox">
                <div className="player">
                    <div className="label">Player1</div>
                    <input
                        type="text"
                        className="input-name-1"
                        placeholder="Enter your name"
                        onChange={(e) => nameChangeP1(e.target.value)}
                        value={nameP1}
                    />
                    <button
                        className="ready-btn"
                        onClick={() => updateReadyP1()}
                        style={{backgroundColor: readyP1 ? "green" : "red"}}
                    >
                        {readyP1 ? "Ready" : "Not Ready"}
                    </button>
                </div>
                <div className="player">
                    <div className="label">Player2</div>
                    <input
                        type="text"
                        className="input-name-2"
                        placeholder="Enter your name"
                        onChange={(e) => nameChangeP2(e.target.value)}
                        value={nameP2}
                    />
                    <button
                        className="ready-btn"
                        onClick={() => updateReadyP2()}
                        style={{backgroundColor: readyP2 ? "green" : "red"}}
                    >
                        {readyP2 ? "Ready" : "Not Ready"}{" "}
                    </button>
                </div>
            </div>
            <button className="start-btn" onClick={() => start()}>
                {readyP2 && readyP1 ? "Start" : "Wait for start"}
            </button>
            <span className="credit">© 2023 Our Group. All rights reserved.</span>
        </div>
    );
}
