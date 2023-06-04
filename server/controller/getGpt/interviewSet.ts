import { Response, Request } from 'express';

const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_SECRET_KEY,
});

const openAi = new OpenAIApi(configuration);

const getAiInterview = (stack: string) => {
  return openAi.createCompletion({
    model: 'text-davinci-003',
    prompt: `면접자와의 인터뷰를 위해 ${stack}를 사용하는 기업에서 나올 수 있는 기술 면접 1가지를 면접관 입장에서 질문해주세요.
    질문에 끝맺음은 '설명해주세요.'로 끝내주세요.`,

    // messages: [{ role: 'user', content: `${question}` }],
    max_tokens: 200,
    // 다음 단어의 예측 불확실성을 제어하는 옵션임. 값이 높을수록 모델은 예측을 더 불확실한 방향으로 수행함.
    temperature: 0.5,
    // 모델이 생성할 수 있는 다음 단어 후보를 제한하는 옵션. 0.9라면 다음 단어 후보중에서 확률 분포의 상위 90%에 해당 하는 단어만 고려함.
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
};

const interviewSet = async (req: Request, res: Response) => {
  let stacks = req.query.stacks;
  stacks = stacks?.toString();
  if (!stacks) return res.status(400).send('메세지를 입력해주세요');

  let stacksArr = stacks.split(',');

  // 질문은 최소 5가지 이상 나오도록 설정
  if (stacksArr.length < 5) {
    const leng = stacksArr.length;
    for (let i = leng; i < 5; i++) {
      let randomIdx = Math.floor(Math.random() * leng);
      stacksArr.push(stacksArr[randomIdx]);
    }
  }

  try {
    const responses = await Promise.all(
      stacksArr.map((stack: string) => {
        return getAiInterview(stack);
      })
    );

    const interviewDataFilter = responses.map((data) => {
      return data.data.choices[0].text
        .split(/[\n!@#$%^&*(),.?":{}|<>]/)
        .join('');
    });

    res.json(interviewDataFilter);
  } catch (e) {
    res.status(500).send(`서버 에러`);
  }

  // 빈 항목은 제외 시킴
};

export default interviewSet;
