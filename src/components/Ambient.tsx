import { Html, OrbitControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useControls } from "leva"
import { useRef, useState } from "react"
import { BufferGeometry, Euler, Material, Mesh } from "three"
import FloorMesh from "../models/FloorMesh"
import ElementsRandom from "./ElementsRandom"
import EndWall, { IEndWallRef } from "./EndWall"
import Floor from "./Floor"

function useForceUpdate() {
	const [value, setValue] = useState(0);
	return () => setValue(value => value + 1);
}

const Ambient = () => {
	const deg2rad = degrees => degrees * (Math.PI / 180);
	useThree(({camera}) => {
    camera.setRotationFromEuler(new Euler(deg2rad(90), 0, 0));
  }); 
	const { Comprimento, Largura, Elementos } = useControls({
		Comprimento: {
			value: 10,
			min: 2,
			max: 50,
			step: 1,
		},
		Largura: {
			value: 10,
			min: 2,
			max: 50,
			step: 1,
		},
		Elementos: {
			value: 0,
			min: 0,
			max: 100,
			step: 1,
		}
	})

	const forceUpdate = useForceUpdate();

	const floorRef = useRef<Mesh<BufferGeometry, Material | Material[]>>(null)

	const endWallRef = useRef<IEndWallRef>()

	return (
		<>
			<OrbitControls onChange={() => endWallRef.current.HandleCameraChange()}></OrbitControls>
			<Floor
				ref={floorRef}
				scale={{ x: Comprimento, y: 0.20, z: Largura }}
				position={{ x: 0, y: -0.1, z: 0 }}
			></Floor>
			<EndWall
				ref={endWallRef}
				floor={new FloorMesh({ scale: { x: Comprimento, y: 0.20, z: Largura }, position: { x: 0, y: -0.1, z: 0 } })}
			></EndWall>
			<Html position={[-7, 1, -6.5]} style={{ minWidth: 100, backgroundColor: 'transparent' }}>
				<button onClick={forceUpdate}>Randomizar Posições</button>
			</Html>
			<ElementsRandom boundary={floorRef.current} number={Elementos}></ElementsRandom>
		</>
	)

}


export { Ambient }