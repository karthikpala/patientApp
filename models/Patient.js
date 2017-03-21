var mongoose = require('mongoose');
var PatientSchema = new mongoose.Schema({
  firstName: {type: String, unique: true},
  middleName: String,
  lastName: String,
  dob: Date,
  age: { type: Number, min: 1, max: 100 },
  gender: String,
  address: String,
  phNum: String,
  careSpec: String,
  imageProofDB:{ data: Buffer, contentType: String }
});
mongoose.model('Patient', PatientSchema);