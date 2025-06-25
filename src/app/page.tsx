"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { Header } from "@/components/header";
import { TaskItem } from "@/components/task-item";
import { SearchInput } from "@/components/search-input";
import { AddTaskButton } from "@/components/add-task-button";

import { Reorder } from "framer-motion";
import type { TaskItemModel } from "@/models/task-item";
import { ArrowDownAZ, ArrowUpAZ, ChevronDown } from "lucide-react";

export default function Home() {
	const [search, setSearch] = useState("");
	const [debouncedSearch] = useDebounce(
		search,
		300,
	);

	const [sortDesc, setSortDesc] = useState(true);
	const [showAll, setShowAll] = useState(false);

	const [tasks, setTasks] = useState<TaskItemModel[]>([]);

	useEffect(() => {
		const stored = localStorage.getItem("tasks");

		if (stored) {
			try {
				setTasks(JSON.parse(stored));
			} catch (e) {
				console.error("Failed to parse tasks from localStorage");
			}
		}
	}, []);

	function deleteTask(title: string) {
		const updated = tasks.filter(task => task.title !== title);
		setTasks(updated);
		localStorage.setItem("tasks", JSON.stringify(updated));
	}

	function toggleTask(title: string) {
		const updated = tasks.map((task) =>
			task.title === title
				? { ...task, checked: !task.checked }
				: task
		);
		setTasks(updated);
		localStorage.setItem("tasks", JSON.stringify(updated));
	}

	const filteredTasks = tasks.filter((task) =>
		task.title
			.toLowerCase()
			.includes(debouncedSearch.toLowerCase()),
	);

	function handleReorder(newOrder: TaskItemModel[]) {
		setTasks(newOrder);
		localStorage.setItem("tasks", JSON.stringify(newOrder));
	}

	function isToday(dateString: string) {
		const today = new Date();
		const todayFormatted = today.toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
			timeZone: "America/Sao_Paulo",
		});

		return dateString === todayFormatted;
	}

	const tasksSortedByDate = [...filteredTasks].sort((a, b) => {
		const aDate = new Date(a.date);
		const bDate = new Date(b.date);
		return sortDesc
			? bDate.getTime() - aDate.getTime()
			: aDate.getTime() - bDate.getTime();
	});

	const tasksToShow = tasksSortedByDate.filter(task =>
		showAll ? true : isToday(task.date)
	);

	const totalTasks = tasks.length;
	const completedTasks = tasks.filter(
		(t) => t.checked,
	).length;
	const pendingTasks = tasks.filter(
		(t) => !t.checked,
	).length;
	const percent =
		totalTasks > 0
			? (completedTasks / totalTasks) * 100
			: 0;

	return (
		<main className="p-8 w-full max-w-7xl mx-auto">
			<div className="space-y-6">
				<Header pendingTasks={pendingTasks} />
				<SearchInput
					value={search}
					onChange={(e) =>
						setSearch(e.target.value)
					}
				/>
			</div>

			<div className="flex justify-between items-center mt-7">
				<h3 className="text-2xl font-light">
					Progress
				</h3>
				<span className="text-purple text-base cursor-pointer hover:underline">
					See all
				</span>
			</div>

			{/* PROGRESS */}
			<div className="mt-5 bg-shape/90 rounded-lg p-4 space-y-2.5">
				<div className="space-y-1.5">
					<h2 className="text-xl text-white">
						Daily task
					</h2>
					<h4 className="font-extralight text-white/90">
						{completedTasks}/{totalTasks} Task
						completed
					</h4>
				</div>

				<div className="space-y-1.5">
					<div className="flex justify-between items-center space-y-0.5">
						<span className="font-thin text-white/80">
							{percent === 100
								? "You're all done!"
								: percent > 0
									? "You are almost done go ahead"
									: "Let's get started!"}
						</span>
						<span className="font-medium text-lg">
							{Math.round(percent)}%
						</span>
					</div>

					<div className="bg-purple/40 rounded-full w-full h-7 my-2 overflow-hidden">
						<div
							className="bg-purple rounded-full h-full transition-all duration-300"
							style={{ width: `${percent}%` }}
						/>
					</div>
				</div>
			</div>

			<div className="flex justify-between items-center mt-7">
				<div className="flex items-center gap-4 relative group">
					<h3 className="text-2xl font-light">
						Today's task
					</h3>

					<button
						onClick={() => setSortDesc(!sortDesc)}
						className="flex items-center gap-2 p-1 text-sm rounded-full"
					>
						{sortDesc ? (
							<ArrowDownAZ className="size-4 text-purple cursor-pointer" />
						) : (
							<ArrowUpAZ className="size-4 text-purple cursor-pointer" />
						)}
					</button>
				</div>

				<span
					className="text-purple text-base cursor-pointer hover:underline"
					onClick={() => setShowAll(!showAll)}
				>
					{showAll ? "Show today's tasks" : "See all"}
				</span>
			</div>

			<Reorder.Group
				axis="y"
				values={tasksToShow}
				onReorder={handleReorder}
				className="space-y-2 mt-5"
			>
				{tasksToShow.map((task) => (
					<Reorder.Item
						key={task.title}
						value={task}
						layout
						initial={{ scale: 1 }}
						whileDrag={{
							scale: 1.05,
							boxShadow:
								"0 0 10px rgba(0,0,0,0.2)",
						}}
						className="cursor-grab"
					>
						<TaskItem
							title={task.title}
							date={task.date}
							priority={task.priority}
							checked={task.checked}
							onToggle={() => toggleTask(task.title)}
							onDelete={() => deleteTask(task.title)}
						/>
					</Reorder.Item>
				))}
			</Reorder.Group>

			{filteredTasks.length === 0 && (
				<div className="text-center text-white/70 mt-10 text-lg">
					You don't have any tasks yet. Let's create one!
				</div>
			)}

			<AddTaskButton />
		</main>
	);
}
