const express = require('express')
const notFoundMiddleware = require('./middleware/not-found.js');
const errorMiddleware = require('./middleware/error.js');
const {fetchEvents} = require('./utils/scraper')
const cors = require('cors')
const app = express();

app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

app.use(express.json());


app.use('/api/v1/events', require('./controllers/eventController.js'))




app.use(notFoundMiddleware);
app.use(errorMiddleware);

fetchEvents()

module.exports = app;
