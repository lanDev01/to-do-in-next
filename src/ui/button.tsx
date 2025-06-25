import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Size = "xs" | "sm" | "md";

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: Size;
	className?: string;
}

export function Button({
	size = "xs",
	className,
	...props
}: ButtonProps) {
	const sizeClasses = {
		sm: "w-fit px-6 py-2 text-base",
		md: "w-fit px-8 py-3 text-lg",
		xs: "w-full px-4 py-4 text-xl",
	};

	const baseClasses = `
    bg-gradient-to-r from-[#BA83DE] to-[#DE83B0]
    rounded-lg font-medium text-white cursor-pointer
    shadow-md transition duration-300 ease-in-out
    hover:brightness-110 active:scale-95
  `;

	return (
		<button
			{...props}
			className={twMerge(
				baseClasses,
				sizeClasses[size],
				className,
			)}
		>
			{props.children ?? "Create task"}
		</button>
	);
}
