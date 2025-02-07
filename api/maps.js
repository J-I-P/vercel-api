// import axios from 'axios';

// export default async function handler(req, res) {
// 	console.log("API: ", process.env.GOOGLE_MAPS_API_KEY)
//   try {
//     const response = await axios.get('https://www.google.com/maps/embed/v1/place?'+process.env.GOOGLE_MAPS_API_KEY+'&q=Space+Needle,Seattle+WA');
// 	console.log(response)
	
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error calling Google Maps API' });
//   }
// }

export default async function handler(req, res) {

	res.setHeader('Access-Control-Allow-Origin', '*'); // 允許所有來源
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  // 生成嵌入地圖的 URL
  console.log(location)
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(location)}`;

  // 回傳嵌入地圖的 URL 給前端
  return res.status(200).json({ embedUrl });
}

