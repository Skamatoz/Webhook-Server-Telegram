import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_BOT_TOKEN = '';
const TELEGRAM_CHAT_ID = '';

app.use(express.json());

app.post('/webhook', async (req, res) => {
    try {
        const data = req.body;
        const message = JSON.stringify(data, null, 2);

        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message
            })
        });

        if (!response.ok) {
            throw new Error(`Ошибка при отправке в Telegram: ${response.statusText}`);
        }

        res.status(200).send('Сообщение отправлено в Telegram');
    } catch (error) {
        console.error('Ошибка обработки веб-хука:', error);
        res.status(500).send('Ошибка сервера');
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
