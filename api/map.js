// api/google-maps-proxy.js


// export default async function handler(req, res) {
//   const apiKey = process.env.GOOGLE_MAPS_API_KEY;
// const { lat, lng } = req.query;

//   if (!lat || !lng) {
//     return res.status(400).json({ error: 'Latitude and Longitude are required' });
//   }

//   const endpoint = `https://maps.googleapis.com/maps/api/geocode/json`;
//   const params = {
//     latlng: `${lat},${lng}`,
//     key: apiKey
//   };

//   try {
//     // Call Google Maps API using axios
//     const response = await axios.get(endpoint, { params });
// 	console.log(response)
//     // Return the response to the client
//     return res.status(200).json(response.data);
//   } catch (error) {
//     console.error('Error calling Google Maps API', error);
//     return res.status(500).json({ error: 'Error calling Google Maps API' });
//   }
// }





export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and Longitude are required' });
  }

  const endpoint = `https://maps.googleapis.com/maps/api/geocode/json`;
  const params = new URLSearchParams({
    latlng: `${lat},${lng}`,
    key: apiKey,
  });

  try {
    const response = await fetch(`${endpoint}?${params}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error calling Google Maps API', error);
    return res.status(500).json({ error: 'Error calling Google Maps API' });
  }
}
