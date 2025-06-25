"use client";

import { useRef, useState } from "react";
import { addDays } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/ui/input";
import { Switch } from "@/ui/switch";
import { Button } from "@/ui/button";
import { Textarea } from "@/ui/textarea";
import { TimeInput } from "@/ui/time-input";

import { WeekCalendar } from "@/components/week-calendary";
import { ButtonPriority } from "@/components/button-priority";

import type { Priority } from "@/models/task-item";
import { taskSchema } from "@/schemas/task-schema";

export default function AddTask() {
	const nameRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const startTimeRef = useRef<HTMLInputElement>(null);
	const endTimeRef = useRef<HTMLInputElement>(null);

	const [alert, setAlert] = useState(false);
	const [priority, setPriority] = useState<number | null>(null);

	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDay, setSelectedDay] = useState(new Date());

	const [errors, setErrors] = useState<Record<string, string>>({});

	const router = useRouter();

	const handlePrevWeek = () => setCurrentDate((prev) => addDays(prev, -7));
	const handleNextWeek = () => setCurrentDate((prev) => addDays(prev, 7));
	const handleSelectDate = (date: Date) => setSelectedDay(date);

	const priorities: Priority[] = [1, 2, 3];

	function handleClick() {
		router.push("/");
	}

	function handleSubmit() {
		const rawData = {
			name: nameRef.current?.value || "",
			description: descriptionRef.current?.value || "",
			startTime: startTimeRef.current?.value || "",
			endTime: endTimeRef.current?.value || "",
			date: selectedDay,
			priority: priority ?? undefined,
			alert,
		};

		const result = taskSchema.safeParse(rawData);

		if (!result.success) {
			const fieldErrors = result.error.flatten().fieldErrors;

			const formattedErrors: Record<string, string> = {};

			for (const [key, messages] of Object.entries(fieldErrors)) {
				if (messages && messages.length > 0) {
					formattedErrors[key] = messages[0];
				}
			}

			setErrors(formattedErrors);
			return;
		}

		setErrors({});

		const validatedTask = result.data;

		const newTask = {
			title: validatedTask.name,
			date: new Date(validatedTask.date).toLocaleDateString("en-GB", {
				day: "numeric",
				month: "short",
				timeZone: "America/Sao_Paulo",
			}),
			priority: validatedTask.priority ?? 3,
			checked: false,
		};

		const existing = localStorage.getItem("tasks");
		const tasks = existing ? JSON.parse(existing) : [];
		tasks.push(newTask);
		localStorage.setItem("tasks", JSON.stringify(tasks));

		router.push("/");
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const fieldName = event.target.name;

		if (errors[fieldName]) {
			setErrors((prevErrors) => {
				const updatedErrors = { ...prevErrors };
				delete updatedErrors[fieldName];
				return updatedErrors;
			});
		}
	}

	return (
		<div className="p-8 w-full max-w-7xl mx-auto">
			<header className="flex items-center justify-between">
				<button
					type="button"
					className="w-6 h-6 flex items-center justify-center border border-white rounded-full cursor-pointer"
					onClick={handleClick}
				>
					<ArrowLeft size={16} />
				</button>

				<h1 className="font-normal text-2xl">Create new task</h1>

				<div />
			</header>

			<WeekCalendar
				currentDate={currentDate}
				selectedDate={selectedDay}
				onPrevWeek={handlePrevWeek}
				onNextWeek={handleNextWeek}
				onSelectDate={handleSelectDate}
			/>

			<h3 className="text-2xl font-light mt-5">
				Schedule
			</h3>

			<div className="space-y-4 mt-5">
				<Input
					placeholder="Name"
					invalid={errors.name}
					ref={nameRef}
					name="name"
					onChange={handleChange}
				/>

				<Textarea
					placeholder="Description"
					rows={4}
					ref={descriptionRef}
				/>
			</div>

			<div className="flex flex-col sm:flex-row gap-4 items-center mt-4 w-full">
				<TimeInput
					label="Start time"
					className="flex-1"
					invalid={errors.startTime}
					ref={startTimeRef}
					name="startTime"
					onChange={handleChange}
				/>

				<TimeInput
					label="End time"
					className="flex-1"
					invalid={errors.endTime}
					ref={endTimeRef}
					name="endTime"
					onChange={handleChange}
				/>
			</div>

			<h4 className="text-white/80 font-light text-2xl mt-5">
				Priority
			</h4>

			<div className="flex flex-col sm:flex-row gap-4 items-center mt-4 w-full">
				{priorities.map((priorityValue) => (
					<ButtonPriority
						key={priorityValue}
						priority={priorityValue}
						isActive={priority === priorityValue}
						onClick={() => setPriority(priorityValue)}
					/>
				))}
			</div>

			<Switch
				label="Get alert for this task"
				className="mt-6"
				checked={alert}
				onCheckedChange={setAlert}
			/>

			<Button className="mt-8" onClick={handleSubmit} />
		</div>
	);
}
