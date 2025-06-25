import {
	forwardRef,
	InputHTMLAttributes,
	useId,
	useImperativeHandle,
	useRef,
} from "react";
import { Clock } from "lucide-react";
import { cn } from "@/utils/cn";

interface TimeInputProps
	extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	invalid?: string;
}

export const TimeInput = forwardRef<
	HTMLInputElement,
	TimeInputProps
>(function TimeInput({ label, className, invalid, ...rest }, ref) {
	const id = useId();
	const internalRef = useRef<HTMLInputElement>(null);

	useImperativeHandle(ref, () => internalRef.current!, []);

	function handleIconClick() {
		internalRef.current?.showPicker?.();
		internalRef.current?.focus();
	}

	return (
		<div className="w-full space-y-2">
			{label && (
				<label
					htmlFor={id}
					className="text-white/70 font-light text-lg cursor-pointer"
				>
					{label}
				</label>
			)}
			<div className="relative">
				<Clock
					className="absolute left-4 top-1/2 -translate-y-1/2 text-purple cursor-pointer"
					size={24}
					onClick={handleIconClick}
				/>

				<input
					ref={internalRef}
					id={id}
					type="time"
					className={cn(
						"bg-shape w-full p-4 pl-12 rounded-[8px] text-white font-light placeholder:text-white/80 appearance-none border border-transparent",
						"[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer",
						invalid && "input-error",
						className,
					)}
					{...rest}
				/>
			</div>

			{invalid && (
				<p className="text-sm text-red-500">{invalid}</p>
			)}
		</div>
	);
});
