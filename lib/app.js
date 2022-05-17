const express = require('express')
const app = express();
const notFoundMiddleware = require('./middleware/not-found.js');
const errorMiddleware = require('./middleware/error.js');
const {fetchEvents, fetchDesigner, fetchManager} = require('./utils/scraper')
const cors = require('cors')
const cookieParser = require('cookie-parser');

app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/events', require('./controllers/eventController.js'))
app.use('/api/v1/userevents', require('./controllers/userEventController.js'))
app.use('/api/v1/auth', require('./controllers/auth'));



app.use(notFoundMiddleware);
app.use(errorMiddleware);

fetchEvents()
fetchDesigner()
fetchManager()

module.exports = app;
