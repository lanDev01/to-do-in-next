import {
	forwardRef,
	TextareaHTMLAttributes,
} from "react";
import { cn } from "@/utils/cn";

interface TextareaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> { }

export const Textarea = forwardRef<
	HTMLTextAreaElement,
	TextareaProps
>(function Textarea({ className, ...rest }, ref) {
	return (
		<textarea
			ref={ref}
			className={cn(
				"bg-shape w-full p-4 rounded-[8px] text-white font-light placeholder:text-white/80 resize-none",
				className,
			)}
			{...rest}
		/>
	);
});
