import { Response, Request } from 'express';

const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_SECRET_KEY,
});

const openAi = new OpenAIApi(configuration);

interface QAType {
  question: string;
  answer: string;
}
const getAiData = (question: string, answer: string) => {
  return openAi.createCompletion({
    model: 'text-davinci-003',
    prompt: `저는 매우 지능적인 질문 답변 로봇입니다. 만약 사용자가 기술 면접에서 ${question}에 대해 ${answer}이라고 답했다면,
    해당 질문에 대한 답변 및 추가 설명을 해주세요.
    단, max_tokens가 500이 넘지 않게 해주세요`,
    // messages: [{ role: 'user', content: `${question}` }],
    max_tokens: 500,
    // 다음 단어의 예측 불확실성을 제어하는 옵션임. 값이 높을수록 모델은 예측을 더 불확실한 방향으로 수행함.
    temperature: 0.2,
    // 모델이 생성할 수 있는 다음 단어 후보를 제한하는 옵션. 0.9라면 다음 단어 후보중에서 확률 분포의 상위 90%에 해당 하는 단어만 고려함.
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
};
const checkAllAnswer = async (req: Request, res: Response) => {
  const { data } = req.body;

  try {
    // openAi.createCompletion은 promise를 반환함.
    // promise All(promise 배열이 들어가야함.)
    const responses = await Promise.all(
      data.map((qa: QAType) => {
        const { question, answer } = qa;
        return getAiData(question, answer);
      })
    );
    const answerDataFilter = responses.map((data) => {
      return data.data.choices[0].text
        .split('\n')
        .filter((x: string) => x.length > 3)
        .join('');
    });

    const responseAllData = data.map((data: QAType, idx: number) => {
      const { question, answer } = data;
      const aiData = answerDataFilter[idx];

      return {
        question,
        userAnswer: answer,
        aiAnswer: aiData,
      };
    });

    res.json(responseAllData);
  } catch (e) {
    console.log(e);
    res.status(500).send('서버 에러');
  }
};

export default checkAllAnswer;
