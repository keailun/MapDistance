// server.js

var express = require('express');
var controller = require('./app/controller');
const app = express();
app.use(express.static('./app'));

//fire controller
controller(app);

//listen on localhost
app.listen(3000);
