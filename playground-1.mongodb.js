const { ObjectId } = require("mongodb");

use("ha-couverture");

db.users.insertOne({
  _id: new ObjectId("65ef5a285e2215d918483521"),
  email: "arnaud.girardin@renault.com",
  phone: "+33678988256",
  name: "Arnaud Girardin",
  firstName: "Arnaud",
  lastName: "Girardin",
  role: "user",
  emailVerified: new Date(),
});
