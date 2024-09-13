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
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
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

// d5qjm-1726235228771-45f4623cab22
// ?state=3z8iSid1Hci1e1bK5ZAnd5qNyf5THdtmXIjhA1A2fH4
// &code=4%2F0AQlEd8xB2HPHsWMjUP7dc0fkCHjfslQbM7-5ySR9o9AL-4dEfuUZlmDovUXFHdHaG7TwWg
// &scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserin
    
