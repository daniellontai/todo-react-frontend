import { useState, useRef, useEffect } from 'react';

/**
 * React component for handling task description input.
 *
 * @param {number} taskId - The unique identifier for the task
 * @param {string} taskDescription - The current description of the task
 * @param {function} setDescriptionValue - Function to set the description value
 * @param {function} newTaskHandler - Function to handle creating a new task
 * @param {function} completeTaskHandler - Function to handle completing a task
 * @param {function} delTaskHandler - Function to handle deleting a task
 * @param {number} taskRowKeyToFocus - The key of the task row to focus on
 * @return {React.JSX.Element} - Input field for task description
 */
export default function TaskDescription({ taskId, taskDescription, setDescriptionValue, newTaskHandler, completeTaskHandler, delTaskHandler, taskRowKeyToFocus, onBlurHandler, isTaskRowLoading }) {
    const [hasDeleted, setHasDeleted] = useState(false);
    const [hasCreated, setHasCreated] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        if (taskRowKeyToFocus === taskId) {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [taskRowKeyToFocus, taskId]);

    const handleKeyDown = (event) => {
        if (event.key === 'Backspace' && event.target.value === "" && !hasDeleted) {
            delTaskHandler();
            setHasDeleted(true);
        }else if (event.key === 'Enter' && event.ctrlKey) {
            completeTaskHandler();
        }else if (event.key === 'Enter' && !hasCreated) {
            newTaskHandler();
            setHasCreated(true);
        }
        
    };

    const handleKeyUp = (event) => {
        /*if (event.key === 'Backspace') {
            setHasDeleted(false);
        }else */
        if (event.key === 'Enter' && hasCreated) {
            setHasCreated(false);
        }
    };
    return (
        <input
            type="text"
            ref={inputRef}
            defaultValue={taskDescription}
            placeholder="Add task description..."
            onChange={(event) => console.log(event.target.value)}
            onBlur={onBlurHandler}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
        />
    );
}