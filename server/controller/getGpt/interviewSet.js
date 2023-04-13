const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_SECRET_KEY,
});

const openAi = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).send('메세지를 입력해주세요');
  const response = await openAi.createCompletion({
    model: 'text-davinci-003',
    prompt: `${question}`,
    max_tokens: 4000,
    temperature: 0,
  });

  // 빈 항목은 제외 시킴
  const data = response.data.choices[0].text
    .split('\n')
    .filter((question) => question.length > 3)
    .map((question) => question.slice(3));
  res.json(data);
};
