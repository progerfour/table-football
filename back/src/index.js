import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const Server = require('socket.io');

import {UserController} from './controllers/UserController';
import {AdminController} from './controllers/AdminController';
import {MatchController} from './controllers/MatchController';
//import {UserController, AdminController} from './controllers';

//в отдельный файл
const io = new Server(9998);

io.on('connection', function (socket) {
  socket.on('newMatch', function (msg) {
    Match.create().then((value) =>{
      io.emit('newMatchCreated', value);
    });
  });

  socket.on('updateScore', function (data) {
    Match.updateScore(data).then((match) =>{
      if (match.isEnd) {
        Match.ended(match).then( () =>{
          io.emit('matchUpdated', match); //отдаст ответ клиент
        }); //сделает всё что нужно для окончания матча
      } else
        io.emit('matchUpdated', match); //отдаст ответ клиент
    })
  });

});

var app = express();

app.use(cors());
app.use(bodyParser.json()); 

const User = new UserController();
const Admin = new AdminController();
const Match = new MatchController();

mongoose.connect('mongodb://localhost:27017/football', {
  useNewUrlParser: true,
  useCreateIndex:true,
  useFindAndModify:false
});

app.get('/users/:id', User.index);
app.post('/users/create', User.create);
app.delete('/users/:id', User.delete);
app.get('/users', User.getAll);
app.put('/users/:id',User.update);
app.get('/admin/check', Admin.check);
app.put('/match/:id', Match.update);
app.get('/match/currient', Match.getCurrient);

app.listen(9999, function () {
  console.log('Example app listening on port 9999!');
});
