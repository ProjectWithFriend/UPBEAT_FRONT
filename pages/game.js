import React, {useEffect, useState} from "react";
import Editor from "../components/Editor";
import HexGridDemo from "../components/Grid";
import axios from "axios";
import Map from "../components/3d/Map";

export default function Game() {
    const [player1, setPlayer1] = useState({"name": "Test1", "budget": 1000,"player_id":1,"cityCenter" : [0,0]});
    const [player2, setPlayer2] = useState({"name": "Test2", "budget": 1000,"player_id":2,"cityCenter" : [3,3]});
    useEffect(() => {
        //wait for local storage to be set
        setTimeout(() => {}, 100);
        setPlayer1(JSON.parse(localStorage.getItem("init_player1")));
        setPlayer2(JSON.parse(localStorage.getItem("init_player2")));
    },[])
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
                    <Map/>
                </div>
                <div className="editor">
                    <Editor/>
                </div>
            </div>
            <div className="status-container">
                <div className="player1">
                    <h3>{player1.name} | {player1.player_id}</h3>
                    <p>money : {player1.budget}</p>
                </div>
                <div className="player2">
                    <h3>{player2.name} | {player2.player_id}</h3>
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
