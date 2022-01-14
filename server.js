const express = require('express');
const cors    = require('cors');
const routes  = require('./routes');

let APP_PORT =  process.env.PORT || 3000;

const app = express();

app.use([
  express.json(), 
  cors(), 
  routes
]);

app.listen(APP_PORT, () => console.log(`App running on port ${APP_PORT}`));
