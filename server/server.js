require('dotenv').config(); // Add this line to load environment variables from .env file

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const catalogRoutes = require('./routes/catalog');

const app = express();

app.use(express.json());
app.use(cors()); // Add this line to enable CORS for all routes

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/catalog', catalogRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database');
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
