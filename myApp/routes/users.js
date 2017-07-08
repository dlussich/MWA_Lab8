var fetch = require('node-fetch'),
    rx=require('@reactivex/rxjs'),
    express = require('express');
var router = express.Router();


/* GET users listing. */

router.get('/', function(req, res, next) {
    /*
    //Lab5 exercise 1, use fetch as a promise
    fetch('http://jsonplaceholder.typicode.com/users')
        .then(function(res) {
            return res.json();
        }).then(function(json) {
            res.render('users',{users: json});
        }).catch(function(error){
            res.render('error',{message: error});
      });*/


      //Lab5 exercise2, user the promise as an observable
      var source= rx.Observable.create(function(observer){
          fetch('http://jsonplaceholder.typicode.com/users')
               .then(function(res) {
                    return res.json();
                }).then(function(json) {
                    observer.next(json);
                }).catch(function(error){
                    console.log(error);
                    observer.error(error);
                });
      });

     source.subscribe(function(json){
          res.render('users',{users: json});
          
      },
      function(error){
         res.render('error',{message: error});
      },function(){
          console.log('Completed users service conume...');
      });
      

     /* async function readUsers(){
          try{
                const userData= await fetch('http://jsonplaceholder.typicode.com/users')
                                .then(function(res) {
                                     return res.json();
                                });
                res.render('users',{users:userData});
          }catch(err){
             res.render('error',{message: err})
          }
      }
      readUsers();*/
});

module.exports = router;
