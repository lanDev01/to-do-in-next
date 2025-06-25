export type Priority = 1 | 2 | 3;

export interface TaskItemModel {
	title: string;
	date: string;
	priority: Priority;
	checked: boolean;
}

export interface TaskItemProps
	extends TaskItemModel {
	onToggle: () => void;
}
