import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GridFromTerritory from "./GridFromTerritory";
import Parrot from "./models/Parrot";
import { Sky } from "@react-three/drei";
import { DirectionalLight, HemisphereLight, PlaneGeometry, Vector3 } from "three";

extend({ OrbitControls });
const CameraControls = () => {
	const {
		camera,
		gl: { domElement },
	} = useThree();
	const controls = useRef();

	useFrame((_) => controls.current.update());
	return <orbitControls
		ref={controls}
		args={[camera, domElement]}
		minDistance={50}
		maxDistance={150}
		minPolarAngle={Math.PI / 4}
		maxPolarAngle={Math.PI / 3}
		se
	/>;
};

const Environment = ({dayColor, nightColor}) => {
	const sunPosition = new Vector3();
	const [phi, setPhi] = useState(1), [theta, setTheta] = useState(0);
	sunPosition.setFromSphericalCoords(1, phi, theta);
	useFrame((_, delta) => {
		sunPosition.setFromSphericalCoords(
			10, 
			Math.abs(Math.sin(phi)) * Math.PI, 
			Math.abs(Math.sin(theta)) * Math.PI
		)
		setPhi(phi + 1 * delta);
		setTheta(theta + 0.5 * delta);
	});
	return <>
		<Sky
			distance={450000}
			sunPosition={sunPosition}
			inclination={0}
			azimuth={0}
		/>
		<directionalLight 
			castShadow
			color={dayColor}
			position={sunPosition}
			intensity={Math.max(0, sunPosition.y*2)}
		/>
		<directionalLight 
			castShadow
			color={nightColor}
			position={[sunPosition.x, -sunPosition.y, sunPosition.z]}
			intensity={Math.max(0, -sunPosition.y*2)}
		/>
		<ambientLight intensity={0.5} />
	</>
	;
};

export default function World() {
	const territoryJson = `
	[
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 0
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 0
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 0
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 0
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 0
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 0
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 0
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 0
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 0
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 0
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 0
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 0
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 0
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 0
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 0
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 1
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 1
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 1
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 1
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 1
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 1
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 1
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 1
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 1
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": true,
			"location": {
				"x": 9,
				"y": 1
			},
			"deposit": 100,
			"owner": {
				"id": 1,
				"name": "p",
				"budget": 10000
			}
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 1
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 1
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 1
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 1
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 1
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 2
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 2
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 2
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 2
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 2
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 2
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 2
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 2
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 2
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 2
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 2
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 2
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 2
			},
			"deposit": 0,
			"owner": {
				"id": 2,
				"name": "au",
				"budget": 10000
			}
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 2
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 2
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 3
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 3
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 3
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 3
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 3
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 3
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 3
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 3
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 3
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 3
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 3
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": true,
			"location": {
				"x": 11,
				"y": 3
			},
			"deposit": 100,
			"owner": {
				"id": 2,
				"name": "au",
				"budget": 10000
			}
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 3
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 3
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 3
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 4
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 4
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 4
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 4
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 4
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 4
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 4
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 4
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 4
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 4
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 4
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 4
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 4
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 4
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 4
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 5
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 5
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 5
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 5
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 5
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 5
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 5
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 5
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 5
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 5
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 5
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 5
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 5
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 5
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 5
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 6
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 6
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 6
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 6
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 6
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 6
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 6
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 6
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 6
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 6
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 6
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 6
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 6
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 6
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 6
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 7
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 7
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 7
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 7
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 7
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 7
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 7
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 7
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 7
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 7
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 7
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 7
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 7
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 7
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 7
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 8
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 8
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 8
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 8
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 8
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 8
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 8
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 8
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 8
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 8
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 8
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 8
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 8
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 8
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 8
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 9
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 9
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 9
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 9
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 9
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 9
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 9
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 9
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 9
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 9
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 9
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 9
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 9
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 9
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 9
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 10
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 10
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 10
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 10
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 10
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 10
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 10
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 10
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 10
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 10
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 10
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 10
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 10
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 10
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 10
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 11
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 11
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 11
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 11
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 11
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 11
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 11
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 11
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 11
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 11
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 11
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 11
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 11
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 11
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 11
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 12
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 12
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 12
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 12
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 12
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 12
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 12
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 12
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 12
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 12
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 12
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 12
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 12
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 12
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 12
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 13
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 13
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 13
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 13
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 13
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 13
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 13
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 13
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 13
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 13
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 13
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 13
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 13
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 13
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 13
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 14
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 14
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 14
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 14
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 14
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 14
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 14
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 14
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 14
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 14
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 14
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 14
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 14
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 14
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 14
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 15
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 15
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 15
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 15
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 15
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 15
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 15
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 15
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 15
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 15
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 15
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 15
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 15
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 15
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 15
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 16
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 16
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 16
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 16
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 16
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 16
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 16
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 16
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 16
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 16
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 16
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 16
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 16
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 16
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 16
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 17
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 17
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 17
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 17
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 17
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 17
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 17
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 17
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 17
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 17
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 17
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 17
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 17
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 17
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 17
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 18
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 18
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 18
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 18
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 18
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 18
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 18
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 18
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 18
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 18
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 18
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 18
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 18
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 18
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 18
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 0,
				"y": 19
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 1,
				"y": 19
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 2,
				"y": 19
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 3,
				"y": 19
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 4,
				"y": 19
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 5,
				"y": 19
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 6,
				"y": 19
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 7,
				"y": 19
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 8,
				"y": 19
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 9,
				"y": 19
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 10,
				"y": 19
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 11,
				"y": 19
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 12,
				"y": 19
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 13,
				"y": 19
			},
			"deposit": 0,
			"owner": null
		},
		{
			"isCityCenter": false,
			"location": {
				"x": 14,
				"y": 19
			},
			"deposit": 0,
			"owner": null
		}
	]
	`;
	const territory = JSON.parse(territoryJson);
	return (
		<Canvas shadows camera={{ fov: 15, near: 1, far: 1000, position: [33, 33, 45] }}>
			<CameraControls />
			<Environment dayColor={'#ffffff'} nightColor={'#362E32'} />
			<GridFromTerritory territory={territory} receiveShadow castShadow />
			{/* <Parrot scale={[0.05, 0.05, 0.05]} position={[0, 3, 0]} /> */}
		</Canvas>
	);
}
