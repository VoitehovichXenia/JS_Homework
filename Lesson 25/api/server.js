const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
	  fs = require('file-system'),
	  shortId = require('shortid'),
	  dataFile = 'tasks.json',
      app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/api/tasks', (req, res) => {
	res.send(getTasksFromDB());
});

app.post('/api/task', (req, res) => {
	const data = getTasksFromDB(),
		task = req.body;

	task.id = shortId.generate();
	task.description = task.description || 'No Description';
	task.status = 'In Progress';

	data.push(task);
    setTasksToDB(data);

	res.send(task);
});


app.get('/api/task/:id', (req, res) => {
	const data = getTasksFromDB(),
		task = data.find(task => task.id === req.params.id);

    task ? res.send(task) : res.send({});
});

app.put('/api/task/:id', (req, res) => {
	const data = getTasksFromDB(),
		task = data.find(task => task.id === req.params.id),
		updatedTask = req.body;

	task.title = updatedTask.title;
	task.description = updatedTask.description || 'No Description';
	task.status = updatedTask.status;

    setTasksToDB(data);

	res.sendStatus(204);
});

app.delete('/api/task/:id', (req, res) => {
	const data = getTasksFromDB(),
		newData = data.filter(task => task.id !== req.params.id);

	setTasksToDB(newData);
	console.log(newData);

	res.sendStatus(204);
});

app.delete('/api/tasks', (req, res) => {
	setTasksToDB([]);

	res.sendStatus(204);
});

function getTasksFromDB() {
    return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

function setTasksToDB(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data));
}

app.listen(3000, () => console.log('Server has been started...'));