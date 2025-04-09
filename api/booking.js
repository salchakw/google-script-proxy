export default async function handler(req, res) {
  const targetUrl = req.query.url;

  // Ответ на OPTIONS-запрос (Preflight запрос)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (!targetUrl) {
    return res.status(400).json({ success: false, message: 'Missing Google Script URL' });
  }

  try {
    const googleRes = await fetch(targetUrl, {
      method: req.method,  // Используем метод запроса, пришедший на сервер (GET или POST)
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined, // Отправляем тело запроса только для POST
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
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type
