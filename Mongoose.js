import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection sur MongoDB");
  } catch (e) {
    console.error(e, "Erreur de connection sur la base de donnée");
  }
};

export default connect;
