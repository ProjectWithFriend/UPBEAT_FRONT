"use client";
import Image from "next/image";
import {Inter} from "@next/font/google";

const inter = Inter({subsets: ["latin"]});
import {useState} from "react";

export default function Home() {
    const [nameP1, setNameP1] = useState("");
    const [nameP2, setNameP2] = useState("");
    const [readyP1, setReadyP1] = useState(false);
    const [readyP2, setReadyP2] = useState(false);

    const updateReadyP1 = () => {
        if(nameP1.length === 0){
            alert("Please enter your name at Player1");
        }else{
            setReadyP1(!readyP1);
        }
    }

    const updateReadyP2 = () => {
        if(nameP2.length === 0){
            alert("Please enter your name at Player2");
        }else{
            setReadyP2(!readyP2);
        }
    }


    return (
        <div className="container">
            <h1>UPBEAT</h1>
            <div className="playerBox">
                <div className="player">
                    <div className="label">Player1</div>
                    <input type="text" className="input-name" placeholder="Enter your name"
                           onChange={(e) => setNameP1(e.target.value)}
                           value={nameP1}
                    />
                    <button className="ready-btn"
                            onClick={() => updateReadyP1()}
                            style={{backgroundColor: readyP1 ? "green" : "red"}}
                    >{readyP1 ? "Ready" : "Not Ready"}</button>
                </div>
                <div className="player">
                    <div className="label">Player2</div>
                    <input type="text" className="input-name" placeholder="Enter your name"
                            onChange={(e) => setNameP2(e.target.value)}
                            value={nameP2}
                    />
                    <button className="ready-btn"
                            onClick={() => updateReadyP2()}
                            style={{backgroundColor: readyP2 ? "green" : "red"}}
                    >{readyP2 ? "Ready" : "Not Ready"} </button>
                </div>
            </div>
            <button className="start-btn">{readyP2&&readyP1 ? "Start" : "Wait for start"}</button>
            <span className="credit">© 2023 Our Group. All rights reserved.</span>
        </div>
    );
}
