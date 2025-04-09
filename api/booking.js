export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ success: false, message: 'Missing Google Script URL' });
  }

  if (req.method === 'POST') {
    // Обработка POST запроса
    try {
      const googleRes = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body), // Передаем тело запроса
      });

      const data = await googleRes.json();
      console.log("Ответ от Google Apps Script:", data);

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      return res.status(200).json(data);
    } catch (error) {
      console.error("Ошибка при запросе к Google Apps Script:", error);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === 'GET') {
    // Обработка GET запроса
    try {
      const googleRes = await fetch(targetUrl, {
        method: 'GET', // Для GET запроса
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await googleRes.json();
      console.log("Ответ от Google Apps Script:", data);

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      return res.status(200).json(data);
    } catch (error) {
      console.error("Ошибка при запросе к Google Apps Script:", error);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Если метод не GET и не POST, возвращаем ошибку
  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
