import Image from "next/image";

interface HeaderProps {
	pendingTasks: number;
}

export function Header({
	pendingTasks,
}: HeaderProps) {
	return (
		<header className="flex items-center justify-between w-full">
			<h1 className="text-2xl sm:text-3xl font-bold">
				You have got {pendingTasks} tasks today to
				complete
			</h1>

			<div className="relative w-16 h-16 min-w-16 min-h-16">
				<Image
					src="https://github.com/LanDev01.png"
					alt="Image user"
					fill
					className="rounded-full object-cover"
				/>

				{pendingTasks > 0 && (
					<div className="absolute bottom-0 right-0 bg-[#FF763B] font-light text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
						{pendingTasks}
					</div>
				)}
			</div>
		</header>
	);
}
