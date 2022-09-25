import { useThree } from "@react-three/fiber";
import { forwardRef, ForwardRefRenderFunction, useCallback, useImperativeHandle, useState } from "react";
import { Vector3 } from "three/src/Three"
import FloorMesh from "../models/FloorMesh"
import WallMesh from "../models/WallMesh"
import RenderObjectMesh from "./RenderObjectMesh"

interface IEndWallProp {
	floor: FloorMesh,
	EndWalls?: WallMesh[]
}

interface IEndWallRef {
	HandleCameraChange: () => void
}


const EndWall: ForwardRefRenderFunction<IEndWallRef, IEndWallProp> = (props, ref) => {
	const { camera } = useThree()

	const getCurrPos = useCallback(() => {
		let vector = new Vector3()
		camera.getWorldDirection(vector)
		return vector
	}, [camera])

	const [position, setPosition] = useState<Vector3>(getCurrPos())

	const HandleCameraChange = useCallback(() => {
		setPosition(getCurrPos())
	}, [getCurrPos])

	useImperativeHandle(ref, () => ({
		HandleCameraChange
	}))

	const vector = position;
	const radians = Math.atan2(vector.x, vector.z);
	const angle = radians * (180 / Math.PI)

	const floor: FloorMesh = props.floor
	let endWalls: WallMesh[] = props.EndWalls?.length > 0 ? props.EndWalls : []


	const CreateEndWalls = (floor: FloorMesh, wallHeigth = 2, wallThickness = 0.1) => {
		endWalls.push(
			(new WallMesh()).setAsBackEndWall(
				vector.y < -0.9 || !(angle > -71 && angle < 71.1),
				floor,
				wallHeigth,
				wallThickness
			)
		)

		endWalls.push(
			(new WallMesh()).setAsRigthEndWall(
				vector.y < -0.9 || !(angle > -163.5 && angle < -20.5),
				floor,
				wallHeigth,
				wallThickness
			)
		)

		endWalls.push(
			(new WallMesh()).setAsFrontEndWall(
				vector.y < -0.9 || (!(angle > -180 && angle < 180) || (angle > -101 && angle < 98)),
				floor,
				wallHeigth,
				wallThickness
			)
		)

		endWalls.push(
			(new WallMesh()).setAsLeftEndWall(
				vector.y < -0.9 || !(angle > 20 && angle < 165),
				floor,
				wallHeigth,
				wallThickness
			)
		)
	}

	if (!(endWalls.length > 0))
		CreateEndWalls(floor, 2, 0.2)


	return (
		<>
			{endWalls.map((object, i) => {
				if (position)
					return (
						<RenderObjectMesh wireframe={!object.visible} obj={object} key={i + 'EndWall'}></RenderObjectMesh>
					)
				return '</>'
			})}
		</>
	)
}

export default forwardRef(EndWall)
export type { IEndWallRef }