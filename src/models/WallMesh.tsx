import { Direction } from "./Direction"
import FloorMesh from "./FloorMesh"
import { ObjectMesh } from "./ObjectMesh"

export default class WallMesh extends ObjectMesh {

	visible = true

	private _wallHeigth = 2
	private _wallThickness = 0.1

	private SetEndWall(direction: Direction, visible: boolean, floor: FloorMesh, wallHeigth: number = this._wallHeigth, wallThickness: number = this._wallThickness): WallMesh {
		const wallPosY = (floor.position.y) - (floor.scale.y / 2) + (wallHeigth / 2)

		switch (direction) {
			case Direction.Back:
				this.scale = { x: floor.scale.x + wallThickness * 2, y: wallHeigth, z: wallThickness }
				this.position = { x: 0, y: wallPosY, z: -1 * (floor.scale.z / 2) - (wallThickness / 2) }
				break;

			case Direction.Right:
				this.scale = { x: wallThickness, y: wallHeigth, z: floor.scale.z + wallThickness * 2 }
				this.position = { x: (floor.scale.x / 2) + (wallThickness / 2), y: wallPosY, z: 0 }
				break;

			case Direction.Front:
				this.scale = { x: floor.scale.x + wallThickness * 2, y: wallHeigth, z: wallThickness }
				this.position = { x: 0, y: wallPosY, z: (floor.scale.z / 2) + (wallThickness / 2) }
				break;

			case Direction.Left:
				this.scale = { x: wallThickness, y: wallHeigth, z: floor.scale.z + wallThickness * 2 }
				this.position = { x: -1 * (floor.scale.x / 2) - (wallThickness / 2), y: wallPosY, z: 0 }
				break;

			default:
				break;
		}

		this.rotation = { x: 0, y: 0, z: 0 }
		this.visible = visible

		return this
	}

	public setAsBackEndWall(visible: boolean, floor: FloorMesh, wallHeigth?: number, wallThickness?: number): WallMesh {
		return this.SetEndWall(Direction.Back, visible, floor, wallHeigth, wallThickness)
	}

	public setAsRigthEndWall(visible: boolean, floor: FloorMesh, wallHeigth?: number, wallThickness?: number): WallMesh {
		return this.SetEndWall(Direction.Right, visible, floor, wallHeigth, wallThickness)
	}

	public setAsFrontEndWall(visible: boolean, floor: FloorMesh, wallHeigth?: number, wallThickness?: number): WallMesh {
		return this.SetEndWall(Direction.Front, visible, floor, wallHeigth, wallThickness)
	}

	public setAsLeftEndWall(visible: boolean, floor: FloorMesh, wallHeigth?: number, wallThickness?: number): WallMesh {
		return this.SetEndWall(Direction.Left, visible, floor, wallHeigth, wallThickness)
	}
}