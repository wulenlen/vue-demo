const mindMap = [
    {
        showMore: true,
        title: '婚姻状况/情感是否破裂',
        num: 1,
        questions: [{
            question: '夫妻感情基础及婚姻现状如何',
            showResult: false,
            answer: 'hhhhh'
        }],
        children: [
            {
                title: '重点听取内容/提问内容',
                questions: [
                    {question: '双方相识相恋经过', showResult: false, answer: '999'},
                    {question: '是否自愿登记结婚', showResult: false, answer: 'uuuuu'},
                    {question: '各自的婚史状况', showResult: false, answer: 'eeeeeee'},
                    {question: '生育子女情况', showResult: false},
                    {question: '夫妻矛盾的现状及起因', showResult: false},
                    {question: '双方是否分居及分居原因', showResult: false},
                    {question: '此前是否提起过离婚诉讼', showResult: false},
                    {question: '诉讼后双方关系有无缓和', showResult: false},
                    {question: '双方有无和好表示', showResult: false},
                ]
            },
            {
                title: '是否为现役军人离婚',
                questions: [
                    {question: '被告是否具备现役军人身份', showResult: false},
                    {question: '现役军人一方对于离婚问题的意见', showResult: false},
                    {question: '现役军人一方是否存在重大过失', showResult: false},
                ]

            },
            {
                title: '特定时期内对离婚诉权的限制',
                questions: [
                    {question: '本次起诉的时间', showResult: false},
                    {question: '男方起诉离婚的案件中，女方是否处于孕期，哺乳期或终止妊娠六个月内情形', showResult: false},
                    {question: '原告前次起诉离婚的情况及前案裁决生效日期', showResult: false}
                ]
            }
        ]

    },
    {
        showMore: true,
        title: '子女抚养情况',
        num: 2,
        children: [
            {
                title: '子女基本情况',
                questions: [
                    {question: '子女姓名', showResult: false},
                    {question: '子女年龄', showResult: false},
                    {question: '子女性别', showResult: false},
                    {question: '子女就学或入托的情况', showResult: false},
                ]
            },
            {
                title: '父母的抚养条件情况',
                questions: [
                    {question: '双方对于抚养问题的意见', showResult: false},
                    {question: '有无其他子女', showResult: false},
                    {question: '文化程度', showResult: false},
                    {question: '工作情况及收入状况', showResult: false},
                    {question: '居住情况', showResult: false}
                ]
            },
            {
                title: '父母与子女关系情况',
                questions: [
                    {question: '子女与父或母的关系是否亲密', showResult: false},
                    {question: '现子女与何方共同生活', showResult: false},
                    {question: '此前一直由何方负责照顾', showResult: false},
                    {question: '子女本人对于抚养问题的意愿', showResult: false}
                ]
            },
        ],
    },
    {
        showMore: true,
        title: '抚养费相关',
        num: 3,
        questions: [
            {question: '子女年龄及日常生活开支情况', showResult: false},
            {question: '父母各自工作、收入状况', showResult: false},
            {question: '有无其他应承担抚养或赡养义务人', showResult: false}
        ]
    },
    {
        showMore: true,
        title: '夫妻共同财产',
        num: 4,
        questions: [{question: '婚后所得财产的范围及类别、财产来源、财产价值', showResult: false}],
        children: [
            {
                title: '共同财产的状况',
                questions: [
                    {question: '财产类型', showResult: false},
                    {question: '财产来源', showResult: false},
                    {question: '财产价值', showResult: false},
                    {question: '实际控制使用情况', showResult: false}
                ]
            },
            {
                title: '影响财产分割的因素',
                questions: [
                    {question: '子女抚养情况', showResult: false},
                    {question: '有无经济困难的情况', showResult: false},
                    {question: '双方经济能力', showResult: false},
                    {question: '一方有无隐藏、转移、变卖夫妻共同财产或伪造债务的情况', showResult: false}
                ]
            },
            {
                title: '共同财产的分割',
                children: [
                    {
                        title: '房屋',
                        children: [
                            {
                                title: '房屋基本情况',
                                questions: [
                                    {question: '具体位置', showResult: false},
                                    {question: '购买时间（婚前或婚后）', showResult: false},
                                    {question: '购买人及约定价款', showResult: false},
                                ],
                                children: [
                                    {
                                        title: '付款方式及房款支付情况',
                                        questions: [
                                            {question: '首付款', showResult: false},
                                            {question: '贷款及偿还数额', showResult: false},
                                            {question: '尚未偿还贷款数额', showResult: false},
                                        ]
                                    }
                                ]
                            },
                            {
                                title: '其他影响房屋权属的确认及分割的因素',
                                questions: [
                                    {question: '房屋实际控制使用情况', showResult: false},
                                    {question: '双方其他住房情况', showResult: false},
                                    {question: '子女抚养情况', showResult: false},
                                    {question: '双方经济状况（已确定支付折价款及继续偿还贷款的经济能力）', showResult: false}
                                ]
                            },
                        ]
                    },
                    {
                        title: '车辆',
                        questions: [
                            {question: '购买时间（婚前或婚后）', showResult: false},
                            {question: '购买人及约定价款', showResult: false},
                            {question: '付款方式及车款支付情况', showResult: false},
                            {question: '现市场价值', showResult: false},
                            {question: '登记情况', showResult: false}
                        ]
                    },
                    {
                        title: '股票、债券、投资基金',
                        questions: [
                            {question: '双方持有上述有价证券性质、数额、市场价值', showResult: false},
                            {question: '双对于证券分割方式的意见', showResult: false}
                        ]
                    },
                    {
                        title: '非上市公司',
                        questions: [
                            {question: '双方在非上市公司持股的情况以及股权价值', showResult: false},
                            {question: '是否存在股权争议的情况', showResult: false},
                        ]
                    },
                    {
                        title: '有限公司',
                        questions: [
                            {question: '夫妻持股情况、股权价值', showResult: false},
                            {question: '夫妻双方对于股权分割的意见', showResult: false},
                            
                        ],
                        children: [
                            {
                                title: '公司其他股东情况',
                                questions: [
                                    {question: '股东人数', showResult: false},
                                    {question: '对于非股东一方取得股权的意见', showResult: false},
                                    {question: '是否放弃优先权', showResult: false},
                                ]
                            },
                        ]
                    },
                    {
                        title: '合伙企业',
                        questions: [
                            {question: '夫妻在合伙企业出资情况', showResult: false},
                            {question: '双方对于出资的分割意见', showResult: false},
                            {
                                title: '其他合伙人情况',
                                questions: [
                                    {question: '人数', showResult: false},
                                    {question: '是否同意该合伙人转让合伙企业财产份额', showResult: false},
                                    {question: '是否同意该合伙人配偶取得合伙企业财产份额', showResult: false},
                                    {question: '是否行使优先受让权', showResult: false},
                                    {question: '是否同意该合伙人退伙', showResult: false}
                                ]
                            },

                        ]
                    },
                    {
                        title: '独资企业',
                        questions: [
                            {question: '名义投资人及出资情况', showResult: false},
                            {question: '双方对于分割的意见', showResult: false},
                            {question: '股权价值', showResult: false},
                        ]
                    },
                    {
                        title: '保险',
                        questions: [
                            
                            {question: '保资金来源、保险金支付情况', showResult: false},
                            {question: '双方对于保险合同的意见', showResult: false}
                        ],
                        children: [
                            {
                                title: '保险基本情况',
                                questions: [
                                    {question: '保险性质', showResult: false},
                                    {question: '保险合同主体', showResult: false},
                                    {question: '保险合同内容', showResult: false},
                                    {question: '是否已经取得保险金及其数额', showResult: false},
                                    {question: '离婚时的保险现金价值', showResult: false},
                                ]
                            },
                        ]
                    }
                ]
            },

        ]
    },
    {
        showMore: true,
        title: '共同债务',
        num: 5,
        questions: [
            {question: '债务用途', showResult: false},
            {question: '举债是否夫妻双方合意', showResult: false}
        ],
        children: [
            {
                title: '债务基本情况',
                questions: [
                    {question: '举债人', showResult: false},
                    {question: '债务形成时间', showResult: false},
                    {question: '债务所涉金额', showResult: false},
                    {question: '是否偿还', showResult: false}
                ]
            },
        ]
    },
    {
        showMore: true,
        title: '共同债权',
        num: 6,
        questions: [
            {question: '所借款项的来源为个人财产抑或夫妻共同财产', showResult: false},
            {question: '所借款项的用途', showResult: false}
        ],
        children: [
            {
                title: '借款的基本情况',
                questions: [
                    {question: '借款时间', showResult: false},
                    {question: '借款数额', showResult: false},
                    {question: '是否偿还', showResult: false}
                ]
            },
        ]
    },
    {
        showMore: true,
        title: '过错赔偿',
        num: 7,
        questions: [
            {question: '夫妻一方是否存在《民法典》第一千零九十一条规定的过错行为', showResult: false},
            {question: '提出赔偿主张的一方自身是否存在《民法典》第一千零九十一条', showResult: false},
            {question: '过错行为的情节、造成损害后果、双方经济状况等', showResult: false}
        ]
    },
    {
        showMore: true,
        title: '经济补偿',
        num: 8,
        questions: [{question: '一方是否存在因抚育子女、照料老人、协助另一方工作等负担较多义务的行为', showResult: false}]
    }
]


export default mindMap