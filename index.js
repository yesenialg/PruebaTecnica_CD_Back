/**Archivo principad de la api */

const express = require('express');
const app = express();
const router = require('./app/routers/index');

const port = 3001;

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:3001`);
});