import { useCallback } from 'react'
import { BoxGeometry, BufferGeometry, Color, Material, Mesh, MeshLambertMaterial, SphereGeometry, Vector3 } from 'three'
import Cordinates from '../models/Cordinates'
import { ObjectMesh } from '../models/ObjectMesh'
import RenderObjectMesh from './RenderObjectMesh'

const ElementsRandom = (props:{boundary: Mesh<BufferGeometry, Material | Material[]>, number: number}) => {
	const boundary = props?.boundary?.geometry as BoxGeometry ?? new BoxGeometry(2, 0.1, 2)
	const number = props?.number ?? 100
	const unavailablePlaces: Cordinates[] = []

	const geometries = [
		new BoxGeometry(1, 1, 1),
		new SphereGeometry(0.5, 32, 32),
		new BoxGeometry(1, 2, 1),
	]

	const getAvailableVertices = (floor: BoxGeometry) => {

		const { width, height, depth } = floor.parameters
		const availableVertices: Cordinates[] = []
		const fraction = 0.5

		for (let x = (width / 2) * -1 + fraction; x < (width / 2); x += fraction) {
			for (let y = 0; y < height; y++) {
				for (let z = (depth / 2) * -1 + fraction; z < (depth / 2); z += fraction) {
					availableVertices.push(new Cordinates(x, y, z))
				}
			}
		}

		return [...new Set(availableVertices)];

	}

	const places: Cordinates[] = getAvailableVertices(boundary)

	const GenerateRandomMeshes = <T extends BufferGeometry>(numberElements: number, geometries: T[]) => {
		const _elements: Mesh[] = []

		for (let i = 0; i < numberElements; i++) {
			const geo = geometries[Math.floor(Math.random() * (geometries.length))]
			_elements.push(GenerateMeshes(geo))
		}

		return _elements;
	}

	const GenerateMeshes = <T extends BufferGeometry>(geometry: T, color?: string) => {
		const mat = new MeshLambertMaterial();
		const hex = color ? color : '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7)
		mat.color = new Color(hex);

		return new Mesh(geometry, mat)
	}

	const isSameCordinate = (a, b) => a.x === b.x && a.y === b.y && a.z === b.z;

	const getAvailablePlace = (left, right, compareFunction) =>
		left.filter(leftValue => !right.some(rightValue => compareFunction(leftValue, rightValue)));


	const getGeometryCoeficient = (geo) => {
		return {
			x: (geo as unknown as SphereGeometry)?.parameters.radius ?? (geo as unknown as BoxGeometry)?.parameters?.width / 2,
			y: (geo as unknown as SphereGeometry)?.parameters.radius ?? (geo as unknown as BoxGeometry)?.parameters?.height / 2,
			z: (geo as unknown as SphereGeometry)?.parameters.radius ?? (geo as unknown as BoxGeometry)?.parameters?.depth / 2
		}
	}

	const geoGeoBoundary = (placeTaken, geometryCoeficient) => {
		return [
			{ x: placeTaken.x, y: placeTaken.y, z: placeTaken.z },
			{ x: placeTaken.x - geometryCoeficient.x, y: placeTaken.y, z: placeTaken.z - geometryCoeficient.z }, // TopLeft
			{ x: placeTaken.x + geometryCoeficient.x, y: placeTaken.y, z: placeTaken.z - geometryCoeficient.z }, // TopRight	
			{ x: placeTaken.x - geometryCoeficient.x, y: placeTaken.y, z: placeTaken.z + geometryCoeficient.z }, // BottomLeft
			{ x: placeTaken.x + geometryCoeficient.x, y: placeTaken.y, z: placeTaken.z + geometryCoeficient.z }, // BottomRight

			{ x: placeTaken.x + geometryCoeficient.x, y: placeTaken.y, z: placeTaken.z },
			{ x: placeTaken.x - geometryCoeficient.x, y: placeTaken.y, z: placeTaken.z },

			{ x: placeTaken.x, y: placeTaken.y, z: placeTaken.z + geometryCoeficient.z },
			{ x: placeTaken.x, y: placeTaken.y, z: placeTaken.z - geometryCoeficient.z },
		]
	}

	const RandomGeometryPosition = useCallback((geo) => {
		
		const geometryCoeficient = getGeometryCoeficient(geo)

		const available: Cordinates[] = getAvailablePlace(places, unavailablePlaces, isSameCordinate)
		if (!(available.length > 0))
			return null

		const placeTaken = available[Math.floor(Math.random() * (available.length - 1))]

		const positionAndBounds = [placeTaken, ...geoGeoBoundary(placeTaken, geometryCoeficient)] ;

		unavailablePlaces.push(...positionAndBounds)

		return new Vector3(placeTaken.x, placeTaken.y! + geometryCoeficient.y, placeTaken.z);

	}, [places, unavailablePlaces])


	const elements: Mesh[] = GenerateRandomMeshes(number, geometries);

	return (
		<group>
			{elements.map((mesh, i) => {
				const currPosition = RandomGeometryPosition(mesh.geometry);

				return (<>{
					currPosition && 
					<RenderObjectMesh
						key={i.toString() + mesh.geometry.type}
						obj={new ObjectMesh({ mesh: mesh, position: new Cordinates(currPosition.x, currPosition.y, currPosition.z) })}
					></RenderObjectMesh>
				}</>)
			})}
		</group>
	)
}

export default ElementsRandom