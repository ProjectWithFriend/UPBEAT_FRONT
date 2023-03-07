// import React from "react";
import { gruvboxDark } from "@uiw/codemirror-theme-gruvbox-dark";
// import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import React, { useCallback, useState } from "react";
export default function Editor() {
	const [code, setCode] = useState();
	const onChange = useCallback((value, _) => {
		setCode(value);
	});
	return (
		<div className="editorMain">
			<div className="code">
				<p style={{ padding: "10px", color: "white", top: 20 }}>Code Here</p>
				<button
					className="btn btn-warning"
					style={{ position: "absolute", top: 10, right: 10 }}
				>
					Submit
				</button>
			</div>
			<div>
				<CodeMirror
					onChange={onChange}
					height="525px"
					theme={gruvboxDark}
					extensions={[javascript({ jsx: true })]}
				/>
			</div>
		</div>
	);
}
