const apiEndpoints = {
    get_tasks:          "/tasks",
    post_task:          "/task",
    get_task_by_id:     "/tasks/",
    patch_task_by_id:   "/task/",
    delete_task_by_id:  "/task/" 
}

/*API interaction functions*/


/**
 * Asynchronously fetches tasks data from the API.
 *
 * @return {Promise<object>} The JSON response containing the tasks data.
 */
async function getTasks() {
    try {
        const apiUrl = generateApiUrl("get_tasks");
        const response  = await fetch(apiUrl);
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        return {error: [{code: error.code, message: "Failed to get tasks from database. API call returned invalid response or application failed to generate API url. Please ensure that the server is running."}]}
    } 
}

/**
 * Retrieves a task by its ID from the API.
 *
 * @param {number} id - The ID of the task to retrieve
 * @return {Promise<object>} The task data as a JSON object
 */
async function getTaskById(id) {
    if ((!Number.isInteger(id) || id < 1)) {
        throw new Error ("id error (expected Int n > 0)");
    }
    try {
        const apiUrl = generateApiUrl("get_task_by_id", id);
        const response  = await fetch(apiUrl);
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
    if (typeof taskData != "object" || taskData == null ) {
        throw new Error("taskData error (expected object)");
    }
    try {
        const apiUrl = generateApiUrl("post_task");
        const response  = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(taskData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        return {error: [{code: error.code, message: "Creating task was unsuccessful. API call returned invalid response or application failed to generate API url."}]}
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
    if (typeof taskData != "object" || taskData == null ) {
        return {error: [{code: 3, message: "taskData error (expected object)"}]}
    }
    try {
        const apiUrl = generateApiUrl("patch_task_by_id", id);
        const response  = await fetch(apiUrl, {
            method: "PATCH",
            body: JSON.stringify(taskData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        return {error: [{code: error.code, message: "Updating task was unsuccessful. API call returned invalid response or application failed to generate API url."}]}
    } 
}

/**
 * Asynchronously deletes a task by its ID.
 *
 * @param {number} id - The ID of the task to be deleted
 * @return {Promise} A Promise that resolves to the JSON response from the API
 */
async function delTask(id) {
    try {
        const apiUrl = generateApiUrl("delete_task_by_id", id);
        const response  = await fetch(apiUrl, {
            method: "DELETE"
        });
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        return {error: [{code: error.code, message: "Deleting task was unsuccessful. API call returned invalid response or application failed to generate API url."}]}
    } 
}

/**
 * Clears the error message by setting it to an empty string.
 *
 * @param {function} setErrorMessage - a function to set the error message
 * @return {void} 
 */
function clearErrorMessage(setErrorMessage) {
    setErrorMessage("");
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
    let idCondition = (Number.isInteger(id) && id > 0);
    switch (endpoint) {
        case "get_tasks":
        case "post_task":
            return apiBaseUrl + apiEndpoints[endpoint];
        case "get_task_by_id":
        case "patch_task_by_id":
        case "delete_task_by_id":
            if (idCondition) {
                return apiBaseUrl + apiEndpoints[endpoint] + id;
            }else {
                throw new Error("generateApiUrl id error (expected Int)");
            }
        default:
            throw new Error("generateApiUrl endpoint error (expected one of [get_tasks, post_task, get_task_by_id, patch_task_by_id, delete_task_by_id])");
    }
}

export {getTasks, getTaskById, postTask, patchTask, delTask, clearErrorMessage};