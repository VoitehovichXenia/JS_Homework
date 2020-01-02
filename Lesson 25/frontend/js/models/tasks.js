class Tasks {
    getTasksList() {
    	return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', 'http://localhost:3000/api/tasks', true);

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send();
		});
    }

    clearTasksList() {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('DELETE', 'http://localhost:3000/api/tasks', true);

			xhr.onload = () => resolve();

			xhr.send();
		});
	}

    addTask(newTask) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:3000/api/task', true);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send(JSON.stringify(newTask));
		});
	}

	getTask(id) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', `http://localhost:3000/api/task/${id}`, true);

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send();
		});
	}

	editTask(updatedTask) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('PUT', `http://localhost:3000/api/task/${updatedTask.id}`, true);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve();

			xhr.send(JSON.stringify(updatedTask));
		});
	}

	removeTask(task){
    	return new Promise ( resolve => {
    		const xhr = new XMLHttpRequest();

    		xhr.open ('DELETE', `http://localhost:3000/api/task/${task.id}`, true);

    		xhr.onload = () => resolve();

			xhr.send();
		});
	}
}

export default Tasks;