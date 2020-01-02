import Component from '../../../views/component.js';

import Error404 from '../../../views/pages/error404.js';

import Tasks from '../../../models/tasks.js';

class Edit extends Component {
    constructor() {
        super();

        this.model = new Tasks();
    }
	
	getData() {
		return new Promise(resolve => this.model.getTask(this.request.id).then(task => {
			this.task = task;
			
			resolve(task);
		}));
	}
	
    render(task) {
        return new Promise(resolve => {
            let html;
            
			if (this.isEditEnable()) {
				const {id, title, description} = task;
				
				html = `
					<h1 class="page-title">Task Edit</h1>
					
					<div class="task-edit">
						<p>
							<b>Task Title:</b>
							<input class="task-edit__title" type="text" value="${title}">
						</p>
						<p>
							<b>Task Description:</b>
							<textarea class="task-edit__description">${(description === 'No Description') ? '' : description}</textarea>
						</p>
				
						<div class="task-edit__buttons">
							<button class="task-edit__btn-save button">Save Task</button>
							<a class="task-edit__btn-back button" href="#/task/${id}">Back to Info</a>
						</div>
					</div>
				`;
			} else {
				html = new Error404().render();
			}
			
			resolve(html);
        });
    }

    afterRender() {
       this.isEditEnable() && this.setActions();
    }

	isEditEnable() {
		return Object.keys(this.task).length && this.task.status !== 'Done';
	}

    setActions() {
        const editTaskTitle = document.getElementsByClassName('task-edit__title')[0],
			editTaskDescription = document.getElementsByClassName('task-edit__description')[0],
			saveTaskBtn = document.getElementsByClassName('task-edit__btn-save')[0];
	
		editTaskTitle.addEventListener('keyup', () => saveTaskBtn.disabled = !editTaskTitle.value.trim());
        saveTaskBtn.addEventListener('click', () => this.editTask(editTaskTitle, editTaskDescription));
    }

    editTask(editTaskTitle, editTaskDescription) {
        this.task.title = editTaskTitle.value.trim();
        this.task.description = editTaskDescription.value.trim();
	
		this.model.editTask(this.task).then(() => this.redirectToTaskInfo());
    }

    redirectToTaskInfo() {
        location.hash = `#/task/${this.task.id}`;
    }
}

export default Edit;