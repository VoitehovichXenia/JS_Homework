import Utils from '../../../helpers/utils.js';

import Component from '../../../views/component.js';

import Tasks from '../../../models/tasks.js';

class AddAndList extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`     
                <h1 class="page-title">Tasks List</h1>
                
                <div class="task-add">
                    <input class="task-add__title" type="text" placeholder="Task title">
                    <br>
                    <input class="task-add__description" type="text" placeholder="Task description">
                    <br>
                    <button class="task-add__btn-add button" disabled>Add Task</button>
                    <br>
                    <button class="task-add__btn-clear button">Clear Tasks List</button>                                      
                </div>
                   
                  
                <div class="tasks">
                    <div class="tasks__list">
                        ${this.tasks.length ? `<div class="number-of-tasks">There are currently ${(this.tasks.filter(item => item.status === 'Done').length) ? `<span class="number-of-tasks__done">${this.tasks.filter(item => item.status === 'Done').length}</span> done of ` : ''}<span class="number-of-tasks__all">${this.tasks.length}</span> tasks on the list.</div>` : '<div class="number-of-tasks">Task list is empty</div>'}
                        ${this.tasks.map(task => this.getTaskHTML(task)).join('\n ')}
                    </div>
                </div>            
            `);
        });
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const addTaskTitle = document.getElementsByClassName('task-add__title')[0],
			addTaskBtn = document.getElementsByClassName('task-add__btn-add')[0],
			tasksContainer = document.getElementsByClassName('tasks')[0],
			tasksList = document.getElementsByClassName('tasks__list')[0],
            clearTasksButton = document.getElementsByClassName('task-add__btn-clear')[0],
            addTaskDescription = document.getElementsByClassName('task-add__description')[0];

		addTaskTitle.addEventListener('keyup', () => addTaskBtn.disabled = !addTaskTitle.value.trim());
        addTaskBtn.addEventListener('click', () => this.addTask(addTaskTitle, addTaskBtn, tasksList, addTaskDescription));
        clearTasksButton.addEventListener('click', () => this.clearTasksList(tasksList));


		tasksContainer.addEventListener('click', event => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('task'):
                case targetClassList.contains('task__title'):
                    this.redirectToTaskInfo(target.dataset.id);
                    break;

                case targetClassList.contains('task__btn-remove'):
                    this.removeTask(target.parentNode.parentNode);
                    this.conuntNumberOfTasks(tasksList);
                    break;

                case targetClassList.contains('task__btn-done'):
                    this.makeTaskDone(target.parentNode.parentNode, target, tasksList);
                    this.conuntNumberOfTasks(tasksList);
                    break;
            }
        });
    }

    addTask(addTaskTitle, addTaskBtn, tasksList, addTaskDescription) {
		const newTask = {
			id: Utils.generateID(),
			title: addTaskTitle.value.trim(),
			status: 'In Progress'
		};

		if(addTaskDescription.value) {
		    newTask.description = addTaskDescription.value.trim();
		}

        this.tasks.push(newTask);
        Tasks.setTasksToLS(this.tasks);

		this.clearAddTask(addTaskTitle, addTaskBtn, addTaskDescription);

        tasksList.insertAdjacentHTML('beforeEnd', this.getTaskHTML(newTask));
        this.conuntNumberOfTasks(tasksList);
    }

    getTaskHTML(task) {
        return `
            <div class="task ${(task.status === 'Done') && 'task__done'}" data-id="${task.id}">
                <a class="task__title" data-id="${task.id}">${task.title}</a>
                
                <div class="task__buttons">
                    ${(task.status !== 'Done') ? `<a class="task__btn-edit button" href="#/task/${task.id}/edit">Edit</a> 
                      <a class="task__btn-done button">Done</a>` : ''} 
                    <a class="task__btn-remove button">Remove</a>   
                </div>                            
            </div>
        `;
    }

    clearAddTask(addTaskTitle, addTaskBtn, addTaskDescription) {
		addTaskTitle.value = '';
		addTaskDescription.value = '';
        addTaskBtn.disabled = true;
    }

    redirectToTaskInfo(id) {
        location.hash = `#/task/${id}`;
    }

    removeTask(taskContainer) {
        if (confirm('Are you sure?')) {
            this.tasks = this.tasks.filter(task => task.id !== taskContainer.dataset.id);
            Tasks.setTasksToLS(this.tasks);

            taskContainer.remove();

        }
    }

    clearTasksList(tasksList) {
        tasksList.innerHTML = confirm('Are you want to clear tasks list?') ? '' : tasksList.innerHTML;
        (!tasksList.children.length) && Tasks.setTasksToLS([]);
        this.drawEmptyTaskListMessage(tasksList);
    }

    conuntNumberOfTasks(tasksList) {
        const numberOfTasks = this.tasks.length,
            doneTasks = this.tasks.filter(item => item.status === 'Done').length,
            numberOfTasksMessage = document.getElementsByClassName('number-of-tasks')[0];

        (numberOfTasksMessage) && numberOfTasksMessage.remove();
        tasksList.insertAdjacentHTML('afterbegin',`<div class="number-of-tasks">${(numberOfTasks) ? `There are currently ${(doneTasks) ? `<span class="number-of-tasks__done">${doneTasks}</span> done of ` : ''} <span class="number-of-tasks__all">${numberOfTasks}</span> tasks in the list` : this.drawEmptyTaskListMessage()}`);
    }

    drawEmptyTaskListMessage(tasksList) {
        tasksList.innerHTML = '<div class="number-of-tasks">Task list is empty</div>';
    }


    makeTaskDone(taskContainer, doneButton, tasksList) {
        this.changeTaskStatus(taskContainer, tasksList);
        taskContainer.classList.add('task__done');
        taskContainer.getElementsByClassName('task__btn-edit')[0].remove();
        doneButton.remove();
    }

    changeTaskStatus(task, tasksList) {
        task = this.tasks.find(item => (item.id === task.dataset.id));
        task.status = 'Done';
        Tasks.setTasksToLS(this.tasks);
    }

}

export default AddAndList;