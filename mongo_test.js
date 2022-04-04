const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
// const MONGODB_URI = process.env.MONGODB_URI
// const MONGODB_DB = process.env.MONGODB_DB

// if (!MONGODB_URI) {
//     throw new Error(
//       'Please define the MONGODB_URI environment variable inside .env.local'
//     )
//   }
  
//   if (!MONGODB_DB) {
//     throw new Error(
//       'Please define the MONGODB_DB environment variable inside .env.local'
//     )
//   }

//   /**
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections growing exponentially
//  * during API Route usage.
//  */
// let cached = global.mongo

// if (!cached) {
//   cached = global.mongo = { conn: null, promise: null }
// }

// export async function connectToDatabase() {
//   if (cached.conn) {
//     return cached.conn
//   }

//   if (!cached.promise) {
//     const opts = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }

//     cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
//       return {
//         client,
//         db: client.db(MONGODB_DB),
//       }
//     })
//   }
//   cached.conn = await cached.promise
//   return cached.conn
// }
// // connect to mongo
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
//   console.log("Connected successfully to server");

//     // database Name
//     const dbName = 'bankingApplication';
//     const db = client.db(dbName);

//     // new user
//     var name = 'user' + Math.floor(Math.random()*10000);
//     var email = name + '@mit.edu';

//     // insert into customer table
//     var collection = db.collection('customers');
//     var doc = {name, email};
//     collection.insertOne(doc, {w:1}, function(err, result) {
//         console.log('Document insert');
//     });

//     var customers = db
//         .collection('customers')
//         .find()
//         .toArray(function(err, docs) {
//             console.log('Collection:',docs);

//             // clean up
//             client.close();            
//     });    

// });
