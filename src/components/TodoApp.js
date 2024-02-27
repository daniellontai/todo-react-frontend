import TodoContainer from './TodoContainer.js';
import { getTasks, generateErrorString } from '../api/apiCalls.js';
import { useState, useEffect, useRef } from 'react';

/**
 * TodoApp component that manages tasks state, initial task fetching, loading state and error messages.
 *
 * @return {JSX.Element} The TodoContainer component with props
 */
export default function TodoApp(){
    const [currentTasks, setTasks] = useState(new Map());
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const errorMessageTimeout = useRef(null);

    useEffect(() => {
        clearTimeout(errorMessageTimeout.current);
        errorMessageTimeout.current = setTimeout(() => {
            setErrorMessage("");
        }, 10000);
        return () => {
            clearTimeout(errorMessageTimeout.current);
        };
    }, [errorMessage])
    
    useEffect(() => {
        setIsLoading(true);
        getTasks().then(data => {
            setIsLoading(false);
            if (data.error) {
                setErrorMessage(generateErrorString(data.error));
                return;
            }

            data.sort((a, b) => {
            if (a.complete === b.complete) {
                // If both completions are equal, keeepe the sort by task id
                return a.id - b.id;
            } else if (a.complete) {
                return 1;
            } else {
                return -1;
            }
            });
            const nextTasks = new Map(data.map(task => [task.id, task]));
            setTasks(nextTasks);
        }).catch(error => {
            setErrorMessage(generateErrorString(error.message));
        });
    }, []);
    
    
    return (
        <TodoContainer
            currentTasks={currentTasks}
            setTasks={setTasks}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
        />
    );
}