// "use server";
// import axios from 'axios';

// export default async function handler(req, res) {
//   const placeId = process.env.PLACE_API_KEY;
//   const apiKey = process.env.MAPS_API_KEY;

//   try {
//     const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
//       params: {
//         place_id: placeId,
//         fields: 'rating,reviews',
//         language: 'fr',
//         key: apiKey,
//       },
//     });

//     const data = response.data.result;
//     console.log(data);

//     if (!data.reviews) {
//       return res.status(404).json({ message: 'No reviews found' });
//     }

//     const formattedReviews = data.reviews.map((review) => ({
//       id: review.author_url,
//       firstName: review.author_name.split(' ')[0],
//       lastName: review.author_name.split(' ').slice(1).join(' '),
//       adresse: data.formatted_address,
//       title: data.name,
//       description: review.text,
//       note: review.rating,
//       date: review.relative_time_description,
//     }));

//     res.status(200).json({ reviews: formattedReviews });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// }

// https://maps.googleapis.com/maps/api/place/details/json?fields=rating,reviews,url&language=fr_FR&place_id=ChIJr2EAtvaVBUgRJw08MQPFFwY&key=AIzaSyDb4UTocr3UMQCbvHev1NHX7LiZT5ZZ-p4