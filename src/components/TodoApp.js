import TodoContainer from './TodoContainer.js';
import { getTasks } from '../api/apiCalls.js';
import { useState, useEffect, useRef } from 'react';

/**
 * TodoApp component that manages tasks state, initial task fetching, loading state and error messages.
 *
 * @return {JSX.Element} The TodoContainer component with props
 */
export default function TodoApp(){
    const [currentTasks, setTasks] = useState(new Map());
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
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
                setErrorMessage(data.error[0].message);
                return;
            }

            data.sort((a, b) => {
                if(a.complete === true && b.complete ===false) {
                    return 1;
                }else {
                    return -1;
                }
            });
            const tasksMap = new Map(data.map(task => [task.id, task]));
            setTasks(tasksMap);
        }).catch(error => {
            setErrorMessage(error.message);
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