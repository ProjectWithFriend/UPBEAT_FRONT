import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

export default function RegionTile(props) {
	const ref = useRef();
	useFrame((state, delta) => {
		ref.current.rotation.y += delta * 0.1;
	});
	return (
		<mesh
			ref={ref}
			{...props}
		>
			<cylinderGeometry args={[0.5, 0.5, 0.05, 6]} />
			<meshStandardMaterial color={"gray"} />
		</mesh>
	);
}