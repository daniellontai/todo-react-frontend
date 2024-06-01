import TodoContainer from './TodoContainer.js';
import { clearErrorMessage, deleteList, generateErrorString, getLists, getListTasks, postList } from '../api/apiCalls.js';
import { useState, useEffect, useRef } from 'react';
import Header from './Header.js';

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
		 * Fetches the initial lists and handles the response, setting state and error message as needed.
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
				if (initialRender.current && lists.length > 0) {
					setSelectedList(lists[0].id);
					initialRender.current = false;
				}
			} catch (error) {
				setErrorMessage(generateErrorString(error));
			}
		}
		fetchLists();
	}, []);

	useEffect(() => {
		async function fetchTasksOfList() {
			if (selectedList) {
				setIsLoading(true);
				const tasksOfSelectedList = await getListTasks(selectedList);
				setIsLoading(false);
				if (tasksOfSelectedList.error) {
					setErrorMessage(generateErrorString(tasksOfSelectedList.error));
					return;
				}
				const nextTasks = new Map(tasksOfSelectedList.map((task) => [task.id, task]));
				setTasks(nextTasks);
			} else {
				setTasks(new Map());
			}
		}
		fetchTasksOfList();
		if (selectedList) {
			document.title = selectedList ? `Todo - ${lists.find((list) => list.id === selectedList).name}` : 'Todo';
		}
	}, [selectedList]);

	function newTaskListPopupHandler() {
		const name = prompt('Enter name of new list');
		if (name) {
			postNewTaskListHandler({ name });
		}
	}

	async function postNewTaskListHandler({ name }) {
		clearErrorMessage(setErrorMessage);
		let listData = {
			name: name,
		};
		try {
			setIsLoading(true);
			let list = await postList(listData);

			setIsLoading(false);
			if (list.error) {
				setErrorMessage(generateErrorString(list.error));
				return;
			}
			setLists([...lists, list]);
			setSelectedList(list.id);
		} catch (error) {}
	}

	async function deleteTaskListHandler(listId) {
		let alert = window.confirm('Are you sure you want to delete list ' + lists.find((list) => list.id === listId).name + '?');
		if (alert) {
			try {
				setIsLoading(true);
				const response = await deleteList(listId);
				setIsLoading(false);
				if (response.error) {
					setErrorMessage(generateErrorString(response.error));
					return;
				}

				const updatedLists = lists.filter((list) => list.id !== listId);
				setLists(updatedLists);

				if (updatedLists.length === 0) {
					setSelectedList('');
					document.title = 'Todo';
				} else {
					setSelectedList(updatedLists[0].id);
				}
			} catch (error) {
				setErrorMessage(generateErrorString(error));
			}
		}
	}

	return (
		<>
			<Header
				lists={lists}
				selectedList={selectedList}
				setSelectedList={setSelectedList}
				newTaskListPopupHandler={newTaskListPopupHandler}
			/>
			<TodoContainer
				currentTasks={currentTasks}
				setTasks={setTasks}
				errorMessage={errorMessage}
				setErrorMessage={setErrorMessage}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
				lists={lists}
				setLists={setLists}
				selectedList={selectedList}
				setSelectedList={setSelectedList}
				deleteTaskListHandler={deleteTaskListHandler}
				newTaskListPopupHandler={newTaskListPopupHandler}
			/>
		</>
	);
}
