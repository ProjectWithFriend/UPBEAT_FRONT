import React from "react";
import RegionTile from "../components/3d/RegionTile";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Canvas, extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { TreeBig } from "../components/3d/models/TreeBig";
import { CubeTextureLoader, TextureLoader } from "three";

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

function SkyBox() {
    const { scene } = useThree();
    const loader = new CubeTextureLoader();
    // const texture=useLoader(TextureLoader, './skybox.png');
    // // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
    const texture = loader.load([
      "/field-skyboxes/Meadow/posx.jpg",
      "/field-skyboxes/Meadow/negx.jpg",
      "/field-skyboxes/Meadow/posy.jpg",
      "/field-skyboxes/Meadow/negy.jpg",
      "/field-skyboxes/Meadow/posz.jpg",
      "/field-skyboxes/Meadow/negz.jpg",
    ]);
  
    // Set the scene background property to the resulting texture.
    scene.background = texture;
    return null;
  }

export default function RandomTiles() {
    return (
        <div style={{width:'100vw',height:'100vh',backgroundColor:'black'}}>
            <Canvas camera={{ fov: 15, near: 1, far: 1000, position: [4, 4, 4] }}>
                <CameraControls />
                <TreeBig scale={[0.005, 0.005, 0.005]}/>
                <ambientLight />
                <SkyBox />
                <pointLight position={[10, 10, 10]} />
            </Canvas>
        </div>
    );
}
