const fetch = require('node-fetch'),
      crypto=require('crypto'),
      express = require('express');
const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('Here in GET method of secret js..');
    req.db.collection('homework7').findOne({},function(err, item) {
        var decipher = crypto.createDecipher('aes256','asaadsaad');
        var dec = decipher.update(item.message,'hex','binary');
        dec += decipher.final('binary');
        res.render('secret',{message:dec})
        console.log(dec);
   });
      
});

module.exports = router;
