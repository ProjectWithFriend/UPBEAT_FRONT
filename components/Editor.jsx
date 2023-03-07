// import React from "react";
import {gruvboxDark} from "@uiw/codemirror-theme-gruvbox-dark";
// import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import React, {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";

export default function Editor({playerPage}) {
    const [code, setCode] = useState();
    const onChange = useCallback((value, _) => {
        setCode(value);
    });
    const submitCode = async () => {
        try {
        } catch (e) {
            console.log(e);
        }
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
