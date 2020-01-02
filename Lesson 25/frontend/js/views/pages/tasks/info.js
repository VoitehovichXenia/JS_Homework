import Component from '../../../views/component.js';

import Error404 from '../../../views/pages/error404.js';

import Tasks from '../../../models/tasks.js';

class Info extends Component {
    constructor() {
        super();

        this.model = new Tasks();
    }
	
	getData() {
		return new Promise(resolve => this.model.getTask(this.request.id).then(task => resolve(task)));
	}
	
    render(task) {
        return new Promise(resolve => {
            let html;
            
			if (Object.keys(task).length) {
				const {id, title, description, status} = task;
				
				html = `
					<h1 class="page-title">Task Info</h1>
					
					<div class="task-info">
						<p>
							<b>Task Title:</b>
							${title}
						</p>
						<p>
							<b>Task Description:</b>
							${description}
						</p>
						<p>
							<b>Task Status:</b>
							${status}
						</p>
						
						<div class="task-info__buttons">
							${status !== 'Done' ?
								`<a class="task-info__btn-edit button" href="#/task/${id}/edit">Edit Task</a>`
							: ''}
							<a class="task-info__btn-back button" href="#/tasks">Back to List</a>
						</div>
					</div>
				`;
			} else {
				html = new Error404().render();
			}
			
			resolve(html);
        });
    }
}

export default Info;