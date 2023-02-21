import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Grid from "./Grid";

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

export default function () {
	return (
		<Canvas camera={{ fov: 15, near: 1, far: 1000, position: [33, 33, 45] }}>
			<CameraControls />
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Grid rows={10} cols={10} />
		</Canvas>
	);
}
