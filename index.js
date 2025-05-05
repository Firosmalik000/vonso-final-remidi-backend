const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const projectRoute = require('./route/projectRoute');
const noteRoute = require('./route/noteRoute');
const agendaRoute = require('./route/agendaRoute');
const userRoute = require('./route/userRoute');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
const corsOptions = {
  origin: 'https://vonso-final-remidi.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // ini penting untuk method OPTIONS


const dotenv = require('dotenv');
dotenv.config();

app.use('/api/project', projectRoute);
app.use('/api/note', noteRoute);
app.use('/api/agenda', agendaRoute);
app.use('/api/user', userRoute);

mongoose
  .connect(
    'mongodb://root:root123@ac-ufjoenx-shard-00-00.wv5qisj.mongodb.net:27017,ac-ufjoenx-shard-00-01.wv5qisj.mongodb.net:27017,ac-ufjoenx-shard-00-02.wv5qisj.mongodb.net:27017/vonso-final-remidi?ssl=true&replicaSet=atlas-xeklsr-shard-0&authSource=admin&retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('connected');
    app.listen(5000, () => {
      console.log('server started at port 5000');
    });
  })
  .catch((err) => {
    console.log('Kesalahan server', err);
  });
