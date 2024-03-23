// models/catalogModel.js
const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
  pdf: String,
  title: String,
},
{ collection: "Catalog" }
);

mongoose.model('Catalog', catalogSchema);