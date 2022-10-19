require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const sUser = require('./models/user');
const sMessage = require('./models/message')

// export one function that gets called once as the server is being initialized
module.exports = function (app, server) {

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', '*');
        next();
    });

    app.use(express.json());

    const io = require('socket.io')(server, {
        cors: {
            origin: "http://127.0.0.1:5000",
            methods: ["GET", "POST", "PUT"]
        }
    })

    require('./socket/chat')(io);

    app.use(function (req, res, next) { req.io = io; next(); });

    app.get('/users', (req, res, next) => {
        sUser.find()
        .then(buckets => res.status(200).json(buckets))
        .catch(error => res.status(400).json({ error }));
    })

    app.get('/users/:id', (req, res, next) => {
        sMessage.findOne({ _id: req.params.id })
        .then(buckets => res.status(200).json(buckets))
        .catch(error => res.status(400).json({ error }));
      });

    app.post('/user', (req, res, next) => {

        const user = new sUser({...req.body});
        user.save().then(() => {
          res.status(201).json({
            message: 'user créee'
          })
        }).catch((error) => {
          res.status(400).json({error})
        })
      });

      app.delete('/user/:id', (req, res, next) => {
  
        sUser.remove({ _id: req.params.id }, { ...req.body, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'User Supprimé'}))
          .catch(error => res.status(400).json({ error }));
      })

      app.get('/messages', (req, res, next) => {
        sMessage.find()
        .then(buckets => res.status(200).json(buckets))
        .catch(error => res.status(400).json({ error }));
      });

      app.get('/messages/:id', (req, res, next) => {
        sMessage.findOne({ _id: req.params.id })
        .then(buckets => res.status(200).json(buckets))
        .catch(error => res.status(400).json({ error }));
      });

      app.post('/message', (req, res, next) => {
    
        const message = new sMessage({...req.body});
        message.save().then(() => {
          res.status(201).json({
            message: 'message créee'
          })
        }).catch((error) => {
          res.status(400).json({error})
        })
      });

      app.delete('/message/:id', (req, res, next) => {
  
        sMessage.remove({ _id: req.params.id }, { ...req.body, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Message Supprimé'}))
          .catch(error => res.status(400).json({ error }));
      })
      
}

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then (() => console.log('DB is OK' ))
  .catch(() => console.log('DB failed'));