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
    // Supprimez les options obsolètes
    serverSelectionTimeoutMS: 50000, // Augmenter le temps d'attente à 50 secondes
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
    console.log("MongoDB est déjà connectée.");
    return;
  }

  try {
    console.log("Connection à MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 50000, // Augmentez à 50 secondes
    });
    isConnected = true;
    console.log("MongoDB connection est connectée maitenant.");
  } catch (error) {
    console.error("Error connection à MongoDB:", error);
    throw new Error("Error connection à MongoDB définitivement");
  }
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

