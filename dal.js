//const MongoClient = require('mongodb').MongoClient;
//const url = 'mongodb://localhost:27017';

const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv').config();

const uri = process.env.MONGODB_URI;
 let db = null;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(
                err => {
            db = client.db("bankapp")
            });
// function (err, client) {
//     console.log("Connected successfully to db server");

//     // connect to myproject database
//     db = client.db('bankapp');
// });

// async function main(){
//     /**
//      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//      */
 

//     const client = new MongoClient(uri);
 
//     try {
//         // Connect to the MongoDB cluster
//        db = await client.connect();
//        console.log('success?')
 
 
//     } catch (e) {
//         console.error(e);
//     } 
// }
// main().catch(console.error);

// connect to mongo
// MongoClient.connect(process.env.DB) 
//             .then(x => {
//                 console.log(`Connected to Mongo! Database name: ${x.connections[0].name}`)
//             })
//             .catch(err => console.log(err))
//                 console.log("Connected successfully to db server");

    // connect to myproject database
   // db = client.db('bankingapplication');
//});

// create user account using the collection.insertOne function
function create(name, email, password) {
    // TODO: populate this function based off the video
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// find user account 
function find(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({ email: email })
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

// find user account
function findOne(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
}

// update - deposit/withdraw amount
function update(email, amount) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: { balance: amount } },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );


    });
}

// return all users by using the collection.find method
function all() {
    // TODO: populate this function based off the video
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = { create, findOne, find, update, all };