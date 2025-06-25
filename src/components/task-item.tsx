"use client";

import type { TaskItemProps } from "@/models/task-item";
import { CheckButton } from "@/ui/check-button";
import { getPriorityColor } from "@/utils/get-priority-color";
import { CalendarMinus2, Trash2 } from "lucide-react";
import { motion, PanInfo } from "framer-motion";
import { useState } from "react";

interface TaskItemWithDeleteProps extends TaskItemProps {
	onDelete: () => void;
}

export function TaskItem({
	title,
	date,
	priority,
	checked,
	onToggle,
	onDelete,
}: TaskItemWithDeleteProps) {
	const [dragX, setDragX] = useState(0);

	const maxDrag = -300;
	const deleteThreshold = maxDrag * 0.50;

	function handleDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
		if (info.offset.x < deleteThreshold) {
			onDelete();
		} else {
			setDragX(0);
		}
	}

	const dragProgress = Math.min(1, Math.abs(dragX) / Math.abs(deleteThreshold));

	return (
		<div className="relative mt-5">
			<motion.div
				aria-hidden="true"
				style={{
					opacity: dragProgress,
					scale: 0.8 + 0.4 * dragProgress
				}}
				className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-md bg-red-500 flex items-center justify-center pointer-events-none"
			>
				<Trash2 size={24} color="white" />
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0, x: dragX }}
				exit={{ opacity: 0, y: -20 }}
				transition={{
					duration: 0.3,
					ease: "easeOut",
				}}
				drag="x"
				dragConstraints={{ left: maxDrag, right: 0 }}
				dragElastic={0.2}
				onDrag={(event, info) => setDragX(info.offset.x)}
				onDragEnd={handleDragEnd}
				className={`rounded-lg p-4 flex items-center justify-between border-l-[16px] transition-colors duration-300
					${checked ? "bg-shape/30" : "bg-shape"}
				`}
				style={{
					borderLeftColor: getPriorityColor(priority),
				}}
			>
				<div className="flex flex-col gap-1">
					<h4
						className={`text-lg font-light text-white ${checked ? "line-through text-white/50" : ""}`}
					>
						{title}
					</h4>

					<span className="flex gap-2 text-sm font-light text-white/70">
						<CalendarMinus2 size={16} />
						{date}
					</span>
				</div>

				<CheckButton checked={checked} onToggle={onToggle} />
			</motion.div>
		</div>
	);
}
