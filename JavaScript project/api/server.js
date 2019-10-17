const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
	  fs = require('file-system'),
	  shortId = require('shortid'),
	  dataFile = 'question.json',
	  achievementsDataFile = 'achievements.json',
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


//для получения вопросов с сервера
app.get('/questions', (req, res) => {
	res.send(getQuestionsFromDB());
});

//для получения достижений с сервера
app.get('/achievements', (req, res) => {
	res.send(getFromDBAchievements());
});

//для записи достижений на сервер
app.post('/achievements', (req, res) => {
	const data = getFromDBAchievements(),
		achievement = req.body;

	data.push(achievement);
    setAchievementsToDB(data);

	res.send(achievement);
});




function getQuestionsFromDB() {
    return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

function getFromDBAchievements() {
    return JSON.parse(fs.readFileSync(achievementsDataFile, 'utf8'));
}

function setAchievementsToDB(data) {
    fs.writeFileSync(achievementsDataFile, JSON.stringify(data));
}

app.listen(3000, () => console.log('Server has been started...'));