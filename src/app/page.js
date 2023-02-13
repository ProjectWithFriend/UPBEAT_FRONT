"use client";

import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Editor from "components/Editor";
import { useRef } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<div>
			<Editor />
			<div>Hello</div>
		</div>
	);
}
