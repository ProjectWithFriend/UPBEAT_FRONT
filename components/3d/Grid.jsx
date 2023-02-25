import Hexagon from "./Hexagon";

export default function Grid({ rows, cols, ...props }) {
	const hexagons = [];
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			const X = row - 0.1 * row;
			const Z = col + (row % 2 == 0 ? 0.5 : 0);
			const name = `hex-${row}-${col}`;
			hexagons.push(
				<Hexagon
					{...props}
					key={name}
					name={name}
					position={[X, 1, Z]}
					rotation-y={0.5 * Math.PI}
				/>
			);
		}
	}
	return hexagons;
}