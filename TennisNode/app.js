const express = require('express');
const app = express();

/*CORS stands for Cross Origin Resource Sharing and allows modern web browsers to be able to send AJAX requests and receive HTTP responses for resource from other domains other that the domain serving the client side application.*/
const cors = require('cors');

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require('body-parser');
const router = express.Router();

// Our JWT logic. Uses express-jwt which is a middleware that validates JsonWebTokens and sets req.member.
const jwt = require('./_helpers/jwt');


// Our error handler
const errorHandler = require('./_helpers/error-handler');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());

app.use('/member', require('./routes/member.router'));
app.use('/reservation', require('./routes/reservation.router'));
//app.use('/')
app.use(errorHandler);

const path = require('path');
//app.use('/', express.static(path.join('C:\\Users\\steph\\OneDrive\\Documents\\COLLEGE\\4 Spring 2020\\CLOUD\\Final Project\\tennis-website\\TennisAngular\\dist\\TennisWebsite')));


// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3030;
app.listen(port, function () {
  console.log('Server listening on port ' + port);
});

module.exports = router;
module.exports = app;
