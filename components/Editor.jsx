// import React from "react";
import {gruvboxDark} from "@uiw/codemirror-theme-gruvbox-dark";
// import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import React, {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Editor({playerPage , currentPlayer, player1,player2}) {
    const [code, setCode] = useState();
    const onChange = useCallback((value, _) => {
        setCode(value);
    });
    let player_id;
    if(playerPage === '1'){
        player_id = player1.id;
    }else{
        player_id = player2.id;
    }
    const submitCode = async () => {
        console.log(player_id + " " + currentPlayer.id)
        try {
            const res = await axios.post("http://localhost:8080/api/submit_plan", {
                construction_plan : code,
                player_id : player_id
            });
        } catch (e) {
            sweetAlert(e.response.data.message)
        }
    }

    const sweetAlert = (message) =>{
        Swal.fire({
            title: 'Found some issues!',
            text: message,
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    return (
        <div className="editorMain">
            <div className="code">
                <p style={{padding: "10px", color: "white", top: 20}}>Code Here</p>
                <button
                    className="btn btn-warning"
                    style={{position: "absolute", top: 10, right: 10}}
                    onClick={() => submitCode()}
                >
                    Submit
                </button>
            </div>
            <div>
                <CodeMirror
                    onChange={onChange}
                    height="525px"
                    theme={gruvboxDark}
                    extensions={[javascript({jsx: true})]}
                />
            </div>
        </div>
    );
}
