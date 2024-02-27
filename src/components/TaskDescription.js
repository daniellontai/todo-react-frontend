import { useState, useRef, useEffect } from 'react';

/**
 * React component for handling task description input and actions.
 *
 * @param {object} taskId - The unique identifier for the task.
 * @param {string} taskDescription - The current task description.
 * @param {function} newTaskHandler - The handler for creating a new task.
 * @param {function} completeTaskHandler - The handler for completing a task.
 * @param {function} delTaskHandler - The handler for deleting a task.
 * @param {string} taskRowKeyToFocus - The key to focus on a specific task row.
 * @param {function} descriptionUpdateHandler - The handler for updating the task description.
 * @param {boolean} isLoading - Flag indicating if data is loading.
 * @return {JSX.Element} Input component for task description.
 */
export default function TaskDescription({ taskId, taskDescription, newTaskHandler, completeTaskHandler, delTaskHandler, taskRowKeyToFocus, descriptionUpdateHandler, isLoading }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        if (taskRowKeyToFocus === taskId) {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [taskRowKeyToFocus, taskId]);

    const handleKeyDown = (event) => {
        if (event.key === 'Backspace' && event.target.value === "" && !isDeleting && !isLoading) {
            delTaskHandler();
            setIsDeleting(true);
        }else if (event.key === 'Enter' && event.ctrlKey && !isCompleting && !isLoading) {
            completeTaskHandler();
            setIsCompleting(true);
        }else if (event.key === 'Enter' && !isCreating && !isLoading) {
            newTaskHandler();
            setIsCreating(true);
        }
        
    };

    const handleKeyUp = (event) => {
        if (event.key === 'Backspace' && isDeleting) {
            setIsDeleting(false);
        }else if (event.key === 'Enter' && isCreating) {
            setIsCreating(false);
        }else if ((event.key === 'Enter' || event.ctrlKey) && isCompleting) {
            setIsCompleting(false);
        }
    };
    return (
        <input
            type="text"
            ref={inputRef}
            defaultValue={taskDescription}
            placeholder="Add task description..."
            onChange={(event) => descriptionUpdateHandler(event.target.value)}
            onBlur={(event) => descriptionUpdateHandler(event.target.value, true)}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
        />
    );
}