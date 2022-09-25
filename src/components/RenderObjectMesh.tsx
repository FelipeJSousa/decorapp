import { Euler } from "three";
import { ObjectMesh } from "../models/ObjectMesh";

export default function RenderObjectMesh<T extends ObjectMesh>(props: { obj?: T, key?: string, wireframe?: boolean }) {
	const { obj } = props;

	return (
		<>
			{obj &&
				<mesh
					key={props?.key ?? ""}
					position={[obj.position.x, obj.position.y, obj.position.z]}
					rotation={new Euler(obj.rotation.x, obj.rotation.y, obj.rotation.z)}
					args={[obj?.mesh?.geometry, obj.mesh?.material]}
				>
					{
						props?.wireframe && <meshPhongMaterial color="#ff0000" opacity={0.1} transparent />
					}

				</mesh>
			}
		</>
	)

}