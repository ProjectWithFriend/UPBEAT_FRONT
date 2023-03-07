import {EdgeHexagon, Hexagon} from "./Hexagon";

function getPosition(x, z, props) {
	let newX = x;
	let newZ = z;
	newX -= props.radius * Math.cos(1/3*Math.PI) * x;
	newZ *= Math.sin(1/3*Math.PI);
	newZ += x % 2 == 0 ? props.radius * Math.sin(1/3*Math.PI) : 0;
	return [newX, 1, newZ];
}

function getColor(region, props) {
	if (region.isCityCenter)
		return region.owner.id % 2 == 0 ? 'darkred' : 'darkblue'
	else if (region.owner != null)
		return region.owner.id % 2 == 0 ? 'red' : 'blue';
}

function functionalGrid(territory, props) {
	const hexagons = [];
	for (const region of territory) {
		props.radius = 0.5;
		props.spacing = 0.0;
		const name = `${region.location.x}.${region.location.y}`;
		hexagons.push(
			<Hexagon
				{...props}
				key={name}
				name={name}
				position={getPosition(region.location.x, region.location.y, props)}
				color={getColor(region, props)}
				rotation-y={0.5 * Math.PI}
			/>
		);
	}
	return hexagons;
}


function length(x0, x1, y0, y1) {
	return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
}

function worldGrid(territory, props) {
	const hexagons = [];
	let territoryX = 0, territoryY = 0;
	for (const region of territory) {
		territoryX = Math.max(territoryX, region.location.x);
		territoryY = Math.max(territoryY, region.location.y);
	}
	const radius = Math.max(territoryY, territoryX);
	for (let y = -props.worldSize+radius; y <= props.worldSize; y++) {
		for (let x = -props.worldSize+radius; x <= props.worldSize; x++) {
			if (y >= 0 && y <= territoryY && x >= 0 && x <= territoryX)
				continue;
			const centerX = territoryX/2;
			const centerY = territoryY/2;
			if (length(x, centerX, y, centerY) > 32)
				continue;
			else if (length(x, centerX, y, centerY) > 28)
				hexagons.push(
					<EdgeHexagon
						{...props}
						key={`${x}.${y}`}
						intensity={
							0
						}
						position={getPosition(x, y, props)}
						rotation-y={0.5 * Math.PI}
					/>
				);
			else
				hexagons.push(
					<EdgeHexagon
						{...props}
						key={`${x}.${y}`}
						intensity={
							Math.min(Math.max(0.1, 24-length(x, centerX, y, centerY)), 0.6)
						}
						position={getPosition(x, y, props)}
						rotation-y={0.5 * Math.PI}
					/>
				);
		}
	}
	return hexagons;
}

export default function GridFromTerritory({ territory, ...props }) {
	props.worldSize = 100;
	return <>
		{functionalGrid(territory, props)}
		{/* {worldGrid(territory, props)} */}
	</>
}