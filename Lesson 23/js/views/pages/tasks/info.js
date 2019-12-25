import Component from '../../../views/component.js';

import Error404 from '../../../views/pages/error404.js';

class Info extends Component {
    constructor() {
        super();

        this.task = this.tasks.find(task => task.id === this.request.id);
    }

    render() {
        return new Promise(resolve => {
            let html;

            if (this.task) {
                const {id, title, status, description = 'This task dosen\'t have a description.'} = this.task;
                
				html = `
					<h1 class="page-title">Task Info</h1>
					
					<div class="task-info">
						<p>
							<b>Task Title:</b>
							${title}
						</p>
						<p>
							<b>Task Status:</b>
							${status}
						</p>
						<p>
							<b>Task Description:</b>
							${description}
						</p>
						
						<div class="task-info__buttons">
							<a href="#/task/${id}/edit"><button class="task-info__btn-edit button" ${status === 'Done' && 'disabled'}>Edit Task</button></a>
							<a href="#/tasks"><button class="task-info__btn-back button">Back to List</button></a>
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