import mongoose from "mongoose";

export const connect = async () => {
  mongoose.Promise = global.Promise;
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo connexion etablie");

    const collections = await mongoose.connection.db.collections();
    console.log("Collections disponibles: ", collections.map(col => col.collectionName));
    
  } catch (error) {
    throw new Error("Error connection vers MongoDB");
  }
};

