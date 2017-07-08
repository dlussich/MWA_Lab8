const express = require('express');
const ObjectId=require('mongodb').ObjectID;
const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {

   req.db.collection('locations').find().toArray(function(err,items){
       if(err) res.render('error',{message:err});
       else{
           res.render('location',{locations:items});
       }
   });
   
});

router.get('/add', function(req, res, next) {
    console.log('Sending GET request to addLocations...');
    res.render('addLocation');
});

router.post('/',function(req, res, next) {
    req.assert('name', 'Please insert a name.').notEmpty();
    req.assert('latitude', 'Please insert the latitude of the location.').notEmpty();
    req.assert('longitude', 'Please insert the longitude of the location.').notEmpty();
    let errors = req.validationErrors();
    if (errors) res.render('error', {message: errors});
    let query={name:req.body.location.name,
                category:req.body.location.category,
                latitude:req.body.location.latitude,
                longitude:req.body.location.longitude}; 
    req.db.collection('locations').insert(query,function(err, data){
        if(err) res.render('error',{message: err});
        else{
             res.redirect('location');
        }
    });
});

router.post('/delete/:id', function(req, res, next) {
    let query={'_id': new ObjectId(req.params.id)};
    console.log(query);
     req.db.collection('locations').remove(query,function(err, removed){
        if(err) res.render('error',{message: err});
        else{
            console.log('Location successfully removed...'+removed);
        }
    });
    res.redirect('location');
});

module.exports = router;
