import DelTaskBtn from './DelTaskBtn.js';
import TaskDescription from './TaskDescription.js';
import CompleteTaskBtn from './CompleteTaskBtn.js';
import { delTask, patchTask, clearErrorMessage } from '../api/apiCalls.js';
import { useEffect, useRef, useState } from 'react';

/**
 * Function for managing task row operations.
 *
 * @param {number} taskId - The ID of the task
 * @param {string} taskDescription - The description of the task
 * @param {boolean} taskComplete - The completion status of the task
 * @param {Map} currentTasks - The map of current tasks
 * @param {function} setTasks - The function to set tasks
 * @param {function} setErrorMessage - The function to set error message
 * @param {function} newTaskHandler - The function to handle new tasks
 * @param {function} setIsLoading - The function to set loading status
 * @param {number} taskRowKeyToFocus - The key of the task row to focus
 * @param {function} setTaskRowKeyToFocus - The function to set the key of the task row to focus
 * @return {React.JSX.Element} The task row component
 */
export default function TaskRow({ taskId, taskDescription, taskComplete, currentTasks, setTasks, setErrorMessage, newTaskHandler, setIsLoading, taskRowKeyToFocus, setTaskRowKeyToFocus }) {
    const [descriptionValue, setDescriptionValue] = useState(taskDescription);
    const descriptionOnBlurDelay = useRef(null);
    const firstRender = useRef(true);

    /**
     * An asynchronous function to handle the deletion of a task.
     *
     * @param {number} taskIdToDel - The ID of the task to be deleted
     * @return {void}
     */
    async function delTaskHandler(taskIdToDel) {
        clearErrorMessage(setErrorMessage);
        try {
            setIsLoading(true);
            const response = await delTask(taskIdToDel);
            setIsLoading(false);
            if (response.error) {
                setErrorMessage(response.error[0].message);
                return;
            }else {
                let nextTasks = new Map(currentTasks);
                let previousKey = null;
                for (let [key, task] of nextTasks) {
                    if (task.id === taskIdToDel) {
                        nextTasks.delete(key);
                        break; // exit the loop once the task is found and deleted
                    }
                    previousKey = key;
                }
                setTasks(nextTasks);
                setTaskRowKeyToFocus(previousKey);
            }
        } catch (error) {
            //todo: logging
        }
    }

    /**
     * An asynchronous function to handle updating task completion status.
     *
     * @param {number} taskIdToComplete - the ID of the task to complete
     * @param {boolean} taskComplete - the current completion status of the task
     */
    async function completeTaskHandler(taskIdToComplete, taskComplete) {
        clearErrorMessage(setErrorMessage);
        try {
            setIsLoading(true);
            const response = await patchTask(taskIdToComplete, 
                {
                    complete: !taskComplete
                }
            );
            setIsLoading(false);
            if (response.error) {
                setErrorMessage(response.error[0].message);
                return;
            }else {
                let nextTasks = new Map(currentTasks);
                if (nextTasks.has(taskIdToComplete)) {
                    let task = nextTasks.get(taskIdToComplete);
                    nextTasks.set(taskIdToComplete, {...task, complete: !task.complete});
                }
                setTasks(nextTasks);
            }
        } catch (error) {
            //todo: logging
        }
    }

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        clearTimeout(descriptionOnBlurDelay.current);
        descriptionOnBlurDelay.current = setTimeout(async () => {
            clearErrorMessage(setErrorMessage);
            try {
                setIsLoading(true);
                const response = await patchTask(taskId, 
                    {
                        description: descriptionValue
                    }
                );
                setIsLoading(false);
                if (response.error) {
                    setErrorMessage(response.error[0].message);
                    return;
                }
            } catch (error) {
                //todo: logging
            }
        }, 5000);
        return () => {
            clearTimeout(descriptionOnBlurDelay.current);
        };
    }, [descriptionValue]);

    let cssClass = "task-row" + ((taskComplete) ? " complete" : "");
    return (
        <div className={cssClass} key={taskId}>
            <div><DelTaskBtn
                clickHandler={() => delTaskHandler(taskId)}
            /></div>
            <div><TaskDescription
                taskId={taskId}
                taskDescription={taskDescription}
                setDescriptionValue={setDescriptionValue}
                newTaskHandler={newTaskHandler}
                completeTaskHandler={() => {completeTaskHandler(taskId, taskComplete)}}
                delTaskHandler={() => {delTaskHandler(taskId)}}
                taskRowKeyToFocus={taskRowKeyToFocus} /></div>
            <div><CompleteTaskBtn
                clickHandler={() => completeTaskHandler(taskId, taskComplete)}
            /></div>
        </div>
    );
}