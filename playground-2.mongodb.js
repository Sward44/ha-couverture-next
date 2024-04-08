use("ha-couverture");

db.pages
  .find({})
  .exec()
  .then((data) => {
    console.log(data);
  });
