var express = require('express');
const mongoose = require('mongoose');
var app = express();

import User from "./schemas/User";

mongoose.connect('mongodb://localhost:27017/football', {useNewUrlParser: true});

app.get('/', function (req, res) {
  res.send('Hello World!');
  const user = new User({ name: 'Admin',avatar:"0.jpg", isAdmin:true });
  user.save().then(() => console.log('Created user'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});