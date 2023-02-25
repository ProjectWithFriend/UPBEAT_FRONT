import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector2 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Grid from "./Grid";
import Parrot from "./models/Parrot";

extend({ OrbitControls });
const CameraControls = () => {
	const {
		camera,
		gl: { domElement },
	} = useThree();
	const controls = useRef();

	useFrame((_) => controls.current.update());
	return <orbitControls ref={controls} args={[camera, domElement]} />;
};

export default function Map() {
	return (
		<Canvas camera={{ fov: 15, near: 1, far: 1000, position: [33, 33, 45] }}>
			<CameraControls />
			<ambientLight />
			<Grid rows={4} cols={4} />
			<Parrot scale={[0.01, 0.01, 0.01]} position={[1, 1.5, 1]} />
		</Canvas>
	);
}
