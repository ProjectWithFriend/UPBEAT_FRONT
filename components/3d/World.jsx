import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GridFromTerritory from "./GridFromTerritory";
import Parrot from "./models/Parrot";
import { Sky } from "@react-three/drei";
import {
	Vector3,
} from "three";

extend({ OrbitControls });
const CameraControls = () => {
	const {
		camera,
		gl: { domElement },
	} = useThree();
	const controls = useRef();

	useFrame((_) => controls.current.update());
	return (
		<orbitControls
			ref={controls}
			args={[camera, domElement]}
			minDistance={30}
			maxDistance={100}
			minPolarAngle={Math.PI / 8}
			maxPolarAngle={Math.PI / 3}
			rotateSpeed={0.25}
		/>
	);
};

const Environment = ({ dayColor, nightColor }) => {
	const sunPosition = new Vector3();
	const [phi, setPhi] = useState(1),
		[theta, setTheta] = useState(0);
	sunPosition.setFromSphericalCoords(1, phi, theta);
	useFrame((_, delta) => {
		sunPosition.setFromSphericalCoords(
			10,
			Math.abs(Math.sin(phi)) * Math.PI,
			Math.abs(Math.sin(theta)) * Math.PI
		);
		setPhi(phi + 1 * delta);
		setTheta(theta + 0.5 * delta);
	});
	const factor = 10;
	const shadowMapSize = 2048;
	const lightPosition = sunPosition.multiplyScalar(factor)
	return (
		<>
			<Sky
				distance={450000}
				sunPosition={sunPosition}
				inclination={0}
				azimuth={0}
			/>
			<directionalLight
				castShadow
				color={dayColor}
				position={lightPosition}
				intensity={Math.max(0, lightPosition.y * 1) / factor * 0.5}
				shadow-mapSize-height={shadowMapSize}
				shadow-mapSize-width={shadowMapSize}
			/>
			<directionalLight
				castShadow
				color={nightColor}
				position={[lightPosition.x, -lightPosition.y, lightPosition.z]}
				intensity={Math.max(0, -lightPosition.y) / factor * 0.05}
				shadow-mapSize-height={shadowMapSize}
				shadow-mapSize-width={shadowMapSize}
			/>
			<ambientLight intensity={0.5} />
		</>
	);
};

export default function World({territory, playerId}) {
	return (
		<Canvas
			shadows
			camera={{ fov: 15, near: 1, far: 1000, position: [33, 33, 45] }}
		>
			<CameraControls />
			<Environment dayColor={"#ffffff"} nightColor={"#ffffff"} />
			<GridFromTerritory territory={territory} playerId={playerId} receiveShadow castShadow />
			<Parrot scale={[0.005, 0.005, 0.005]} position={[1, 2, 1]} />
		</Canvas>
	);
}
