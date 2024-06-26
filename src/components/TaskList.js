import { useState, useRef } from 'react';
import TaskRow from './TaskRow.js';
import NewTaskBtn from './PlusBtn.js';
import { postTask, clearErrorMessage, generateErrorString } from '../api/apiCalls.js';

/**
 * A React component for rendering a task list.
 *
 * @param {Map} currentTasks - the current list of tasks
 * @param {function} setTasks - a function to set the list of tasks
 * @param {string} errorMessage - the error message
 * @param {function} setErrorMessage - a function to set the error message
 * @param {boolean} isLoading - boolean representing loading state
 * @param {function} setIsLoading - a function to set the loading state
 * @param {string} selectedList - selected list cuid
 * @return {React.JSX.Element} the rendered task list component
 */
export default function TaskList({ currentTasks, setTasks, errorMessage, setErrorMessage, isLoading, setIsLoading, selectedList }) {
	const [taskRowKeyToFocus, setTaskRowKeyToFocus] = useState(-1);
	const isAnyRowDeleting = useRef(false);
	const isAnyRowCreating = useRef(false);
	const isAnyRowCompleting = useRef(false);
	let isCurrentTasksEmpty = currentTasks.size === 0;
	let isSelectedListEmpty = selectedList === '';

	/**
	 * Function to handle the click event of the new task button.
	 *
	 * @return {void}
	 */
	async function newTaskHandler() {
		clearErrorMessage(setErrorMessage);
		if (!isLoading && !isAnyRowCreating.current) {
			isAnyRowCreating.current = true;
			try {
				setIsLoading(true);
				const response = await postTask({
					description: '',
					complete: false,
					listId: selectedList,
				});
				setIsLoading(false);
				if (response.error) {
					setErrorMessage(generateErrorString(response.error));
					isAnyRowCreating.current = false;
					return;
				} else if (response.id) {
					let nextTasks = new Map(currentTasks);
					nextTasks.set(response.id, { id: response.id, description: response.description, complete: response.complete });
					setTasks(nextTasks);
					setTaskRowKeyToFocus(response.id);
				}
			} catch (error) {
				//todo: logging - network error || type error || invalid json response
			}
			isAnyRowCreating.current = false;
		}
	}

	return (
		<>
			{errorMessage && <div className="error-container">{errorMessage}</div>}
			<div className="task-list">
				{!isCurrentTasksEmpty && !isLoading && (
					<>
						<div className="tasks-header">
							<div>
								<h3 className="m-0">Task description</h3>
							</div>
						</div>
						{Array.from(currentTasks, ([taskId, task]) => (
							<TaskRow
								key={taskId}
								taskId={taskId}
								taskDescription={task.description}
								taskComplete={task.complete}
								currentTasks={currentTasks}
								setTasks={setTasks}
								setErrorMessage={setErrorMessage}
								newTaskHandler={newTaskHandler}
								isLoading={isLoading}
								setIsLoading={setIsLoading}
								taskRowKeyToFocus={taskRowKeyToFocus}
								setTaskRowKeyToFocus={setTaskRowKeyToFocus}
								isAnyRowDeleting={isAnyRowDeleting}
								isAnyRowCompleting={isAnyRowCompleting}
								isAnyRowCreating={isAnyRowCreating}
							/>
						))}
					</>
				)}
				{isCurrentTasksEmpty && !isSelectedListEmpty && !isLoading && <div className="task-list empty">No tasks yet, add some using the button below.</div>}
				{!isSelectedListEmpty && !isLoading && <NewTaskBtn clickHandler={newTaskHandler} />}
				{isSelectedListEmpty && !isLoading && <div className="task-list empty">No list selected. Please select a list.</div>}
			</div>
		</>
	);
}
