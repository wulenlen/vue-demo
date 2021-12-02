const mindMap = {
    marriage: {
        showMore: true,
        title: '婚姻状况/情感是否破裂',
        num: 1,
        questions: [{
            ques: '夫妻感情基础及婚姻现状如何',
            showResult: false,
            result: 'hhhhh'
        }],
        children: [
            {
                title: '重点听取内容/提问内容',
                questions: [
                    {ques: '双方相识相恋经过', showResult: false, result: '999'},
                    {ques: '是否自愿登记结婚', showResult: false, result: 'uuuuu'},
                    {ques: '各自的婚史状况', showResult: false, result: 'eeeeeee'},
                    {ques: '生育子女情况', showResult: false},
                    {ques: '夫妻矛盾的现状及起因', showResult: false},
                    {ques: '双方是否分居及分居原因', showResult: false},
                    {ques: '此前是否提起过离婚诉讼', showResult: false},
                    {ques: '诉讼后双方关系有无缓和', showResult: false},
                    {ques: '双方有无和好表示', showResult: false},
                ]
            },
            {
                title: '是否为现役军人离婚',
                questions: [
                    {ques: '被告是否具备现役军人身份', showResult: false},
                    {ques: '现役军人一方对于离婚问题的意见', showResult: false},
                    {ques: '现役军人一方是否存在重大过失', showResult: false},
                ]

            },
            {
                title: '特定时期内对离婚诉权的限制',
                questions: [
                    {ques: '本次起诉的时间', showResult: false},
                    {ques: '男方起诉离婚的案件中，女方是否处于孕期，哺乳期或终止妊娠六个月内情形', showResult: false},
                    {ques: '原告前次起诉离婚的情况及前案裁决生效日期', showResult: false}
                ]
            }
        ]

    },
    child: {
        showMore: true,
        title: '子女抚养情况',
        num: 2,
        children: [
            {
                title: '子女基本情况',
                questions: [
                    {ques: '子女姓名', showResult: false},
                    {ques: '子女年龄', showResult: false},
                    {ques: '子女性别', showResult: false},
                    {ques: '子女就学或入托的情况', showResult: false},
                ]
            },
            {
                title: '父母的抚养条件情况',
                questions: [
                    {ques: '双方对于抚养问题的意见', showResult: false},
                    {ques: '有无其他子女', showResult: false},
                    {ques: '文化程度', showResult: false},
                    {ques: '工作情况及收入状况', showResult: false},
                    {ques: '居住情况', showResult: false}
                ]
            },
            {
                title: '父母与子女关系情况',
                questions: [
                    {ques: '子女与父或母的关系是否亲密', showResult: false},
                    {ques: '现子女与何方共同生活', showResult: false},
                    {ques: '此前一直由何方负责照顾', showResult: false},
                    {ques: '子女本人对于抚养问题的意愿', showResult: false}
                ]
            },
            {
                questions: [{ques: '父母与养子女、继子女之间的身份关系', showResult: false}]
            }
        ],
    },
    childPayment: {
        showMore: true,
        title: '抚养费相关',
        num: 3,
        questions: [
            {ques: '子女年龄及日常生活开支情况', showResult: false},
            {ques: '父母各自工作、收入状况', showResult: false},
            {ques: '有无其他应承担抚养或赡养义务人', showResult: false}
        ]
    },
    commonProperty: {
        showMore: true,
        title: '夫妻共同财产',
        num: 4,
        children: [
            {
                questions: [{ques: '婚后所得财产的范围及类别、财产来源、财产价值', showResult: false}]
            },
            {
                title: '共同财产的状况',
                questions: [
                    {ques: '财产类型', showResult: false},
                    {ques: '财产来源', showResult: false},
                    {ques: '财产价值', showResult: false},
                    {ques: '实际控制使用情况', showResult: false}
                ]
            },
            {
                title: '影响财产分割的因素',
                questions: [
                    {ques: '子女抚养情况', showResult: false},
                    {ques: '有无经济困难的情况', showResult: false},
                    {ques: '双方经济能力', showResult: false},
                    {ques: '一方有无隐藏、转移、变卖夫妻共同财产或伪造债务的情况', showResult: false}
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
                                    {ques: '具体位置', showResult: false},
                                    {ques: '购买时间（婚前或婚后）', showResult: false},
                                    {ques: '购买人及约定价款', showResult: false},
                                    {
                                        title: '付款方式及房款支付情况',
                                        questions: [
                                            {ques: '首付款', showResult: false},
                                            {ques: '贷款及偿还数额', showResult: false},
                                            {ques: '尚未偿还贷款数额', showResult: false},
                                        ]
                                    }
                                ]
                            },
                            {
                                title: '其他影响房屋权属的确认及分割的因素',
                                questions: [
                                    {ques: '房屋实际控制使用情况', showResult: false},
                                    {ques: '双方其他住房情况', showResult: false},
                                    {ques: '子女抚养情况', showResult: false},
                                    {ques: '双方经济状况（已确定支付折价款及继续偿还贷款的经济能力）', showResult: false}
                                ]
                            },
                        ]
                    },
                    {
                        title: '车辆',
                        questions: [
                            {ques: '购买时间（婚前或婚后）', showResult: false},
                            {ques: '购买人及约定价款', showResult: false},
                            {ques: '付款方式及车款支付情况', showResult: false},
                            {ques: '现市场价值', showResult: false},
                            {ques: '登记情况', showResult: false}
                        ]
                    },
                    {
                        title: '股票、债券、投资基金',
                        questions: [
                            {ques: '双方持有上述有价证券性质、数额、市场价值', showResult: false},
                            {ques: '双对于证券分割方式的意见', showResult: false}
                        ]
                    },
                    {
                        title: '非上市公司',
                        questions: [
                            {ques: '双方在非上市公司持股的情况以及股权价值', showResult: false},
                            {ques: '是否存在股权争议的情况', showResult: false},
                        ]
                    },
                    {
                        title: '有限公司',
                        questions: [
                            {ques: '夫妻持股情况、股权价值', showResult: false},
                            {ques: '夫妻双方对于股权分割的意见', showResult: false},
                            {
                                title: '公司其他股东情况',
                                questions: [
                                    {ques: '股东人数', showResult: false},
                                    {ques: '对于非股东一方取得股权的意见', showResult: false},
                                    {ques: '是否放弃优先权', showResult: false},
                                ]
                            },
                        ]
                    },
                    {
                        title: '合伙企业',
                        questions: [
                            {ques: '夫妻在合伙企业出资情况', showResult: false},
                            {ques: '双方对于出资的分割意见', showResult: false},
                            {
                                title: '其他合伙人情况',
                                questions: [
                                    {ques: '人数', showResult: false},
                                    {ques: '是否同意该合伙人转让合伙企业财产份额', showResult: false},
                                    {ques: '是否同意该合伙人配偶取得合伙企业财产份额', showResult: false},
                                    {ques: '是否行使优先受让权', showResult: false},
                                    {ques: '是否同意该合伙人退伙', showResult: false}
                                ]
                            },

                        ]
                    },
                    {
                        title: '独资企业',
                        questions: [
                            {ques: '名义投资人及出资情况', showResult: false},
                            {ques: '双方对于分割的意见', showResult: false},
                            {ques: '股权价值', showResult: false},
                        ]
                    },
                    {
                        title: '保险',
                        questions: [
                            {
                                title: '保险基本情况',
                                questions: [
                                    {ques: '保险性质', showResult: false},
                                    {ques: '保险合同主体', showResult: false},
                                    {ques: '保险合同内容', showResult: false},
                                    {ques: '是否已经取得保险金及其数额', showResult: false},
                                    {ques: '离婚时的保险现金价值', showResult: false},
                                ]
                            },
                            {ques: '保资金来源、保险金支付情况', showResult: false},
                            {ques: '双方对于保险合同的意见', showResult: false}
                        ]
                    }
                ]
            },

        ]
    },
    jointDebt:  {
        showMore: true,
        title: '共同债务',
        num: 5,
        children: [
            {
                title: '债务基本情况',
                questions: [
                    {ques: '举债人', showResult: false},
                    {ques: '债务形成时间', showResult: false},
                    {ques: '债务所涉金额', showResult: false},
                    {ques: '是否偿还', showResult: false}
                ]
            },
            {
                questions: [
                    {ques: '债务用途', showResult: false},
                    {ques: '举债是否夫妻双方合意', showResult: false}
                ]
            }
        ]
    },
    jointClaims: {
        showMore: true,
        title: '共同债权',
        num: 6,
        children: [
            {
                title: '借款的基本情况',
                questions: [
                    {ques: '借款时间', showResult: false},
                    {ques: '借款数额', showResult: false},
                    {ques: '是否偿还', showResult: false}
                ]
            },
            {
                questions: [
                    {ques: '所借款项的来源为个人财产抑或夫妻共同财产', showResult: false},
                    {ques: '所借款项的用途', showResult: false}
                ]
            }
        ]
    },
    faultCompensation: {
        showMore: true,
        title: '过错赔偿',
        num: 7,
        questions: [
            {ques: '夫妻一方是否存在《民法典》第一千零九十一条规定的过错行为', showResult: false},
            {ques: '提出赔偿主张的一方自身是否存在《民法典》第一千零九十一条', showResult: false},
            {ques: '过错行为的情节、造成损害后果、双方经济状况等', showResult: false}
        ]
    },
    economicCompensation: {
        showMore: true,
        title: '经济补偿',
        num: 8,
        questions: [{ques: '一方是否存在因抚育子女、照料老人、协助另一方工作等负担较多义务的行为', showResult: false}]
    }
}


export default mindMap