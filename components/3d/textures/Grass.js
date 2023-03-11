import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function Grass() {
    return {
        ao: useLoader(TextureLoader, "textures/grass/Stylized_Grass_001_ambientOcclusion.jpg"),
        normal: useLoader(TextureLoader, "textures/grass/Stylized_Grass_001_normal.jpg"),
        roughness: useLoader(TextureLoader, "textures/grass/Stylized_Grass_001_roughness.jpg"),
        color: useLoader(TextureLoader, "textures/grass/Stylized_Grass_001_basecolor.jpg"),
        displacement: useLoader(TextureLoader, "textures/grass/Stylized_Grass_001_height.png")
    }
}