const mongoose = require('mongoose');


let Schema = mongoose.Schema;

const authCodeSchema = new Schema({
  code: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
})

const Code = mongoose.model('Code', authCodeSchema);

module.exports = Code;
