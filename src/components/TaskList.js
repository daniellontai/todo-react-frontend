import { useState, useRef } from 'react';
import TaskRow from './TaskRow.js';
import NewTaskBtn from './NewTaskBtn.js';
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
 * @return {React.JSX.Element} the rendered task list component
 */
export default function TaskList({ currentTasks, setTasks, errorMessage, setErrorMessage, isLoading, setIsLoading }) {
    const [taskRowKeyToFocus, setTaskRowKeyToFocus] = useState(-1);
    const isAnyRowDeleting = useRef(false);
    let isCurrentTasksEmpty = (currentTasks.size === 0);
    
    /**
     * Function to handle the click event of the new task button. 
     *
     * @return {void} 
     */
    async function newTaskBtnClick() {
        //TODO: rename to newTaskHandler()
        clearErrorMessage(setErrorMessage);
        if (!isLoading) {
            try {
                setIsLoading(true);
                const response = await postTask(
                    {
                        description: "",
                        complete: false
                    }
                );
                setIsLoading(false);
                if (response.error) {
                    setErrorMessage(generateErrorString(response.error));
                    return;
                }else if(response.id) { 
                    let nextTasks = new Map(currentTasks);
                    nextTasks.set(response.id, {id: response.id, description: response.description, complete: response.complete});
                    setTasks(nextTasks);
                    setTaskRowKeyToFocus(response.id);
                }
            }catch (error) {
                //todo: logging - network error || type error || invalid json response
            }
        }
    }

    return (
        <>
            {errorMessage && <div className="error-container">{errorMessage}</div>}
            {(!isCurrentTasksEmpty && !isLoading) && <div className="task-list">
                <div className="tasks-header">
                    <div>Task description</div>
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
                    newTaskHandler={newTaskBtnClick}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    taskRowKeyToFocus={taskRowKeyToFocus}
                    setTaskRowKeyToFocus={setTaskRowKeyToFocus}
                    isAnyRowDeleting={isAnyRowDeleting}
                    />
                ))}
            </div>}
            {(isCurrentTasksEmpty && !isLoading) && <div className="task-list empty">No tasks yet, add some using the button below.</div>}
            <NewTaskBtn clickHandler={newTaskBtnClick} />
        </>
    );
}