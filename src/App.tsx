import { useState} from 'react';
import './App.css';
import { Canvas, useThree } from '@react-three/fiber'
import { Html, OrbitControls, Text } from "@react-three/drei";
import FPSStats from 'react-fps-stats'
import {Ambient}  from './components/Ambient';
import { Euler } from 'three';

function RenderAmbient(props: { show: boolean; }) {
	if (!props.show)
		return null

	return (
		<>
			<ambientLight />
			<axesHelper></axesHelper>
			<OrbitControls></OrbitControls>
			<pointLight position={[5, 5, 5]} intensity={3} />
			<pointLight position={[-3, -3, 2]} />
		</>
	)
}


function App() {

	const models = [
		{
			componet: <Ambient></Ambient>,
			title: "Gerar Ambientes"
		}
	]

	
	const orientacoes = 'Clique em "Gerar Ambientes" e veja como poderá ser renderizado randomicamente elementos em determinados ambientes.'

	const [model, setModel] = useState<JSX.Element>(null)

	return (
		<>
			<FPSStats />
			{
				models && models.map((item, i) => {
					return (
						<button
							onClick={() => { setModel(item.componet) }}
							key={'model ' + (i + 1)}
						>
							{ item.title || 'model ' + (i + 1)}
						</button>
					)
				})
			}
			{model != null ?
				
				<Canvas orthographic camera={{ position: [0, 0, 10], zoom: 50, rotation: [30, 30, 0]}}>
					<RenderAmbient show={model != null} ></RenderAmbient>
					{model}
				</Canvas >
				:
				<h1 style={{color: 'white', padding: 10}}>{orientacoes}</h1>
			}
		</>
	);
}

export default App;
