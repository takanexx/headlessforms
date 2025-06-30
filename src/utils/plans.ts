export const plans = [
  {
    name: 'free',
    formLimit: 3,
    answerLimit: 100,
  },
  {
    name: 'pro',
    formLimit: 10,
    answerLimit: 1000,
  },
  {
    name: 'business',
    formLimit: Infinity,
    answerLimit: Infinity,
  },
];

export const getPlanFormLimit = (plan?: string) => {
  const planData = plans.find(p => p.name === plan);
  // planが未指定の場合は、plansの最初の要素(free)を取得
  return planData ? planData.formLimit : plans[0].formLimit;
};


export const getPlanAnswerLimit = (plan?: string) => {
  const planData = plans.find(p => p.name === plan);
  // planが未指定の場合は、plansの最初の要素(free)を取得
  return planData ? planData.answerLimit : plans[0].answerLimit;
};