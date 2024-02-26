import { useRef } from 'react';
import TaskList from './TaskList.js';

/**
 * Function for rendering the TodoContainer component based on loading state.
 *
 * @param {Map} currentTasks - the array of current tasks
 * @param {function} setTasks - function to set the tasks
 * @param {string} errorMessage - error message string
 * @param {function} setErrorMessage - function to set the error message
 * @param {boolean} isLoading - boolean representing loading state
 * @param {function} setIsLoading - function to set the loading state
 * @return {jsx} returns JSX for rendering the TodoContainer component
 */
export default function TodoContainer({ currentTasks, setTasks, errorMessage, setErrorMessage, isLoading, setIsLoading }) {
    const firstRender = useRef(true);
    if (firstRender.current) {
        firstRender.current = false;
        return (
            <div className="todo-container">
                {!isLoading && <TaskList
                currentTasks={currentTasks}
                setTasks={setTasks}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                isloading={isLoading}
                setIsLoading={setIsLoading} />}
                {isLoading && <Loader />}
            </div>
        );
    }else {
        return (
            <div className="todo-container">
                <TaskList
                currentTasks={currentTasks}
                setTasks={setTasks}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                isloading={isLoading}
                setIsLoading={setIsLoading} />
                {isLoading && <Loader />}
            </div>
        );
    }
    
}

/**
 * Creates a Loader component to display a loading animation.
 *
 * @return {JSX} The Loader component with a loading animation.
 */
function Loader() {
    return(
        <>
            <div className="loading">
                <svg width="100px" height="100px" display="block" shapeRendering="auto" style={{margin: "auto"}} preserveAspectRatio="xMidYMid" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g fill="#e74752">
                    <circle cx="60" cy="50" r="4">
                    <animate attributeName="cx" begin="-0.67s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="95;35"/>
                    <animate attributeName="fill-opacity" begin="-0.67s" dur="1s" keyTimes="0;0.2;1" repeatCount="indefinite" values="0;1;1"/>
                    </circle>
                    <circle cx="60" cy="50" r="4">
                    <animate attributeName="cx" begin="-0.33s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="95;35"/>
                    <animate attributeName="fill-opacity" begin="-0.33s" dur="1s" keyTimes="0;0.2;1" repeatCount="indefinite" values="0;1;1"/>
                    </circle>
                    <circle cx="60" cy="50" r="4">
                    <animate attributeName="cx" begin="0s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="95;35"/>
                    <animate attributeName="fill-opacity" begin="0s" dur="1s" keyTimes="0;0.2;1" repeatCount="indefinite" values="0;1;1"/>
                    </circle>
                    </g>
                    <g transform="translate(-15)" fill="#f8d16a">
                    <path transform="rotate(90 50 50)" d="m50 50h-30a30 30 0 0 0 60 0z"/>
                    <path d="m50 50h-30a30 30 0 0 0 60 0z">
                    <animateTransform attributeName="transform" dur="1s" keyTimes="0;0.5;1" repeatCount="indefinite" type="rotate" values="0 50 50;45 50 50;0 50 50"/>
                    </path>
                    <path d="m50 50h-30a30 30 0 0 1 60 0z">
                    <animateTransform attributeName="transform" dur="1s" keyTimes="0;0.5;1" repeatCount="indefinite" type="rotate" values="0 50 50;-45 50 50;0 50 50"/>
                    </path>
                    </g>
                </svg>
                <p>Loading ...</p>
            </div>
        </>
    );
}