import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

export default function(props) {
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