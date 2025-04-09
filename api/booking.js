export default async function handler(req, res) {
  const targetUrl = req.query.url;
  
  if (!targetUrl) {
    return res.status(400).json({ success: false, message: 'Missing Google Script URL' });
  }

  try {
    const googleRes = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await googleRes.json();
    
    console.log("Ответ от Google Apps Script:", data); // Логирование ответа

    // Устанавливаем CORS-заголовки
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json(data);

  } catch (error) {
    console.error("Ошибка при запросе к Google Apps Script:", error); // Логирование ошибки
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    return res.status(500).json({ success: false, message: error.message });
  }
}
