const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001

const mongoose = require("mongoose")

app.use(routes);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist'))


main().catch(err => console.log(err))

async function main () {
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb')
    app.listen(PORT, () => {
      console.log(`App running at http://localhost:${PORT}/`)
    })
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}