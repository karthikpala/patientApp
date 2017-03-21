var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Patient = mongoose.model('Patient');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'iMinifyApp' });
});

router.get('/get-pdetails', function(req, res, next) {
	Patient.find(function(err, patients){
    if(err){ return next(err); }
    res.json(patients);
  });
});
router.post('/enter-pdetails', function(req, res, next) {
	  var patient = new Patient(req.body);
    patient.imageProofDB.data = new Buffer(req.body.imageProof);
    patient.imageProofDB.contentType = 'image/jpeg';
    
	  patient.save(function(err, post){
	    if(err){ return next(err); }

	    res.json(post);
	  });
});

module.exports = router;
