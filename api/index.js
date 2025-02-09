require('dotenv').config();
const axios = require('axios');

async function checkChatGPT() {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-4",
        messages: [{ role: "system", content: "Check on project status." }]
    }, {
        headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` }
    });

    return response.data.choices[0].message.content;
}

module.exports = async (req, res) => {
    const status = await checkChatGPT();
    res.json({ message: status });
};