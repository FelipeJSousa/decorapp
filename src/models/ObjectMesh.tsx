import { BoxGeometry, BufferGeometry, Material, Mesh, MeshNormalMaterial, SphereGeometry } from "three"
import Cordinates from "./Cordinates"

interface IObjectMesh {

}

class ObjectMesh implements IObjectMesh {
	mesh?: Mesh<BufferGeometry, Material | Material[]>

	private _position: Cordinates = new Cordinates()

	get position(): Cordinates {
		return this._position
	}
	set position(cordinates: Cordinates) {
		if (!cordinates)
			return

		this._position = cordinates;
	}

	private _scale: Cordinates = new Cordinates()

	get scale(): Cordinates {
		return this._scale
	}
	set scale(cordinates: Cordinates) {
		if (!cordinates)
			return

		this._scale = cordinates

		if (this.mesh == null) {
			this.mesh = new Mesh(new BoxGeometry(this.scale.x, this.scale.y, this.scale.z), new MeshNormalMaterial())
			return
		}

		if (this.mesh.geometry instanceof BoxGeometry) {
			this.mesh.geometry = new BoxGeometry(cordinates.x, cordinates.y, cordinates.z)
		}

		if (this.mesh.geometry instanceof SphereGeometry) {
			this.mesh.geometry = new SphereGeometry(cordinates.x)
		}
	}

	private _rotation: Cordinates = new Cordinates()
	get rotation(): Cordinates {
		return this._rotation
	}
	set rotation(cordinates: Cordinates) {
		if (!cordinates)
			return

		if (this.mesh == null) {
			this.mesh = new Mesh(new BoxGeometry(this.scale.x, this.scale.y, this.scale.z), new MeshNormalMaterial())
			return
		}

		this._rotation = cordinates;
		this.mesh.rotateX(cordinates.x)
		this.mesh.rotateY(cordinates.y)
		this.mesh.rotateZ(cordinates.z)
	}

	constructor(props?: { mesh?: Mesh<BufferGeometry, Material | Material[]>, scale?: Cordinates, position?: Cordinates, rotation?: Cordinates }) {

		this.mesh = props?.mesh ?? null
		if (this.mesh?.geometry instanceof BoxGeometry) {
			const geometry = this.mesh.geometry as BoxGeometry;
			if (!props?.scale)
				this.scale = new Cordinates(geometry?.parameters?.width, geometry?.parameters?.height, geometry?.parameters?.depth)
			if (!props?.position)
				this.position = new Cordinates(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z)
			if (!props?.rotation)
				this.rotation = new Cordinates(this.mesh.rotation.x, this.mesh.rotation.y, this.mesh.rotation.z)
		}

		if (this.mesh?.geometry instanceof SphereGeometry) {
			const geometry = this.mesh.geometry as SphereGeometry;
			if (!props?.scale)
				this.scale = new Cordinates(geometry?.parameters?.radius, geometry?.parameters?.radius, geometry?.parameters?.radius)
			if (!props?.position)
				this.position = new Cordinates(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z)
			if (!props?.rotation)
				this.rotation = new Cordinates(this.mesh.rotation.x, this.mesh.rotation.y, this.mesh.rotation.z)
		}

		if (props?.scale)
			this.scale = props?.scale ?? new Cordinates()
		if (props?.rotation)
			this.rotation = props?.rotation ?? new Cordinates()
		if (props?.position)
			this.position = props?.position ?? new Cordinates()

		if (this.mesh == null) {
			const geo = new BoxGeometry(this.scale.x, this.scale.y, this.scale.z)
			this.mesh = new Mesh(geo, new MeshNormalMaterial())
		}

	}

}

export { ObjectMesh }
export type { IObjectMesh }
