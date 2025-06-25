import { Input } from "@/ui/input";
import { Search } from "lucide-react";

export function SearchInput({
	value,
	onChange,
}: {
	value: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement>,
	) => void;
}) {
	return (
		<div className="relative w-full">
			<Search
				className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"
				size={18}
			/>

			<Input
				placeholder="Search task here"
				value={value}
				onChange={onChange}
				className="pl-10"
			/>
		</div>
	);
}
