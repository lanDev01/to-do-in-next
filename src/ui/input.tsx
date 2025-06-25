import {
	forwardRef,
	InputHTMLAttributes,
} from "react";
import { cn } from "@/utils/cn";

interface InputProps
	extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	id?: string;
	invalid?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	function Input(
		{ label, id, className, invalid, ...rest },
		ref
	) {
		const inputId =
			id ||
			label?.toLowerCase().replace(/\s+/g, "-") ||
			undefined;

		return (
			<div className="w-full space-y-2">
				{label && (
					<label
						htmlFor={inputId}
						className="text-white/70 font-light text-lg cursor-pointer"
					>
						{label}
					</label>
				)}

				<input
					type="text"
					id={inputId}
					ref={ref}
					className={cn(
						"bg-shape w-full p-4 rounded-lg text-white font-light placeholder:text-white/80 transition-all duration-200",
						invalid && "input-error",
						className
					)}
					{...rest}
				/>

				{invalid && (
					<p className="text-sm text-red-500">{invalid}</p>
				)}
			</div>
		);
	}
);
