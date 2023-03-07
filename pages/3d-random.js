import React from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Hexagon } from "../components/3d/Hexagon";
import { Example } from "../components/3d/models/Example";

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

export default function RandomTiles() {
    return (
        <div style={{width:'100vw',height:'100vh',backgroundColor:'black'}}>
            <Canvas camera={{ fov: 15, near: 1, far: 1000, position: [4, 4, 4] }}>
                <CameraControls />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Hexagon radius={1} spacing={0} position={[0, 0, 0]}/>  
            </Canvas>
        </div>
    );
}
