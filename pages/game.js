import React,{useState} from "react";
import Editor from "../components/Editor";
import HexGridDemo from "../components/Grid";
import axios from "axios";
export default function game() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	let [showGrid, setShowGrid] = useState(false);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	let [ct, setCT] = useState([]);
	const Grid = async () => {
		let res = await axios.get("http://localhost:8080/api/random");
		let data = res.data;
		for(let i in data){
			ct.push(data[i]);
		}
		setShowGrid(true);
	}
	return (
		<div>
			{showGrid ? <HexGridDemo CT={ct}/> : null}
			{/*<HexGridDemo CTP1={ctp1} CTP2={ctp2}/>*/}
			{/* <Editor></Editor> */}
			<button className="btn btn-primary" onClick={() => Grid()}>test</button>
		</div>
	);
}
