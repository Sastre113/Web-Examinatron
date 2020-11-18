const express = require('express');
require('./db/mongoose');

const testRouter = require('./routers/question');
const port = process.env.PORT || 3000;

// express app
const app = express();

// listen for requests
app.listen(port, () => {
  console.log(`Server listening to port ${port}`)
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use('/static', express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.render('index', { title: 'Bienvenido'});
});

app.get('/create', (req, res) => {
  res.render('create', { title: 'Test' });
});

app.get('/test', (req, res) => {
  res.render('test', { title: 'Test' });
});

app.use(express.json());
app.use('/api', testRouter);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

