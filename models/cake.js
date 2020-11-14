const mongoose = require('mongoose');

const SCHEMA_NAME = 'cake';
const SCHEMA = mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  price: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  flavors: [
    {
      type: mongoose.SchemaTypes.String,
      required: true
    }
  ]
}, {
  timestamps: true,
},);

module.exports = mongoose.model(SCHEMA_NAME, SCHEMA);
