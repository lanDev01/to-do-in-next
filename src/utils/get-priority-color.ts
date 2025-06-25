export function getPriorityColor(
	priority: 1 | 2 | 3,
) {
	const p = Number(priority);

	switch (p) {
		case 1:
			return "#FACBBA"; // HIGH
		case 2:
			return "#D7F0FF"; // MEDIUM
		case 3:
			return "#FAD9FF"; // LOW
	}
}
