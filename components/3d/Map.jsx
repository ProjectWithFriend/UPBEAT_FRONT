import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function Hexagon(props) {
	const ref = useRef();
	const [hovered, hover] = useState(false);
	const [t, setT] = useState(0);
	useFrame((state, delta) => {
		if (hovered) {
			if (t < 0) setT(0);
			else setT(t + delta);
		} else {
			if (t > Math.PI) setT(Math.PI);
			else setT(t - delta);
		}
	});
	useEffect(() => {
		const object = ref.current;
		object.position.y = Math.max(1, 1 + 0.1 * Math.tanh(t * Math.PI));
		object.scale.x = object.scale.z = Math.max(
			1,
			1 + 0.14 * Math.tanh(t * Math.PI)
		);
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
			onClick={() => {
				console.log(props.name);
				console.log(camera.position);
				// console.log(camera.rotation);
			}}
		>
			<cylinderGeometry args={[0.5, 0.5, 0.05, 6]} />
			<meshStandardMaterial color={hovered ? "red" : "white"} />
		</mesh>
	);
}

function Grid({ rows, cols, ...props }) {
	const hexagons = [];
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			const X = row - 0.1 * row;
			const Z = col + (row % 2 == 0 ? 0.5 : 0);
			const name = `hex-${col * rows + row}`;
			hexagons.push(
				<Hexagon
					{...props}
					key={name}
					name={name}
					position={[X, 1, Z]}
					rotation-y={0.5 * Math.PI}
				/>
			);
		}
	}
	return hexagons;
}

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
