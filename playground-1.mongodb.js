

use("ha-couverture");
db.addresses.findOneAndUpdate({_id : ObjectId('66e983e3dafc013448178a75')},
{
  $set:{
    devisId : ObjectId('66e93f8a76af05c1728b4d1d')
  }
}
,{
  upsert : true,
  returnOriginal: 'after'
})

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
