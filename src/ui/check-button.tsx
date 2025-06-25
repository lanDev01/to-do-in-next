"use client";

import {
	motion,
	AnimatePresence,
} from "framer-motion";
import { Check } from "lucide-react";

type CheckButtonProps = {
	checked: boolean;
	onToggle: () => void;
};

export function CheckButton({
	checked,
	onToggle,
}: CheckButtonProps) {
	return (
		<button
			onClick={onToggle}
			className={`flex items-center justify-center h-7 w-7 rounded-full border-2 transition-colors duration-200 cursor-pointer
        ${checked ? "bg-purple border-purple" : "border-purple bg-transparent"}
      `}
		>
			<AnimatePresence>
				{checked && (
					<motion.div
						key="check"
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.5, opacity: 0 }}
						transition={{
							duration: 0.2,
							ease: "easeInOut",
						}}
					>
						<Check
							size={18}
							className="text-black"
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</button>
	);
}
