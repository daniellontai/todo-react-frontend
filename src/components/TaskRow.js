import DelTaskBtn from './DelTaskBtn.js';
import TaskDescription from './TaskDescription.js';
import CompleteTaskBtn from './CompleteTaskBtn.js';
import { delTask, patchTask, clearErrorMessage, generateErrorString } from '../api/apiCalls.js';
import { useEffect, useRef } from 'react';

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
 * @param {number} taskRowKeyToFocus - The key of the task row to focus
 * @param {function} setTaskRowKeyToFocus - The function to set the key of the task row to focus
 * @return {React.JSX.Element} The task row component
 */
export default function TaskRow({ taskId, taskDescription, taskComplete, currentTasks, setTasks, setErrorMessage, newTaskHandler, isLoading, setIsLoading, taskRowKeyToFocus, setTaskRowKeyToFocus, isAnyRowDeleting, isAnyRowCompleting }) {
    //const [descriptionValue, setDescriptionValue] = useState(taskDescription);
    //const [isTaskRowLoading, setIsTaskRowLoading] = useState(false);
    const descriptionOnBlurDelay = useRef(null);
    const taskRowFirstRender = useRef(true);

    /**
     * A function to handle the deletion of a task.
     *
     * @param {type} taskIdToDel - the ID of the task to be deleted
     * @param {type} handlingKeyPress - a boolean indicating if the function is handling a key press
     * @return {type} undefined
     */
    async function delTaskHandler(taskIdToDel, handlingKeyPress = false) {
        clearErrorMessage(setErrorMessage);
        if (!isLoading && !isAnyRowDeleting.current) {
            isAnyRowDeleting.current = true;
            try {
                setIsLoading(true);
                //setIsTaskRowLoading(true);
                const response = await delTask(taskIdToDel);
                //setIsTaskRowLoading(false);
                setIsLoading(false);
                if (response.error) {
                    setErrorMessage(generateErrorString(response.error));
                    isAnyRowDeleting.current = false;
                    return;
                }else {
                    let nextTasks = new Map(currentTasks);
                    if (handlingKeyPress) {
                        let previousKey = null;
                        for (let [key, task] of nextTasks) {
                            if (task.id === taskIdToDel) {
                                break; // exit the loop once the task is found and deleted
                            }
                            previousKey = key;
                        }
                        setTaskRowKeyToFocus(previousKey);
                    }

                    if (nextTasks.has(taskIdToDel)) {
                        nextTasks.delete(taskIdToDel);
                    }
                    
                    setTasks(nextTasks);
                }
            } catch (error) {
                //todo: logging - network error || type error || invalid json response
            }
            isAnyRowDeleting.current = false;
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
        if (!isLoading && !isAnyRowCompleting.current) {
            isAnyRowCompleting.current = true;
            try {
                setIsLoading(true);
                //setIsTaskRowLoading(true);
                const response = await patchTask(taskIdToComplete, 
                    {
                        complete: !taskComplete
                    }
                );
                //setIsTaskRowLoading(false);
                setIsLoading(false);
                if (response.error) {
                    setErrorMessage(generateErrorString(response.error));
                    isAnyRowCompleting.current = false;
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
                //todo: logging - network error || type error || invalid json response
            }
            isAnyRowCompleting.current = false;
        }
    }

    /**
     * A function to handle the update of a description. Used by TaskDescription and DelTaskBtn
     *
     * @param {string} newDescription - the new description to be updated
     * @param {boolean} [isBlur=false] - indicates if the update is due to a blur event
     * @return {void} 
     */
    async function descriptionUpdateHandler(newDescription, isBlur = false) {
        //setDescriptionValue(newDescription);
        if (taskRowFirstRender.current) {
            taskRowFirstRender.current = false;
            return;
        }
        clearTimeout(descriptionOnBlurDelay.current);
        let delayMilliseconds;
        isBlur ? delayMilliseconds = 0 : delayMilliseconds = 3000;
        descriptionOnBlurDelay.current = setTimeout(async () => {
            clearErrorMessage(setErrorMessage);
            if (newDescription !== taskDescription) {
                try {
                    setIsLoading(true);
                    //setIsTaskRowLoading(true);
                    const response = await patchTask(taskId, 
                        {
                            description: newDescription
                        }
                    );
                    //setIsTaskRowLoading(false);
                    setIsLoading(false);
                    if (response.error) {
                        setErrorMessage(generateErrorString(response.error));
                        return;
                    }else {
                        let nextTasks = new Map(currentTasks);
                        nextTasks.set(taskId, { ...nextTasks.get(taskId), description: newDescription });
                        setTasks(nextTasks);
                    }
                } catch (error) {
                    //todo: logging - network error || type error || invalid json response
                }
            }
        }, delayMilliseconds);
    }

    useEffect(() => {
        return () => {
            clearTimeout(descriptionOnBlurDelay.current);
        };
    }, []);

    let cssClass = "task-row" + ((taskComplete) ? " complete" : "");
    return (
        <div className={cssClass} key={taskId}>
            <div><DelTaskBtn
                clickHandler={() => delTaskHandler(taskId)}
            /></div>
            <div><TaskDescription
                taskId={taskId}
                taskDescription={taskDescription}
                newTaskHandler={newTaskHandler}
                completeTaskHandler={() => {completeTaskHandler(taskId, taskComplete)}}
                delTaskHandler={() => {delTaskHandler(taskId, true)}}
                taskRowKeyToFocus={taskRowKeyToFocus}
                descriptionUpdateHandler={descriptionUpdateHandler}
                isLoading={isLoading}
            /></div>
            <div><CompleteTaskBtn
                clickHandler={() => completeTaskHandler(taskId, taskComplete)}
            /></div>
        </div>
    );
}