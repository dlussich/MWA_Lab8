const bodyParser = require('body-parser');
const urlencodeParser = bodyParser.urlencoded({ extended: false });
const fs = require('fs');
const express = require('express');
const router = express.Router();



/* handler of GET /newsletter */
router.get('/', function(req, res, next) {
     console.log('Get /newsletter handler...')
     res.render('newsletter');
});

/* handler of POST /newsletter */
router.post('/', urlencodeParser, function (req, res) {
    // validate email field
    req.assert('email', 'Please insert an email address.').notEmpty();
    req.assert('email', 'Invalid format for the email.').isEmail();

    var errors = req.validationErrors();

    if (errors) res.render('error', {message: errors});
    else {
         // append email into subscribers.txt
        fs.appendFile('subscribers.txt', req.body.email + '\n', function (err) {
            if (err) throw err;

            res.render('thankyou', {email: req.body.email});
        });
    }
});

module.exports = router;