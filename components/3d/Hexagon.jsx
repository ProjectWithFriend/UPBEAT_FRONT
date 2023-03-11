import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Color, TextureLoader } from "three";
import { CoconutTree } from "./models/CoconutTree";
import Grass from "./textures/Grass";

function BaseHexagon(props) {
	const [objects, setObjects] = useState([]);
	useEffect(() => {
		if (objects.length != 0 || props.objectEnabled == null) return;
		const contents = [];
		for (let index = 0; index < 1; index++) {
			contents.push(
				<CoconutTree
					position={[Math.random() - 0.5, 0, Math.random() - 0.5]}
					rotation-y={Math.random() * 2 * Math.PI}
					scale={[0.1, 0.1, 0.1]}
				/>
			);
		}
		setObjects(contents);
	}, []);
	const grass = Grass();
	return (
		<>
			<cylinderGeometry
				args={[
					props.radius - props.spacing / 2,
					props.radius - props.spacing / 2,
					0.05,
					6,
				]}
			/>
			<meshStandardMaterial color={props.color} />
			{/* {...objects} */}
		</>
	);
}

function EdgeHexagon(props) {
	return (
		<mesh {...props}>
			<BaseHexagon {...props} />
		</mesh>
	);
}

function Hexagon(props) {
	const ref = useRef();
	const [hovered, hover] = useState(false);
	const [t, setT] = useState(0);

	useFrame((_, delta) => {
		if (hovered) {
			if (t < 0) setT(0);
			else setT(t + delta);
		} else {
			if (t > Math.PI) setT(Math.PI);
			else setT(t - delta);
		}
	});

	const positionY = props.position == null ? 1 : props.position[1];
	const scale =
		props.scale == null
			? 1
			: Math.max(props.scale[0], props.scale[1], props.scale[2]);
	useEffect(() => {
		const object = ref.current;
		object.position.y = Math.max(
			positionY,
			positionY + 0.2 * Math.tanh(t * Math.PI)
		);
		object.scale.x =
			object.scale.y =
			object.scale.z =
				Math.max(scale, scale + 0.14 * Math.tanh(t * Math.PI));
	}, [t]);

	const {
		camera,
		gl: { domElement },
	} = useThree();
	return (
		<mesh
			ref={ref}
			{...props}
			onPointerOver={() => {
				hover(true);
			}}
			onPointerOut={() => {
				hover(false);
			}}
		>
			<>
				<BaseHexagon {...props} objectEnabled />
			</>
		</mesh>
	);
}

export { Hexagon, EdgeHexagon };
