const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const httpStatus = require('http-status');

const ApiError = require('./utils/ApiError');
const { errorConverter, errorHandler } = require('./middlewares/error');
const routes = require('./routers/v1');

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

app.use('/api/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

// configure ports
app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
