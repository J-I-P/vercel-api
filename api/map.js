
// export default function handler(req, res) {
// 	const apiKey = process.env.GOOGLE_MAPS_API_KEY; // 獲取環境變量
// 	res.status(200).json({ apiKey }); // 返回 API Key
//   }


// api/google-maps-proxy.js
import axios from 'axios';

export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
//   const { endpoint, params } = req.query;

//   if (!endpoint) {
//     return res.status(400).json({ error: 'No endpoint specified' });
//   }

//   try {
//     const response = await axios.get(`https://maps.googleapis.com/maps/api/${endpoint}/json`, {
//       params: {
//         ...params,
//         key: apiKey
//       }
//     });

//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: 'Error calling Google Maps API' });
//   }

const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and Longitude are required' });
  }

  const endpoint = `https://maps.googleapis.com/maps/api/geocode/json`;
  const params = {
    latlng: `${lat},${lng}`,
    key: apiKey
  };

  try {
    // Call Google Maps API using axios
    const response = await axios.get(endpoint, { params });
	console.log(response)
    // Return the response to the client
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error calling Google Maps API', error);
    return res.status(500).json({ error: 'Error calling Google Maps API' });
  }
}

