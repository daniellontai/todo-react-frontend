const apiEndpoints = {
	get_lists: '/lists',
	post_list: '/list',
	delete_list_by_id: '/list/',
	get_list_tasks: '/tasks/',
	get_tasks: '/tasks', //deprecated
	post_task: '/task',
	get_task_by_id: '/tasks/',
	patch_task_by_id: '/task/',
	delete_task_by_id: '/task/',
};

/**
 * Asynchronously retrieves lists from the API and returns the JSON response.
 *
 * @return {Object} The JSON response from the API
 */
async function getLists() {
	try {
		const apiUrl = generateApiUrl('get_lists');
		const response = await fetch(apiUrl);
		const jsonResponse = await response.json();
		return jsonResponse;
	} catch (error) {
		return {
			error: [
				{
					code: error.code,
					message:
						'Failed to get lists from database. API call returned invalid response or application failed to generate API url. Please ensure that the server is running. [getLists]',
				},
			],
		};
	}
}

/**
 * Retrieves a list of tasks associated with the provided list ID from the server.
 *
 * @param {string} listId - The ID of the list for which tasks are being retrieved
 * @return {Promise<Object>} A Promise that resolves with the JSON response containing the list of tasks, or an error object if the request fails
 */
async function getListTasks(listId) {
	try {
		const apiUrl = generateApiUrl('get_list_tasks', listId);
		const response = await fetch(apiUrl);
		const jsonResponse = await response.json();
		return jsonResponse;
	} catch (error) {
		return {
			error: [
				{
					code: error.code,
					message:
						'Failed to get tasks from database. API call returned invalid response or application failed to generate API url. Please ensure that the server is running. [getListTasks]',
				},
			],
		};
	}
}

/**
 * Asynchronously posts a list of data to the server.
 *
 * @param {object} listData - The data of the list to be posted
 * @return {Promise} A promise that resolves to the JSON response from the server
 */
async function postList(listData) {
	if (typeof listData !== 'object' || listData == null) {
		throw new Error('listData error (expected object) [postList]');
	}
	if (listData.name == null || typeof listData.name !== 'string') {
		throw new Error('listData.name error (expected string) [postList]');
	}
	try {
		const apiUrl = generateApiUrl('post_list');
		const response = await fetch(apiUrl, {
			method: 'POST',
			body: JSON.stringify(listData),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const jsonResponse = await response.json();
		return jsonResponse;
	} catch (error) {
		return {
			error: [{ code: error.code, message: 'Creating list was unsuccessful. API call returned invalid response or application failed to generate API url. [postList]' }],
		};
	}
}

/**
 * Asynchronously deletes a list identified by listId from the server.
 *
 * @param {string} listId - The id of the list to be deleted
 * @return {Promise<object>} A JSON object representing the deleted list or an error object
 */
async function deleteList(listId) {
	try {
		const apiUrl = generateApiUrl('delete_list_by_id', listId);
		const response = await fetch(apiUrl, {
			method: 'DELETE',
		});
		const jsonResponse = await response.json();
		return jsonResponse;
	} catch (error) {
		return {
			error: [{ code: error.code, message: 'Deleting list was unsuccessful. API call returned invalid response or application failed to generate API url. [deleteList]' }],
		};
	}
}

/**
 * Retrieves a task by its ID from the API.
 *
 * @param {number} id - The ID of the task to retrieve
 * @return {Promise<object>} The task data as a JSON object
 */
async function getTaskById(id) {
	if (!Number.isInteger(id) || id < 1) {
		throw new Error('id error (expected Int n > 0) [getTaskById]');
	}
	try {
		const apiUrl = generateApiUrl('get_task_by_id', id);
		const response = await fetch(apiUrl);
		const jsonResponse = await response.json();
		return jsonResponse;
	} catch (error) {
		throw new Error(error);
	}
}

/**
 * Asynchronously posts a task to the server.
 *
 * @param {object} taskData - the data of the task to be posted
 * @return {Promise} the JSON response from the server
 */
async function postTask(taskData) {
	if (typeof taskData != 'object' || taskData == null) {
		throw new Error('taskData error (expected object) [postTask]');
	}
	try {
		const apiUrl = generateApiUrl('post_task');
		const response = await fetch(apiUrl, {
			method: 'POST',
			body: JSON.stringify(taskData),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const jsonResponse = await response.json();
		return jsonResponse;
	} catch (error) {
		return {
			error: [{ code: error.code, message: 'Creating task was unsuccessful. API call returned invalid response or application failed to generate API url. [postTask]' }],
		};
	}
}

/**
 * Asynchronously updates a task identified by id with the provided task data.
 *
 * @param {number} id - The id of the task to be updated
 * @param {object} taskData - The data to update the task with
 * @return {Promise<object>} A JSON object representing the updated task
 */
async function patchTask(id, taskData) {
	if (!Number.isInteger(id) || id < 1) {
		throw new Error('id error (expected Int n > 0) [patchTask]');
	}
	if (typeof taskData != 'object' || taskData == null) {
		throw new Error('taskData error (expected object) [patchTask]');
	}
	try {
		const apiUrl = generateApiUrl('patch_task_by_id', id);
		const response = await fetch(apiUrl, {
			method: 'PATCH',
			body: JSON.stringify(taskData),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const jsonResponse = await response.json();
		return jsonResponse;
	} catch (error) {
		return {
			error: [{ code: error.code, message: 'Updating task was unsuccessful. API call returned invalid response or application failed to generate API url. [patchTask]' }],
		};
	}
}

/**
 * Asynchronously deletes a task by its ID.
 *
 * @param {number} id - The ID of the task to be deleted
 * @return {Promise} A Promise that resolves to the JSON response from the API
 */
async function delTask(id) {
	if (!Number.isInteger(id) || id < 1) {
		throw new Error('id error (expected Int n > 0)');
	}
	try {
		const apiUrl = generateApiUrl('delete_task_by_id', id);
		const response = await fetch(apiUrl, {
			method: 'DELETE',
		});
		const jsonResponse = await response.json();
		return jsonResponse;
	} catch (error) {
		return {
			error: [{ code: error.code, message: 'Deleting task was unsuccessful. API call returned invalid response or application failed to generate API url. [delTask]' }],
		};
	}
}

/**
 * Clears the error message by setting it to an empty string.
 *
 * @param {function} setErrorMessage - a function to set the error message
 * @return {void}
 */
function clearErrorMessage(setErrorMessage) {
	setErrorMessage('');
}

/**
 * Generates an error string by joining the error messages with a line break.
 *
 * @param {Array<Object>} error - An array of error objects containing a message property.
 * @return {string} The generated error string.
 */
function generateErrorString(error) {
	let errorString = error.map((e) => e.message).join('<br/>');
	return errorString;
}

/**
 * Generates an API URL based on the endpoint and ID if required for the operation.
 *
 * @param {string} endpoint - The endpoint for the API request.
 * @param {number} [id=0] - The ID for the specific task (default is 0).
 * @return {string} The generated API URL.
 */
function generateApiUrl(endpoint, id = 0) {
	let apiBaseUrl = window.env.REACT_APP_API_URL;

	let idCondition = (Number.isInteger(id) && id > 0) || isValidCuid(id);

	switch (endpoint) {
		case 'get_lists':
		case 'post_list':
		case 'get_tasks': //deprecated
		case 'post_task':
			return apiBaseUrl + apiEndpoints[endpoint];
		case 'delete_list_by_id':
		case 'get_list_tasks':
		case 'get_task_by_id':
		case 'patch_task_by_id':
		case 'delete_task_by_id':
			if (idCondition) {
				return apiBaseUrl + apiEndpoints[endpoint] + id;
			} else {
				throw new Error('generateApiUrl id error (expected Int or Cuid), got ' + id);
			}
		default:
			throw new Error(
				'generateApiUrl endpoint error (expected one of [get_lists, post_list, delete_list_by_id, get_tasks, post_task, get_list_tasks, get_task_by_id, patch_task_by_id, delete_task_by_id])'
			);
	}
}

/**
 * Checks if the input string is a valid CUID.
 * Based on https://github.com/paralleldrive/cuid/issues/88
 *
 * @param {string} str - The string to check.
 * @return {boolean} Indicates if the string is a valid CUID.
 */
function isValidCuid(str) {
	return str.length > 0 && str.charAt(0) === 'c' && str.length >= 7;
}

export { getLists, getListTasks, postList, deleteList, getTaskById, postTask, patchTask, delTask, clearErrorMessage, generateErrorString };
