const express = require('express');
const routes = require('./routes');

const { engine } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001

const _engine = engine()
app.use(routes);
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log('Now listening')); 