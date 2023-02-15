import React from "react";
import Editor from "../components/Editor";
import HexGridDemo from "../components/Grid";
export default function game() {
	return (
		<div>
			<HexGridDemo />
			<Editor></Editor>
		</div>
	);
}
