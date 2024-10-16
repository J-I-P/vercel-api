
export default function handler(req, res) {
	const apiKey = process.env.GOOGLE_MAPS_API_KEY; // 獲取環境變量
	res.status(200).json({ apiKey }); // 返回 API Key
  }
  