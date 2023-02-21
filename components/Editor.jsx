// import React from "react";
import { gruvboxDark } from "@uiw/codemirror-theme-gruvbox-dark";
// import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import React, { useRef } from "react";
export default function Editor() {
	return (
		<div style={{ position: "relative" }}>
			<div className="code" theme={gruvboxDark}>
				<p style={{ padding: "7px" }}>Code Here</p>
				<button style={{ position: "absolute", top: 10, right: 10 }}>
					Submit
				</button>
			</div>
			<CodeMirror
				value="console.log('hello world!');"
				height="600px"
				theme={gruvboxDark}
				extensions={[javascript({ jsx: true })]}
			/>
		</div>
	);
}
