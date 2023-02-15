// import React from "react";
import { gruvboxDark } from "@uiw/codemirror-theme-gruvbox-dark";
// import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import React, { useRef } from "react";
export default function Editor() {
	return (
		<div
			style={{
				width: "50%",
				height: "50%",
				margin: "auto",
				marginTop: "100px",
				border: "1px solid #ccc",
				borderRadius: "5px",
				padding: "10px",
				fontSize: "14px",
			}}
		>
			<CodeMirror
				value="console.log('hello world!');"
				height="500px"
				theme={gruvboxDark}
				extensions={[javascript({ jsx: true })]}
			/>
		</div>
	);
}
