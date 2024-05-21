use("ha-couverture");

const user = db.users.find({ email: "davidlaunay567@gmail.com" }).exec();

// if (!user) {
//   db.users.updateOne({
//     _id:user._id },
//     { $set: { 
//       surname: "David",
//       name: "Launay",
//     phone: "+33636946970" },
//   upsert:true });}
