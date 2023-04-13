const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_SECRET_KEY,
});

const openAi = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).send('메세지를 입력해주세요');
  console.log(message);
  const response = await openAi.createCompletion({
    model: 'text-davinci-003',
    prompt: `${message}`,
    max_tokens: 4000,
    temperature: 0,
  });

  res.status(200).send(response);
};
