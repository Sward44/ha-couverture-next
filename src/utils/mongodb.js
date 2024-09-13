import { MongoClient, Mongoose } from 'mongodb';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000,
  });

  await client.connect();

  const db = client.db();
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

// mongoose connection
let isConnected = false;

export async function connectMongoose() {
  if (isConnected) {
    return;
  }

  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
  });

  isConnected = true;
}

// import mongoose from "mongoose";

// export const connect = async () => {
//   mongoose.Promise = global.Promise;
//   if (mongoose.connections[0].readyState) return;

//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("Mongo connexion etablie");

//     const collections = await mongoose.connection.db.collections();
//     console.log("Collections disponibles: ", collections.map(col => col.collectionName));
    
//   } catch (error) {
//     throw new Error("Error connection vers MongoDB");
//   }
// };

