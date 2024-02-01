/**
 * Task props
 */
export interface ITask {
	id: string;
	text: string;
	userId: string;
	project: string;
	isDone: boolean;
	date: Date | null;
}
