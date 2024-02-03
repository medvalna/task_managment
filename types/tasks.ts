/**
 * Task props
 */
export interface ITask {
	id: string;
	text: string;
	userId: string;
	projectId: string;
	isDone: boolean;
	date: Date | null;
}
