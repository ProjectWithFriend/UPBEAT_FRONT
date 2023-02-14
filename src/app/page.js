"use client";
import HexGridDemo from "components/Grid";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Editor from "components/Editor";
import { useRef } from "react";
import HexGrid from "components/Grid";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<div>
			<div>
				<HexGrid />
			</div>
			{/* <div>
				<Editor></Editor>
			</div> */}
		</div>
	);
}
