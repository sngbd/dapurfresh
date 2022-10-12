require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helper = require('./helpers/response');
const route = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(helper);
app.use(`${process.env.BASE_URL}`, route);

app.listen(PORT, async () => {
  console.log(`App run on port ${PORT}`);
});
