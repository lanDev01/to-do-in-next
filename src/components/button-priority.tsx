import { Priority } from "@/models/task-item";
import { darkenColor } from "@/utils/darken-color";
import { getPriorityColor } from "@/utils/get-priority-color";
import { ButtonHTMLAttributes } from "react";

interface PriorityProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	priority: Priority;
	isActive: boolean;
	onClick: () => void;
}

export function ButtonPriority({
	priority,
	isActive,
	onClick,
	...props
}: PriorityProps) {
	function getPriorityLabel(
		priority: number,
	): string {
		switch (priority) {
			case 1:
				return "High";
			case 2:
				return "Medium";
			case 3:
				return "Low";
			default:
				return "Unknown";
		}
	}

	const baseColor =
		getPriorityColor(priority) ?? "#000000";
	const borderColor = darkenColor(baseColor, 0.2);
	const backgroundColor = isActive
		? darkenColor(baseColor, 0.2)
		: "transparent";
	const textColor = isActive
		? "#000000"
		: "#ffffff";

	return (
		<button
			{...props}
			onClick={onClick}
			className="border-2 rounded-lg p-4 w-full text-xl cursor-pointer transition-all duration-300 ease-in-out"
			style={{
				borderColor,
				backgroundColor,
				color: textColor,
				boxShadow: isActive
					? "0 4px 12px rgba(0,0,0,0.15)"
					: "none",
			}}
		>
			{getPriorityLabel(priority)}
		</button>
	);
}
