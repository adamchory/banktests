var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
var admin   = require('./admin.js');
const e = require('express');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());


// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {

    // //authorization/authentication
    // const idToken = req.headers.authorization
    // console.log('header:', idToken);

    // if (!idToken) {
    //   res.status(401).send();
    //   return
    // } 
    // //verify token, is this token valid?
    // admin.auth().verifyIdToken(idToken)
    //     .then(function(decodedToken) {
    //         console.log('decodedToken:',decodedToken);
            dal.find(req.params.email).
                then((users) => {

                    // if user exists, return error message
                    if(users.length > 0){
                        console.log('User already in exists');
                        res.send('User already in exists');    
                    }
                    else{
                        // else create user
                        dal.create(req.params.name,req.params.email,req.params.password).
                            then((user) => {
                                console.log(user);
                                res.send(user);            
                            });            
                    }

                });   
                // }).catch(function(error) {
                //     console.log('error:', error);
                //     res.status(401).send("Token invalid!");
                // });
});



// find user account
app.get('/account/find/:email', function (req, res) {
    
    const idToken = req.headers.authorization
    console.log('header:', idToken);

    if (!idToken) {
      res.status(401).send();
      return
    } 
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);
            dal.find(req.params.email).
                then((user) => {
                    console.log(user);
                    res.send(user);
            });
            }).catch(function(error) {
                console.log('error:', error);
                res.status(401).send("Token invalid!");
            });
});



// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    const idToken = req.headers.authorization
    console.log('header:', idToken);

    if (!idToken) {
      res.status(401).send();
      return
    } 
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);
            dal.findOne(req.params.email).
                then((user) => {
                    console.log(user);
                    res.send(user);
            });  
            }).catch(function(error) {
                console.log('error:', error);
                res.status(401).send("Token invalid!");
            });

});



// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    const idToken = req.headers.authorization
    console.log('header:', idToken);

    if (!idToken) {
      res.status(401).send();
      return
    } 
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);

                var amount = Number(req.params.amount);

                dal.update(req.params.email, amount).
                    then((response) => {
                        console.log(response);
                        res.send(response);
                });    
            }).catch(function(error) {
                console.log('error:', error);
                res.status(401).send("Token invalid!");
            });

});


// all accounts
app.get('/account/all', function (req, res) {

    const idToken = req.headers.authorization
    console.log('header:', idToken);

    if (!idToken) {
      res.status(401).send();
      return
    } 
    //check, did they pass us the token?
    //if not, do a 401 error
    //check if verify id token was successful
    //if not, do 401

    //verify token, is this token valid?
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);
            dal.all().
                then((docs) => {
                    console.log(docs);
                    res.send(docs);
            });    
        }).catch(function(error) {
            console.log('error:', error);
            res.status(401).send("Token invalid!");
        });
});

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);