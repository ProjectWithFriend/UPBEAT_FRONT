import { EdgeHexagon, Hexagon } from "./Hexagon";

function getPosition(x, z, props) {
	let newX = x;
	let newZ = z;
	newX -= props.radius * Math.cos(1 / 3 * Math.PI) * x;
	newZ *= Math.sin(1 / 3 * Math.PI);
	newZ += x % 2 == 0 ? props.radius * Math.sin(1 / 3 * Math.PI) : 0;
	return [newX, 1, newZ];
}

function isOwner(region, playerId) {
	return region.owner != null && region.owner.id == playerId;
}

function getColor(region, playerId) {
	if (region.isCityCenter)
		return !isOwner(region, playerId) ? 'darkred' : 'darkblue'
	else if (region.owner != null)
		return !isOwner(region, playerId) ? 'pink' : 'skyblue';
	else
		return 'white';
}

function functionalGrid(territory, playerId, props) {
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
				color={getColor(region, playerId)}
				rotation-y={0.5 * Math.PI}
				data={{
					...region
				}}
			/>
		);
	}
	return hexagons;
}

export default function GridFromTerritory({ territory, playerId, ...props }) {
	props.worldSize = 100;
	return <>
		{functionalGrid(territory, playerId, props)}
	</>
}