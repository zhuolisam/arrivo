const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');

// CONFIG
const port = process.env.PORT || 5000;

const app = express();

// add cors and erverything
app.use(cors({ credentials: true }));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// configure ports
app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
