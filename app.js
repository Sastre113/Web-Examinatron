const express = require('express');
const Test = require('./models/question');
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


app.get('/',  async (req, res) => {
  const tests = await Test.find({})
  res.render('index', { title: 'Bienvenido',tests});
});

app.get('/create', (req, res) => {
  res.render('create', { title: 'Test' });
});

app.get('/test', async (req, res) => {
  try {
    const tests = await Test.find({})
    res.render('test', { title: 'Test' , tests});
  } catch (error) {
    res.render('test', { title: 'Test' , tests: [] });
  }
});

app.use(express.json());
app.use('/api', testRouter);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

