"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function AddTaskButton({
	...rest
}: ButtonProps) {
	const router = useRouter();

	function handleClick() {
		router.push("/add-task");
	}

	return (
		<button
			onClick={handleClick}
			className="rounded-full h-16 w-16 flex items-center justify-center fixed bottom-0 right-0 mr-4 mb-4 cursor-pointer transition-all duration-200 filter hover:brightness-70"
			style={{
				background:
					"linear-gradient(180deg, #DE83B0 0%, #C59ADF 100%)",
				boxShadow:
					"inset 0 4px 8px rgba(0, 0, 0, 0.2)",
			}}
			{...rest}
		>
			<Plus
				size={32}
				className="text-[#292D32]"
			/>
		</button>
	);
}
