const express = require('express')
require('./db/mongoose')

const port = process.env.PORT

// express app
const app = express();

// listen for requests
app.listen(port, () => {
  console.log(`Server listening to port ${port}`)
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('index', { title: 'Bienvenido'});
});

app.get('/create', (req, res) => {
  res.render('create', { title: 'Test' });
});


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

