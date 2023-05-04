import { Response, Request } from 'express';

const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_SECRET_KEY,
});

const openAi = new OpenAIApi(configuration);

const editAnswer = async (req: Request, res: Response) => {
  const { question, answer } = req.body.data;

  try {
    const response = await openAi.createCompletion({
      model: 'text-davinci-003',
      prompt: `저는 매우 지능적인 질문 답변 로봇입니다. 만약 사용자가 기술 면접에서 ${question}에 대해 ${answer}이라고 답했다면,
      해당 질문에 대한 답변 및 추가 설명을 해주세요.
      단, max_tokens가 1000이 넘지 않게 해주세요`,
      // messages: [{ role: 'user', content: `${question}` }],
      max_tokens: 1000,
      // 다음 단어의 예측 불확실성을 제어하는 옵션임. 값이 높을수록 모델은 예측을 더 불확실한 방향으로 수행함.
      temperature: 0.2,
      // 모델이 생성할 수 있는 다음 단어 후보를 제한하는 옵션. 0.9라면 다음 단어 후보중에서 확률 분포의 상위 90%에 해당 하는 단어만 고려함.
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const data = response.data.choices[0].text
      .split('\n')
      .filter((collect: string) => collect.length > 3);

    const responseAllData = {
      question,
      userAnswer: answer,
      aiAnswer: data[0],
    };

    res.json([responseAllData]);
  } catch (e) {
    res.status(500).send('서버 에러');
  }
};

export default editAnswer;
