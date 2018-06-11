//====LIST DEPENDENCIES===//
const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const uniqueValidator = require('mongoose-unique-validator');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
const session = require('express-session');
const Signature = require('./models/signature');
const cors = require('cors')
const app = express();
// const url = 'mongodb://localhost:27017/signatures';
// const url = 'mongodb://<dbuser>:<dbpassword>@ds011860.mlab.com:11860/signatures';
const url = process.env.MONGOLAB_URI;

//=========================//

//====SET APP ENGINE===//

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');
app.use(cors())
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator());

//=========================//

//====MONGOOSE PROMISE===//

mongoose.Promise = require('bluebird');

//==========================//

//====MONGOOSE PROMISE===//

mongoose.connect(url, function(err, db) {

    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);
    }


});

//==========================//

//====TEST THE CONNECTION===//

app.use(function(req, res, next) {
    console.log('You used app');
    next();
})

app.get('/', function(req, res) {
    res.json('You did it');
});

//==========================//

//====GET ALL SIGNATURES===//

app.get('/api/signatures', cors(), function(req, res) {

    Signature.find({}).then(eachOne => {
        res.json(eachOne);
    })


});

//==========================//

//====POST NEW SIGNATURE===//

app.post('/api/signatures', cors(), function(req, res) {
    Signature.create({
        guestSignature: req.body.guestSignature,
        message: req.body.message
    }).then(signature => {
        res.json(signature)
    });


});

//==========================//

//====APP LISTEN ON ENVIRONMENT PORT===//

app.listen(process.env.PORT || 3000);
console.log('starting applicaiton.  Good job!');

//==========================//


//====EXPORT APP===//

// module.exports = app;