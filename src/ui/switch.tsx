import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface SwitchProps {
	label: string;
	className?: string;
	checked?: boolean;
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
}

export function Switch({
	label,
	className,
	checked,
	defaultChecked = false,
	onCheckedChange,
}: SwitchProps) {
	const [internalChecked, setInternalChecked] = useState(defaultChecked);

	const isControlled = checked !== undefined;
	const isChecked = isControlled ? checked : internalChecked;

	function toggle() {
		const newValue = !isChecked;
		if (!isControlled) setInternalChecked(newValue);
		onCheckedChange?.(newValue);
	}

	return (
		<label
			className={twMerge(
				"flex items-center justify-between cursor-pointer",
				className,
			)}
		>
			<span className="text-lg font-light">{label}</span>

			<button
				type="button"
				role="switch"
				aria-checked={isChecked}
				onClick={toggle}
				className={twMerge(
					"relative inline-flex cursor-pointer h-8 w-16 items-center rounded-full transition-colors focus:outline-none",
					isChecked
						? "bg-purple-light"
						: "bg-transparent border-2 border-purple-light",
				)}
			>
				<span
					className={twMerge(
						"inline-block h-6 w-6 transform rounded-full bg-white transition-transform",
						isChecked
							? "translate-x-9"
							: "translate-x-1",
					)}
				/>
			</button>
		</label>
	);
}
