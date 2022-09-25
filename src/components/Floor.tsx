import { forwardRef } from "react"
import { BoxGeometry, BufferGeometry, Euler, Material, Mesh, MeshNormalMaterial } from "three";
import Cordinates from "../models/Cordinates";
import FloorMesh from "../models/FloorMesh"


interface FloorProps {
	key?: string
	scale?: Cordinates
	position?: Cordinates
	rotation?: Cordinates
}

const Floor: React.ForwardRefRenderFunction<Mesh<BufferGeometry, Material | Material[]>, FloorProps> = function (props, ref) {
	const floor: FloorMesh = new FloorMesh({
		scale: props?.scale ?? { x: 4, y: 0.20, z: 4 },
		position: props?.position ?? { x: 0, y: -0.1, z: 0 },
		rotation: props?.rotation ?? { x: 0, y: 0, z: 0 }
	})

	const mesh = new Mesh(new BoxGeometry(floor.scale.x, floor.scale.y, floor.scale.z), new MeshNormalMaterial())

	return (
		<mesh
			ref={ref}
			position={[floor.position.x, floor.position.y, floor.position.z]}
			rotation={new Euler(floor.rotation.x, floor.rotation.y, floor.rotation.z)}
			args={[mesh.geometry, mesh.material]}
			key={props.key || 'basefloor'}
		></mesh>
	)
}


export default forwardRef(Floor);