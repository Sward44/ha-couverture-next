

use("ha-couverture");
db.blogs.aggregate(
{
  $addFields :{
    createdAt: {$toDate : ObjectId('66f1836a22d9c0b457b6263f')},
    updatedAt : {$toDate : ObjectId('66f1836a22d9c0b457b6263f')}}
}
)

// db.addresses.find({_id : ObjectId('66e983e3dafc013448178a75')},{},{returnOriginal:false})

// db.createCollection("avisClient");
// const date = new Date(1694672308 * 1000).toISOString();
// console.log(date);


// db.avisClient.insertOne({
//   userId : new ObjectId("65ef5a9120fb6381b2e95871"),
//   title : "Remplacement ardoises",
//   description : "Une intervention très rapide ! Nous avions des trous dans la toiture suite à un nid de frelons asiatiques, ils avaient déplacé et grignote des ardoises ! Pas de soucis, le problème est réglé. Merci",
//   note : 5,
//   date_review : new Date(1701203410 * 1000).toISOString(), 
// });

//  db.marketing.insertMany([]);
