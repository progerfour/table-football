import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import UserModel from "./schemas";

import {UserController} from './controllers/UserController';
import {AdminController} from './controllers/AdminController';
//import {UserController, AdminController} from './controllers';
const Server = require('socket.io');

var app = express();

app.use(cors());
app.use(bodyParser.json());

const User = new UserController();
const Admin = new AdminController();

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


app.listen(9999, function () {
  console.log('Example app listening on port 9999!');
});
