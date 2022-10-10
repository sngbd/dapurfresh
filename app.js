require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
// import helpers
const helper = require('./helpers/response');
// import route
const route = require('./routes');

app.use(helper);
app.use(`${process.env.BASE_URL}`, route);

app.listen(PORT, () => {
  console.log(`App run on port ${PORT}`);
});
