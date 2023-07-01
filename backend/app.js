const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const server = require('http').createServer(app);


mongoose.connect('mongodb+srv://mashmanan:XRBoUR6E2r8LA8Gc@cluster0.em3lz0t.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error(err));

const url = 'https://api.themoviedb.org/3/trending/all/week?language=en-US';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzk5ZDEwN2ZmZGZmZDg5ODA2MjUyOGJmN2RiYjFhOSIsInN1YiI6IjY0OTZjZWY2NjJmMzM1MDBhZDAwNGRmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JbmM-GMotf0O4Q7zy7HNO8vBLT4oXkjkR8MxfekMSnk'
  }
};

const UserScheme = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
});

const User = mongoose.model('User', UserScheme);

const MessageScheme = new mongoose.Schema({
  message: { type: String },
  username: { type: String },
  id: { type: String },
});

const Message = mongoose.model('Message', MessageScheme);

app.get('/messages', async (req, res) => {
  const { id } = req.query;
  const messages = await Message.find({ id });
  res.status(200).json(messages);
});

app.post('/messages', async (req, res) => {
  const { message, username, id } = req.body;
  const newMessage = new Message({ message, username, id });
  
  try {
    const createdMessage = await newMessage.save();
    res.status(201).json(createdMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add message to MongoDB' });
  }
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  const createdUser = await user.save();
  res.status(201).json(createdUser); // Sending the created user as the response
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(404).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/data', (req, res) => {
  fetch(url, options)
    .then(res => res.json())
    .then(json => res.json(json))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/data/new', (req, res) => {
  const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzk5ZDEwN2ZmZGZmZDg5ODA2MjUyOGJmN2RiYjFhOSIsInN1YiI6IjY0OTZjZWY2NjJmMzM1MDBhZDAwNGRmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JbmM-GMotf0O4Q7zy7HNO8vBLT4oXkjkR8MxfekMSnk'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => res.json(json))
  .catch(err => console.error('error:' + err));
})

app.get('/data/movie/new', (req, res) => {
  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzk5ZDEwN2ZmZGZmZDg5ODA2MjUyOGJmN2RiYjFhOSIsInN1YiI6IjY0OTZjZWY2NjJmMzM1MDBhZDAwNGRmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JbmM-GMotf0O4Q7zy7HNO8vBLT4oXkjkR8MxfekMSnk'
    }
  };
  
  fetch(url, options)
    .then(res => res.json())
    .then(json => res.json(json))
    .catch(err => console.error('error:' + err));
  })

  app.get('/data/tv/new', (req, res) => {
    const url = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzk5ZDEwN2ZmZGZmZDg5ODA2MjUyOGJmN2RiYjFhOSIsInN1YiI6IjY0OTZjZWY2NjJmMzM1MDBhZDAwNGRmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JbmM-GMotf0O4Q7zy7HNO8vBLT4oXkjkR8MxfekMSnk'
      }
    };
    
    fetch(url, options)
      .then(res => res.json())
      .then(json => res.json(json))
      .catch(err => console.error('error:' + err));
    })

app.listen(8000, () => console.log('Server ready'));