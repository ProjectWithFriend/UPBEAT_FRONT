import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Parrot(props) {
	const group = useRef();
	const { nodes, materials, animations } = useGLTF("/models/Parrot.glb");
	const { ref, actions, names } = useAnimations(animations, group);
	useEffect(() => {
		actions[names[0]].play();
	}, []);
	return (
		<group ref={group} {...props} dispose={null}>
			<group name="AuxScene">
				<mesh
					name="mesh_0"
					castShadow
					receiveShadow
					geometry={nodes.mesh_0.geometry}
					material={nodes.mesh_0.material}
					morphTargetDictionary={nodes.mesh_0.morphTargetDictionary}
					morphTargetInfluences={nodes.mesh_0.morphTargetInfluences}
				/>
			</group>
		</group>
	);
}

useGLTF.preload("./Parrot.glb");

useGLTF.preload("/models/Parrot.glb");
