import TodoContainer from './TodoContainer.js';
import { generateErrorString, getLists, getListTasks } from '../api/apiCalls.js';
import { useState, useEffect, useRef } from 'react';

/**
 * TodoApp component that manages tasks state, initial task fetching, loading state and error messages.
 *
 * @return {JSX.Element} The TodoContainer component with props
 */
export default function TodoApp() {
	if (window.location.pathname !== '/') {
		window.location.pathname = '/';
	}
	const [selectedList, setSelectedList] = useState('');
	const [lists, setLists] = useState([]);
	const [currentTasks, setTasks] = useState(new Map());
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const errorMessageTimeout = useRef(null);
	let initialRender = useRef(true);

	useEffect(() => {
		clearTimeout(errorMessageTimeout.current);
		errorMessageTimeout.current = setTimeout(() => {
			setErrorMessage('');
		}, 10000);
		return () => {
			clearTimeout(errorMessageTimeout.current);
		};
	}, [errorMessage]);

	useEffect(() => {
		setIsLoading(true);
		/**
		 * Fetches the lists and handles the response, setting state and error message as needed.
		 */
		async function fetchLists() {
			try {
				const lists = await getLists();
				setIsLoading(false);
				if (lists.error) {
					setErrorMessage(generateErrorString(lists.error));
					return;
				}
				setLists(lists);
				if (initialRender.current) {
					setSelectedList(lists[0].id);
					initialRender.current = false;
				}
			} catch (error) {
				setErrorMessage(generateErrorString(error.message));
			}
		}
		fetchLists();
	}, []);

	useEffect(() => {
		async function fetchTasksOfList() {
			if (selectedList) {
				setIsLoading(true);
				setTasks(await getListTasks(selectedList));
				setIsLoading(false);
			}
		}
		fetchTasksOfList();
	}, [selectedList]);

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	getTasks()
	// 		.then((data) => {
	// 			setIsLoading(false);
	// 			if (data.error) {
	// 				setErrorMessage(generateErrorString(data.error));
	// 				return;
	// 			}

	// 			data.sort((a, b) => {
	// 				if (a.complete === b.complete) {
	// 					// If both completions are equal, keeepe the sort by task id
	// 					return a.id - b.id;
	// 				} else if (a.complete) {
	// 					return 1;
	// 				} else {
	// 					return -1;
	// 				}
	// 			});
	// 			const nextTasks = new Map(data.map((task) => [task.id, task]));
	// 			setTasks(nextTasks);
	// 		})
	// 		.catch((error) => {
	// 			setErrorMessage(generateErrorString(error.message));
	// 		});
	// }, []);

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
