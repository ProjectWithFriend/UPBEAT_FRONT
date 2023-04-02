import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {over} from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import Swal from "sweetalert2";
import ConfigModal from "../components/ConfigModal";
import Script from "next/script";

export default function Home() {
    const [nameP1, setNameP1] = useState("");
    const [nameP2, setNameP2] = useState("");
    const [readyP1, setReadyP1] = useState(false);
    const [readyP2, setReadyP2] = useState(false);
    const [playerSlot, setPlayerSlot] = useState(0);
    const stompClient = useRef(null);
    const fixUseEffect = useRef(false);
    const router = useRouter();
    let playerPage;
    useEffect(() => {
        if (fixUseEffect.current === false) {
            localStorage.clear()
            const socket = new SockJS(`http://${document.domain}:8080/ws`);
            let client = over(socket);
            client.debug = (str) => {
                console.log(str)
            };
            client.connect({}, () => {
                stompClient.current = client;
                stompClient.current.debug = null;
                stompClient.current.subscribe(`/user/topic/playerSlot`, (data) => {
                    data = JSON.parse(data.body);
                    setPlayerSlot(data.playerSlot)
                    playerPage = data.playerSlot;
                });
                stompClient.current.subscribe("/app/ready/entry", (data) => {
                    data = JSON.parse(data.body);
                    setNameP1(data.nameP1);
                    setNameP2(data.nameP2);
                    if(data.config !== null){
                        updateProps(data.config);
                        localStorage.setItem("config", JSON.stringify(data.config));
                    }
                });
                stompClient.current.subscribe("/topic/name", (data) => {
                    data = JSON.parse(data.body);
                    setNameP1(data.nameP1);
                    setNameP2(data.nameP2);
                    localStorage.setItem("nameP1", data.nameP1);
                    localStorage.setItem("nameP2", data.nameP2);
                    setReadyP1(data.nameP1 !== "");
                    setReadyP2(data.nameP2 !== "");
                });
                stompClient.current.subscribe("/topic/gameStart", async () => {
                    try {
                        console.log(props);
                        const body = {
                            player_1_name: localStorage.getItem("nameP1"),
                            player_2_name: localStorage.getItem("nameP2"),
                            config : JSON.parse(localStorage.getItem("config"))
                        }
                        const res = await axios.post(
                            `http://${document.domain}:8080/api/createGame`
                            , body
                        );
                        const data = res.data;
                        localStorage.setItem("territory", JSON.stringify(data.territory));
                        localStorage.setItem("init_player1", JSON.stringify(data.player1));
                        localStorage.setItem("init_player2", JSON.stringify(data.player2));
                        localStorage.setItem("current_player", JSON.stringify(data.currentPlayer));
                        stompClient.current.disconnect();
                        await router.push({pathname: "/game", query: {playerSlot: playerPage}});
                    } catch (error) {
                        Swal.fire({
                            title: "Can't start game",
                            text: `${error.response.data.message}`,
                            icon: "error",
                            confirmButtonText: "OK"
                        })
                    }
                });
                stompClient.current.subscribe("/topic/updateConfig", (data) => {
                    data = JSON.parse(data.body);
                    updateProps(data);
                    SwalUpdateConfig();
                    localStorage.setItem("config", JSON.stringify(data));
                })
                stompClient.current.send("/app/ready/lockPlayerSlot", {}, JSON.stringify());
            });

            return () => {
                fixUseEffect.current = true;
            }
        }
    }, []);

    function SwalUpdateConfig() {
        Swal.fire({
            title: "Update config",
            text: "Config has been updated",
            icon: "success",
            confirmButtonText: "OK"
        })
    }
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
    const start = () => {
        //get api from server
        if (readyP1 && readyP2) {
            stompClient.current.send("/app/ready/start", {}, JSON.stringify({}));
        }
    };
    //make sweetalert when click player-1 or player-2
    const sweetAlert1 = () => {
        if (playerSlot === 2) {
            Swal.fire({
                title: "You are player 2",
                text: "You can't change your name of player 2",
                icon: "error",
                confirmButtonText: "OK"
            })
        }
    }

    const sweetAlert2 = () => {
        if (playerSlot === 1) {
            Swal.fire({
                title: "You are player 1",
                text: "You can't change your name of player 1",
                icon: "error",
                confirmButtonText: "OK"
            })
        }
    }


    useEffect(() => {
        if (playerSlot === 1) {
            document.querySelector(".input-name-1").disabled = false;
            document.querySelector(".input-name-2").disabled = true;
            //decorate label-p1
            document.querySelector(".label-p1").style.color = "green";
            document.querySelector(".label-p1").style.fontWeight = "bold";
            //decorate label-p2
            document.querySelector(".label-p2").style.color = "red";
            document.querySelector(".label-p2").style.fontWeight = "bold";
            //decorate player-1
            document.querySelector(".player-1").style.border = "2px solid green";
            //decorate player-2
            document.querySelector(".player-2").style.border = "2px solid red";
            //change placeholder input-name-2
            document.querySelector(".input-name-2").placeholder = "Your opponent name";
        } else if (playerSlot === 2) {
            document.querySelector(".input-name-1").disabled = true;
            document.querySelector(".input-name-2").disabled = false;
            //decorate label-p1
            document.querySelector(".label-p1").style.color = "red";
            document.querySelector(".label-p1").style.fontWeight = "bold";
            //decorate label-p2
            document.querySelector(".label-p2").style.color = "green";
            document.querySelector(".label-p2").style.fontWeight = "bold";
            //decorate player-1
            document.querySelector(".player-1").style.border = "2px solid red";
            //decorate player-2
            document.querySelector(".player-2").style.border = "2px solid green";
            //change placeholder input-name-1
            document.querySelector(".input-name-1").placeholder = "Your opponent name";
        }
    }, [playerSlot])

    //Work with modal
    const [props, setProps] = useState({
        rows : 20,
        cols : 15,
        initPlanMin : 5,
        initPlanSec : 0,
        initBudget : 10000,
        initCenterDep : 100,
        planRevMin : 30,
        planRevSec : 0,
        revCost : 100,
        maxDep : 1000000,
        interestPct : 5,
    });

    const updateProps = (data) =>{
        let temp = {};
        for(let prop in data){
            temp[prop] = data[prop];
        }
        setProps(temp);
    }
    const onConfigChange = (value , prop_name) => {
        switch (prop_name) {
            case "rows":
                props.rows = value;
                break;
            case "cols":
                props.cols = value;
                break;
            case "initPlanMin":
                props.initPlanMin = value;
                break;
            case "initPlanSec":
                props.initPlanSec = value;
                break;
            case "initBudget":
                props.initBudget = value;
                break;
            case "initCenterDep":
                props.initCenterDep = value;
                break;
            case "planRevMin":
                props.planRevMin = value;
                break;
            case "planRevSec":
                props.planRevSec = value;
                break;
            case "revCost":
                props.revCost = value;
                break;
            case "maxDep":
                props.maxDep = value;
                break;
            case "interestPct":
                props.interestPct = value;
                break;
            default:
                break;
        }
    };

    const onConfigSubmit = () => {
        stompClient.current.send("/app/ready/updateConfig", {}, JSON.stringify(props));
    }
    return (
        <div className="container main-layout">
            <h1>UPBEAT</h1>
            <div className="playerBox">
                <div className="player player-1" onClick={() => sweetAlert1()}>
                    <div className="label label-p1">{playerSlot === 1 ? "You are player 1" : "Your Opponent"}</div>
                    <input
                        type="text"
                        className="input-name-1"
                        placeholder="Enter your name"
                        onChange={(e) => nameChangeP1(e.target.value)}
                        value={nameP1}
                    />
                    <button
                        className="ready-btn"
                        disabled={nameP1 !== ""}
                        style={{backgroundColor: nameP1 ? "green" : "red"}}
                    >
                        {readyP1 ? "Ready" : "Not Ready"}
                    </button>
                </div>
                <div className="player player-2" onClick={() => sweetAlert2()}>
                    <div className="label label-p2">{playerSlot === 2 ? "You are player 2" : "Your Opponent"}</div>
                    <input
                        type="text"
                        className="input-name-2"
                        placeholder="Enter your name"
                        onChange={(e) => nameChangeP2(e.target.value)}
                        value={nameP2}
                    />
                    <button
                        className="ready-btn"
                        disabled={nameP2 !== ""}
                        style={{backgroundColor: nameP2 ? "green" : "red"}}
                    >
                        {readyP2 ? "Ready" : "Not Ready"}{" "}
                    </button>
                </div>
            </div>
            <button className="start-btn" onClick={() => start()}>
                {readyP2 && readyP1 ? "Start" : "Wait for start"}
            </button>
            <button className="btn btn-warning mt-2" data-bs-toggle="modal" data-bs-target="#configModal">Game
                Configuration
            </button>
            <ConfigModal props={props} onConfigChange={onConfigChange} onConfigSubmit={onConfigSubmit}  />
            <span className="credit">© 2023 Our Group. All rights reserved.</span>
        </div>
    );
}