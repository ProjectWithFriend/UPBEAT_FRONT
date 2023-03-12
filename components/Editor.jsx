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
    const [oldCode, setOldCode] = useState();
    let isfistSubmit = useRef(true);
    const onChange = useCallback((value, _) => {
        setCode(value);
    });
    //TODO: pass revision cost in to props
    const revisionCost = 200;
    let player_id;
    if(playerPage === '1'){
        player_id = player1.id;
    }else{
        player_id = player2.id;
    }
    const submitCode = async () => {
        try {
            const res = await axios.post(`http://${document.domain}:8080/api/submit_plan`, {
                construction_plan : code,
                player_id : player_id
            });
            setOldCode(code);
            isfistSubmit.current = false;
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

    const confirmToEdit = () =>{
        let revisionCost = JSON.parse(localStorage.getItem('config')).revCost;
        Swal.fire({
            title: 'Are you sure?',
            text: `You construction plan have been changed if you continue you have to pay ${revisionCost} $`,
            showCancelButton: true,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, continue!'
        }).then((result) =>{
            if(result.isConfirmed){
                submitCode();
            }
        })
    }

    const checkRevision = () =>{
        console.log(isfistSubmit.current);
        if(oldCode !== code && !isfistSubmit.current){
            console.log(oldCode + " " + code + " " + isfistSubmit.current);
            confirmToEdit();
        }else{
            submitCode();
        }
    }


    return (
        <div className="editorMain">
            <div className="code">
                <p style={{padding: "10px", color: "white", top: 20}}>Code Here</p>
                <button
                    className="btn btn-warning"
                    style={{position: "absolute", top: 10, right: 10}}
                    onClick={() => checkRevision()}
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
