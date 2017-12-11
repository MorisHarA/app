/** *******  questionnairedetail  ******** */
export const questionnairedetail = {
  data: [
    {
      id: '1',
      name: '吃饭调查问卷',
      sheetcount: 20,
      questions: [
        {
          qid: '1',
          type: 'single_choice',
          text: '医院的饭好不好吃',
          options: [
            {
              text: '好吃',
              sheetcount: 0,
              reaction: {
                questions: [
                  {
                    qid: '11',
                    type: 'single_choice',
                    text: '平时吃什么',
                    options: [
                      {
                        text: '吃饭',
                        sheetcount: 0,
                        reaction: {
                          questions: [

                          ],
                        },
                      },
                      {
                        text: '吃鸡',
                        sheetcount: 20,
                        reaction: {
                          questions: [

                          ],
                        },
                      },
                    ],
                  },
                  {
                    qid: '12',
                    type: 'multi_choice',
                    text: '一般什么时候吃饭',
                    options: [
                      {
                        text: '中午十二点',
                        sheetcount: 18,
                        reaction: {
                          questions: [
                            {
                              qid: '121',
                              type: 'single_choice',
                              text: '十二点吃饭迟不迟',
                              options: [
                                {
                                  text: '迟了',
                                  sheetcount: 0,
                                  reaction: {
                                    questions: [
                                      {
                                        qid: '1211',
                                        type: 'single_choice',
                                        text: '你建议的吃饭时间是几点',
                                        options: [
                                          {
                                            text: '十点',
                                            sheetcount: 0,
                                            reaction: {
                                              questions: [

                                              ],
                                            },
                                          },
                                          {
                                            text: '十一点',
                                            sheetcount: 20,
                                            reaction: {
                                              questions: [

                                              ],
                                            },
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                },
                                {
                                  text: '不迟',
                                  sheetcount: 20,
                                  reaction: {
                                    questions: [

                                    ],
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      },
                      {
                        text: '晚上七点',
                        sheetcount: 2,
                        reaction: {
                          questions: [

                          ],
                        },
                      },
                    ],
                  },
                  {
                    qid: '13',
                    type: 'text_input',
                    text: '把你们吃的写下来',
                  },
                ],
              },
            },
            {
              text: '不好吃',
              sheetcount: 20,
              reaction: {
                questions: [

                ],
              },
            },
          ],
        },
      ],
    },
    {
      name: '医生调查问卷',
      id: '2',
      sheetcount: 10,
      questions: [
        {
          qid: '2',
          type: 'single_choice',
          text: '医生人怎样',
          options: [
            {
              text: '挺好的',
              sheetcount: 10,
              reaction: {
                questions: [
                  {
                    qid: '21',
                    type: 'single_choice',
                    text: '好在哪里',
                    options: [
                      {
                        text: '态度好',
                        sheetcount: 5,
                        reaction: {
                          questions: [

                          ],
                        },
                      },
                      {
                        text: '不收钱',
                        sheetcount: 5,
                        reaction: {
                          questions: [

                          ],
                        },
                      },
                    ],
                  },
                  {
                    qid: '22',
                    type: 'multi_choice',
                    text: '如果给医生打分你会给多少分呢',
                    options: [
                      {
                        text: '十分',
                        sheetcount: 8,
                        reaction: {
                          questions: [
                            {
                              qid: '221',
                              type: 'single_choice',
                              text: '那么你会给你十分的医生塞钱吗',
                              options: [
                                {
                                  text: '会',
                                  sheetcount: 0,
                                  reaction: {
                                    questions: [
                                      {
                                        qid: '2211',
                                        type: 'single_choice',
                                        text: '塞多少钱',
                                        options: [
                                          {
                                            text: '十万',
                                            sheetcount: 4,
                                            reaction: {
                                              questions: [

                                              ],
                                            },
                                          },
                                          {
                                            text: '十块',
                                            sheetcount: 6,
                                            reaction: {
                                              questions: [

                                              ],
                                            },
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                },
                                {
                                  text: '不会',
                                  sheetcount: 10,
                                  reaction: {
                                    questions: [

                                    ],
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      },
                      {
                        text: '五分',
                        sheetcount: 2,
                        reaction: {
                          questions: [

                          ],
                        },
                      },
                    ],
                  },
                  {
                    qid: '23',
                    type: 'text_input',
                    text: '具体说说好在哪里',
                  },
                ],
              },
            },
            {
              text: '不好',
              sheetcount: 0,
              reaction: {
                questions: [

                ],
              },
            },
          ],
        },
      ],
    },
  ],
};


export const answerdetailAll = {
  data: [
    {
      hopsital: {
        name: '大华医院',
      },
      region: '一区',
      division: {
        name: '肺科',
      },
      reference: {
        name: 'xxx',
        type: 'xxx',
      },
      createtime: '2016-05-06',
      answers: [
        {
          question: {
            qid: '1',
            type: 'single_choice', // 表明是一个单选题
            text: '医院的饭好不好吃？',
            options: [
              {
                text: '好吃',
              },
              {
                text: '不好吃',
              },
            ],
          },
          type: 'single_choice', // 表明是一个单选题的答案
          option: { // 如果是单选题 会有这个字段表示
            index: 0,
            subitems: [ // 这个配置当前的问卷
              {
                question: {
                  qid: '12',
                  type: 'multi_choice', // 表明是一个多选题的答案
                  text: '一般什么时候吃饭？',
                  options: [
                    {
                      text: '中午十二点',
                    },
                    {
                      text: '晚上七点',
                    },
                  ],
                },
                type: 'multi_choice', // 表明是一个多选题
                options: [  // 如果是多选题 会有这个字段表示
                  {
                    index: 0,
                    subitems: [
                      {
                        question: {
                          qid: '121',
                          type: 'single_choice', // 表明是一个多选题的答案
                          text: '十二点吃饭迟不迟？',
                          options: [
                            {
                              text: '迟了',
                            },
                            {
                              text: '不迟',
                            },
                          ],
                        },
                        type: 'single_choice', // 表明是一个多选题
                        option: {   // 如果是多选题 会有这个字段表示
                          index: 0,
                          subitems: [
                            {
                              question: {
                                qid: '1211',
                                type: 'single_choice', // 表明是一个多选题的答案
                                text: '你建议的吃饭时间是几点？',
                                options: [
                                  {
                                    text: '十点',
                                  },
                                  {
                                    text: '十一点',
                                  },
                                ],
                              },
                              type: 'single_choice', // 表明是一个多选题
                              option: {   // 如果是多选题 会有这个字段表示
                                index: 1,
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                  {
                    index: 2,
                  },
                ],
              },
              {
                question: {
                  qid: '11',
                  type: 'single_choice', // 表明是一个多选题的答案
                  text: '平时吃什么？',
                  options: [
                    {
                      text: '吃饭',
                    },
                    {
                      text: '吃鸡',
                    },
                  ],
                },
                type: 'single_choice', // 表明是一个多选题
                option: {   // 如果是多选题 会有这个字段表示
                  index: 1,
                },
              },
              {
                question: {
                  qid: '13',
                  type: 'text_input', // 表明是一个文字输入题
                  text: '把你们吃的写下来',
                },
                type: 'text_input', // 表明是一个文字输入题的答案
                text: '鸡蛋 牛奶 面包', // 如果是文字输入题
              },
            ],
          },
        },
        {
          question: {
            qid: '2',
            type: 'single_choice', // 表明是一个单选题
            text: '医生人怎样？',
            options: [
              {
                text: '挺好的',
              },
              {
                text: '不好',
              },
            ],
          },
          type: 'single_choice', // 表明是一个单选题的答案
          option: { // 如果是单选题 会有这个字段表示
            index: 0,
            subitems: [ // 这个配置当前的问卷
              {
                question: {
                  qid: '22',
                  type: 'multi_choice', // 表明是一个多选题的答案
                  text: '如果给医生打分你会给多少分呢？',
                  options: [
                    {
                      text: '十分',
                    },
                    {
                      text: '五分',
                    },
                  ],
                },
                type: 'multi_choice', // 表明是一个多选题
                options: [  // 如果是多选题 会有这个字段表示
                  {
                    index: 0,
                    subitems: [
                      {
                        question: {
                          qid: '221',
                          type: 'single_choice', // 表明是一个多选题的答案
                          text: '那么你会给你十分的医生塞钱吗？',
                          options: [
                            {
                              text: '会',
                            },
                            {
                              text: '不会',
                            },
                          ],
                        },
                        type: 'single_choice', // 表明是一个多选题
                        option: {   // 如果是多选题 会有这个字段表示
                          index: 0,
                          subitems: [
                            {
                              question: {
                                qid: '2211',
                                type: 'single_choice', // 表明是一个多选题的答案
                                text: '塞多少？',
                                options: [
                                  {
                                    text: '十万',
                                  },
                                  {
                                    text: '十块',
                                  },
                                ],
                              },
                              type: 'single_choice', // 表明是一个多选题
                              option: {   // 如果是多选题 会有这个字段表示
                                index: 1,
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                  {
                    index: 2,
                  },
                ],
              },
              {
                question: {
                  qid: '21',
                  type: 'single_choice', // 表明是一个多选题的答案
                  text: '好在哪里？',
                  options: [
                    {
                      text: '态度好',
                    },
                    {
                      text: '不收钱',
                    },
                  ],
                },
                type: 'single_choice', // 表明是一个多选题
                option: {   // 如果是多选题 会有这个字段表示
                  index: 1,
                },
              },
              {
                question: {
                  qid: '23',
                  type: 'text_input', // 表明是一个文字输入题
                  text: '具体说说好在哪里',
                },
                type: 'text_input', // 表明是一个文字输入题的答案
                text: '态度特别好，对患者关爱有加', // 如果是文字输入题
              },
            ],
          },
        },
      ],
    },
    {
      hopsital: {
        name: '大华医院',
      },
      region: '二区',
      division: {
        name: '肺科',
      },
      reference: {
        name: 'xxx',
        type: 'xxx',
      },
      createtime: '2016-05-06',
      answers: [
        {
          question: {
            qid: '1',
            type: 'single_choice', // 表明是一个单选题
            text: '医院的饭好不好吃？',
            options: [
              {
                text: '好吃',
              },
              {
                text: '不好吃',
              },
            ],
          },
          type: 'single_choice', // 表明是一个单选题的答案
          option: { // 如果是单选题 会有这个字段表示
            index: 0,
            subitems: [ // 这个配置当前的问卷
              {
                question: {
                  qid: '12',
                  type: 'multi_choice', // 表明是一个多选题的答案
                  text: '一般什么时候吃饭？',
                  options: [
                    {
                      text: '中午十二点',
                    },
                    {
                      text: '晚上七点',
                    },
                  ],
                },
                type: 'multi_choice', // 表明是一个多选题
                options: [  // 如果是多选题 会有这个字段表示
                  {
                    index: 0,
                    subitems: [
                      {
                        question: {
                          qid: '121',
                          type: 'single_choice', // 表明是一个多选题的答案
                          text: '十二点吃饭迟不迟？',
                          options: [
                            {
                              text: '迟了',
                            },
                            {
                              text: '不迟',
                            },
                          ],
                        },
                        type: 'single_choice', // 表明是一个多选题
                        option: {   // 如果是多选题 会有这个字段表示
                          index: 0,
                          subitems: [
                            {
                              question: {
                                qid: '1211',
                                type: 'single_choice', // 表明是一个多选题的答案
                                text: '你建议的吃饭时间是几点？',
                                options: [
                                  {
                                    text: '十点',
                                  },
                                  {
                                    text: '十一点',
                                  },
                                ],
                              },
                              type: 'single_choice', // 表明是一个多选题
                              option: {   // 如果是多选题 会有这个字段表示
                                index: 1,
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                  {
                    index: 2,
                  },
                ],
              },
              {
                question: {
                  qid: '11',
                  type: 'single_choice', // 表明是一个多选题的答案
                  text: '平时吃什么？',
                  options: [
                    {
                      text: '吃饭',
                    },
                    {
                      text: '吃鸡',
                    },
                  ],
                },
                type: 'single_choice', // 表明是一个多选题
                option: {   // 如果是多选题 会有这个字段表示
                  index: 1,
                },
              },
              {
                question: {
                  qid: '13',
                  type: 'text_input', // 表明是一个文字输入题
                  text: '把你们吃的写下来',
                },
                type: 'text_input', // 表明是一个文字输入题的答案
                text: '鸡蛋 牛奶 面包', // 如果是文字输入题
              },
            ],
          },
        },
        {
          question: {
            qid: '2',
            type: 'single_choice', // 表明是一个单选题
            text: '医生人怎样？',
            options: [
              {
                text: '挺好的',
              },
              {
                text: '不好',
              },
            ],
          },
          type: 'single_choice', // 表明是一个单选题的答案
          option: { // 如果是单选题 会有这个字段表示
            index: 0,
            subitems: [ // 这个配置当前的问卷
              {
                question: {
                  qid: '22',
                  type: 'multi_choice', // 表明是一个多选题的答案
                  text: '如果给医生打分你会给多少分呢？',
                  options: [
                    {
                      text: '十分',
                    },
                    {
                      text: '五分',
                    },
                  ],
                },
                type: 'multi_choice', // 表明是一个多选题
                options: [  // 如果是多选题 会有这个字段表示
                  {
                    index: 0,
                    subitems: [
                      {
                        question: {
                          qid: '221',
                          type: 'single_choice', // 表明是一个多选题的答案
                          text: '那么你会给你十分的医生塞钱吗？',
                          options: [
                            {
                              text: '会',
                            },
                            {
                              text: '不会',
                            },
                          ],
                        },
                        type: 'single_choice', // 表明是一个多选题
                        option: {   // 如果是多选题 会有这个字段表示
                          index: 0,
                          subitems: [
                            {
                              question: {
                                qid: '2211',
                                type: 'single_choice', // 表明是一个多选题的答案
                                text: '塞多少？',
                                options: [
                                  {
                                    text: '十万',
                                  },
                                  {
                                    text: '十块',
                                  },
                                ],
                              },
                              type: 'single_choice', // 表明是一个多选题
                              option: {   // 如果是多选题 会有这个字段表示
                                index: 0,
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                  {
                    index: 2,
                  },
                ],
              },
              {
                question: {
                  qid: '21',
                  type: 'single_choice', // 表明是一个多选题的答案
                  text: '好在哪里？',
                  options: [
                    {
                      text: '态度好',
                    },
                    {
                      text: '不收钱',
                    },
                  ],
                },
                type: 'single_choice', // 表明是一个多选题
                option: {   // 如果是多选题 会有这个字段表示
                  index: 1,
                },
              },
              {
                question: {
                  qid: '23',
                  type: 'text_input', // 表明是一个文字输入题
                  text: '具体说说好在哪里',
                },
                type: 'text_input', // 表明是一个文字输入题的答案
                text: '态度特别好，对患者关爱有加', // 如果是文字输入题
              },
            ],
          },
        },
      ],
    },
  ],
};


export const chartData = {
  data: [
    { starttime: '2016-06-10T00:00:00+08:00', endtime: '2016-06-10T01:00:00+08:00', count: 12, dispose: { sendcount: 6 } },
    { starttime: '2016-06-10T01:00:00+08:00', endtime: '2016-06-10T02:00:00+08:00', count: 42, dispose: { sendcount: 4 } },
    { starttime: '2016-06-10T02:00:00+08:00', endtime: '2016-06-10T03:00:00+08:00', count: 43, dispose: { sendcount: 5 } },
    { starttime: '2016-06-10T03:00:00+08:00', endtime: '2016-06-10T04:00:00+08:00', count: 64, dispose: { sendcount: 6 } },
    { starttime: '2016-06-10T04:00:00+08:00', endtime: '2016-06-10T05:00:00+08:00', count: 32, dispose: { sendcount: 7 } },
    { starttime: '2016-06-10T05:00:00+08:00', endtime: '2016-06-10T06:00:00+08:00', count: 34, dispose: { sendcount: 8 } },
    { starttime: '2016-06-10T06:00:00+08:00', endtime: '2016-06-10T07:00:00+08:00', count: 54, dispose: { sendcount: 2 } },
    { starttime: '2016-06-10T07:00:00+08:00', endtime: '2016-06-10T08:00:00+08:00', count: 4, dispose: { sendcount: 4 } },
    { starttime: '2016-06-10T08:00:00+08:00', endtime: '2016-06-10T09:00:00+08:00', count: 0, dispose: { sendcount: 2 } },
    { starttime: '2016-06-10T09:00:00+08:00', endtime: '2016-06-10T10:00:00+08:00', count: 23, dispose: { sendcount: 4 } },
    { starttime: '2016-06-10T10:00:00+08:00', endtime: '2016-06-10T11:00:00+08:00', count: 43, dispose: { sendcount: 5 } },
    { starttime: '2016-06-10T11:00:00+08:00', endtime: '2016-06-10T12:00:00+08:00', count: 53, dispose: { sendcount: 6 } },
    { starttime: '2016-06-10T12:00:00+08:00', endtime: '2016-06-10T13:00:00+08:00', count: 53, dispose: { sendcount: 7 } },
    { starttime: '2016-06-10T13:00:00+08:00', endtime: '2016-06-10T14:00:00+08:00', count: 1, dispose: { sendcount: 80 } },
    { starttime: '2016-06-10T14:00:00+08:00', endtime: '2016-06-10T15:00:00+08:00', count: 54, dispose: { sendcount: 0 } },
    { starttime: '2016-06-10T15:00:00+08:00', endtime: '2016-06-10T16:00:00+08:00', count: 0, dispose: { sendcount: 10 } },
    { starttime: '2016-06-10T16:00:00+08:00', endtime: '2016-06-10T17:00:00+08:00', count: 65, dispose: { sendcount: 20 } },
    { starttime: '2016-06-10T17:00:00+08:00', endtime: '2016-06-10T18:00:00+08:00', count: 75, dispose: { sendcount: 30 } },
    { starttime: '2016-06-10T18:00:00+08:00', endtime: '2016-06-10T19:00:00+08:00', count: 0, dispose: { sendcount: 50 } },
    { starttime: '2016-06-10T19:00:00+08:00', endtime: '2016-06-10T20:00:00+08:00', count: 32, dispose: { sendcount: 6 } },
    { starttime: '2016-06-10T20:00:00+08:00', endtime: '2016-06-10T21:00:00+08:00', count: 1, dispose: { sendcount: 6 } },
    { starttime: '2016-06-10T21:00:00+08:00', endtime: '2016-06-10T22:00:00+08:00', count: 42, dispose: { sendcount: 43 } },
    { starttime: '2016-06-10T22:00:00+08:00', endtime: '2016-06-10T23:00:00+08:00', count: 0, dispose: { sendcount: 2 } },
    { starttime: '2016-06-10T23:00:00+08:00', endtime: '2016-06-11T00:00:00+08:00', count: 12, dispose: { sendcount: 0 } }],
};


export const commentChartData = [
  {
    starttime: '2017-07-18T16:00:00.000Z',
    endtime: '2017-07-19T15:59:59.999Z',
    count: 150,
    good_count: 130,
    bad_count: 20,
    points: [
      {
        name: 'general',
        sum_score: '4.5',
        scores: [
          {
            star4_5: '130',
          },
          {
            star3: '15',
          },
          {
            star1_2: '5',
          },
        ],
      },
    ],
    dispose: {
      count: 20,
      gt12h_count: 5,
      lt12h_count: 5,
      gt72h_count: 10,
    },
  },
  {
    starttime: '2017-07-19T16:00:00.000Z',
    endtime: '2017-07-20T15:59:59.999Z',
    count: 100,
    good_count: 50,
    bad_count: 50,
    points: [
      {
        name: 'general',
        sum_score: '4.0',
        scores: [
          {
            star4_5: '50',
          },
          {
            star3: '44',
          },
          {
            star1_2: '6',
          },
        ],
      },
    ],
    dispose: {
      count: 50,
      gt12h_count: 15,
      lt12h_count: 20,
      gt72h_count: 15,
    },
  },
  {
    starttime: '2017-07-20T16:00:00.000Z',
    endtime: '2017-07-21T15:59:59.999Z',
    count: 40,
    good_count: 20,
    bad_count: 20,
    points: [
      {
        name: 'general',
        sum_score: '3.5',
        scores: [
          {
            star4_5: '20',
          },
          {
            star3: '15',
          },
          {
            star1_2: '5',
          },
        ],
      },
    ],
    dispose: {
      count: 20,
      gt12h_count: 5,
      lt12h_count: 5,
      gt72h_count: 10,
    },
  },
  {
    starttime: '2017-07-21T16:00:00.000Z',
    endtime: '2017-07-22T15:59:59.999Z',
    count: 80,
    good_count: 40,
    bad_count: 30,
    points: [
      {
        name: 'general',
        sum_score: '4.0',
        scores: [
          {
            star4_5: '20',
          },
          {
            star3: '5',
          },
          {
            star1_2: '5',
          },
        ],
      },
    ],
    dispose: {
      count: 30,
      gt12h_count: 15,
      lt12h_count: 10,
      gt72h_count: 5,
    },
  },
  {
    starttime: '2017-07-22T16:00:00.000Z',
    endtime: '2017-07-23T15:59:59.999Z',
    count: 50,
    good_count: 25,
    bad_count: 25,
    points: [
      {
        name: 'general',
        sum_score: '4.5',
        scores: [
          {
            star4_5: '25',
          },
          {
            star3: '15',
          },
          {
            star1_2: '10',
          },
        ],
      },
    ],
    dispose: {
      count: 25,
      gt12h_count: 0,
      lt12h_count: 10,
      gt72h_count: 15,
    },
  },
  {
    starttime: '2017-07-23T16:00:00.000Z',
    endtime: '2017-07-24T15:59:59.999Z',
    count: 100,
    good_count: 60,
    bad_count: 40,
    points: [
      {
        name: 'general',
        sum_score: '4.5',
        scores: [
          {
            star4_5: '60',
          },
          {
            star3: '15',
          },
          {
            star1_2: '25',
          },
        ],
      },
    ],
    dispose: {
      count: 40,
      gt12h_count: 15,
      lt12h_count: 10,
      gt72h_count: 15,
    },
  },
  {
    starttime: '2017-07-24T16:00:00.000Z',
    endtime: '2017-07-25T15:59:59.999Z',
    count: 40,
    good_count: 20,
    bad_count: 20,
    points: [
      {
        name: 'general',
        sum_score: '3.5',
        scores: [
          {
            star4_5: '20',
          },
          {
            star3: '15',
          },
          {
            star1_2: '5',
          },
        ],
      },
    ],
    dispose: {
      count: 20,
      gt12h_count: 5,
      lt12h_count: 5,
      gt72h_count: 10,
    },
  },
  {
    starttime: '2017-07-25T16:00:00.000Z',
    endtime: '2017-07-26T15:59:59.999Z',
    count: 70,
    good_count: 40,
    bad_count: 30,
    points: [
      {
        name: 'general',
        sum_score: '4.0',
        scores: [
          {
            star4_5: '30',
          },
          {
            star3: '15',
          },
          {
            star1_2: '5',
          },
        ],
      },
    ],
    dispose: {
      count: 30,
      gt12h_count: 15,
      lt12h_count: 0,
      gt72h_count: 15,
    },
  },
  {
    starttime: '2017-07-26T16:00:00.000Z',
    endtime: '2017-07-27T15:59:59.999Z',
    count: 50,
    good_count: 30,
    bad_count: 20,
    points: [
      {
        name: 'general',
        sum_score: '4.5',
        scores: [
          {
            star4_5: '30',
          },
          {
            star3: '15',
          },
          {
            star1_2: '5',
          },
        ],
      },
    ],
    dispose: {
      count: 30,
      gt12h_count: 5,
      lt12h_count: 10,
      gt72h_count: 15,
    },
  },
  {
    starttime: '2017-07-27T16:00:00.000Z',
    endtime: '2017-07-28T15:59:59.999Z',
    count: 100,
    good_count: 60,
    bad_count: 40,
    points: [
      {
        name: 'general',
        sum_score: '4.5',
        scores: [
          {
            star4_5: '60',
          },
          {
            star3: '15',
          },
          {
            star1_2: '25',
          },
        ],
      },
    ],
    dispose: {
      count: 40,
      gt12h_count: 15,
      lt12h_count: 10,
      gt72h_count: 15,
    },
  },
  {
    starttime: '2017-07-28T16:00:00.000Z',
    endtime: '2017-07-29T15:59:59.999Z',
    count: 40,
    good_count: 20,
    bad_count: 20,
    points: [
      {
        name: 'general',
        sum_score: '3.5',
        scores: [
          {
            star4_5: '20',
          },
          {
            star3: '15',
          },
          {
            star1_2: '5',
          },
        ],
      },
    ],
    dispose: {
      count: 20,
      gt12h_count: 5,
      lt12h_count: 5,
      gt72h_count: 10,
    },
  },
  {
    starttime: '2017-07-29T16:00:00.000Z',
    endtime: '2017-07-30T15:59:59.999Z',
    count: 70,
    good_count: 40,
    bad_count: 30,
    points: [
      {
        name: 'general',
        sum_score: '4.0',
        scores: [
          {
            star4_5: '30',
          },
          {
            star3: '15',
          },
          {
            star1_2: '5',
          },
        ],
      },
    ],
    dispose: {
      count: 30,
      gt12h_count: 15,
      lt12h_count: 0,
      gt72h_count: 15,
    },
  },
];
