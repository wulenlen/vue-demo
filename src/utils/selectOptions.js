export default {
    claims: [
        {label: '子女抚养', value: '1'},
        {label: '财产分割', value: '2'},
        {label: '过程损害赔偿', value: '4'},
        {label: '诉讼费负担', value: '8'},
    ],
    disputeLaw: [
        {label: '重婚', value: '1'},
        {label: '与他人同居', value: '2'},
        {label: '家庭暴力', value: '4'},
        {label: '虐待家庭成员', value: '8'},
        {label: '遗弃家庭成员', value: '16'},
        {label: '有赌博恶习且屡教不改', value: '32'},
        {label: '有吸毒恶习且不改', value: '64'},
        {label: '感情不和分居满2年', value: '128'},
        {label: '一方被宣告失踪', value: '256'},
        {label: '经法院判决不准离婚后分居满一年', value: '512'},
        {label: '夫妻双方因是否生育发生纠纷，至感情破裂', value: '1024'},
    ],
    meetWay: [
        {label: '自由恋爱', value: 1},
        {label: '他人介绍', value: 2},
    ],
    premaritalFeeling: [
        {label: '缺乏了解、草率结婚', value: 1},
        {label: '感情一般', value: 2},
        {label: '感情深厚', value: 3}
    ],
    postnuptialFeeling: [
        {label: '无语言交流', value: 1},
        {label: '经常吵打', value: 2},
        {label: '感情冷漠', value: 3}
    ],
    prosecuteResult: [
        {label: '撤诉', value: 1},
        {label: '判决不准予离婚', value: 2},
        {label: '调解和好', value: 3}
    ],
    relationship: [
        {label: '与原告相处较好', value: 1},
        {label: '与被告相处较好', value: 2},
        {label: '与原、被告相处均较好', value: 3},
    ],
    raiseInfo: [
        {label: '主要由原告陪伴抚养', value: 1},
        {label: '主要由被告陪伴抚养', value: 2},
        {label: '原、被告共同陪伴抚养', value: 3},
        {label: '主要由其他人抚养', value: 4},
    ],
    schoolShuttle: [
        {label: '主要由原告接送', value: 1},
        {label: '主要由被告接送', value: 2},
        {label: '原、被告共同或轮流接送', value: 3},
        {label: '主要由其他人接送', value: 4},
    ],
    guidance: [
        {label: '主要由原告辅导', value: 1},
        {label: '主要由被告辅导', value: 2},
        {label: '原、被告共同或轮流辅导', value: 3},
        {label: '主要由其他人辅导', value: 4},
    ],
    negotiation: [
        {label: '无协商结果', value: 1},
        {label: '由原告抚养', value: 2},
        {label: '由被告抚养', value: 3},
        {label: '原、被告轮流抚养', value: 4},
    ],
    mind: [
        {label: '愿意跟原告生活', value: 1},
        {label: '愿意跟被告生活', value: 2},
        {label: '无明确意见', value: 3},
    ],
    study: [
        {label: '学前儿童', value: 1},
        {label: '已入学', value: 2},
        {label: '无入学情况', value: 3},
    ],
    personHouse: [
        {label: '原告', value: 1},
        {label: '被告', value: 2},
        {label: '原、被告双⽅', value: 3},
    ],
    person: [
        {label: '原告', value: 1},
        {label: '被告', value: 2},
        {label: '子女', value: 3},
        {label: '其他人', value: 4},
    ],
    downPaymentPerson: [
        {label: '仅原告婚前出资', value: 1},
        {label: '仅被告婚前出资', value: 2},
        {label: '双⽅婚前出资', value: 3},
        {label: '仅原告⽗⺟婚前出资', value: 4},
        {label: '仅被告⽗⺟婚前出资', value: 5},
        {label: '双⽅⽗⺟婚前出资', value: 6},
    ],
    fullPaymentPerson: [
        {label: '原告', value: 1},
        {label: '被告', value: 2},
        {label: '原、被告双⽅', value: 3},
        {label: '被告⽗⺟', value: 4}, 
        {label: '原告⽗⺟', value: 5},
        {label: '双⽅⽗⺟', value: 6},
    ],
    contribution: [
        {label: '婚前全款买房', value: 1},
        {label: '婚前按揭买房，婚前已还清贷款', value: 2},
        {label: '婚前按揭买房，婚后有共同还贷', value: 3},
    ],
    state: [
        {label: '良好', value: 1},
        {label: '轻微故障', value: 2},
        {label: '重度故障', value: 3}
    ],
    partition: [
        {label: '折价归并归原告', value: 1},
        {label: '折价归并归被告', value: 2},
        {label: '分割转让款', value: 3}
    ],
    usedInfo: [
        {label: '原告', value: 1},
        {label: '被告', value: 2},
        {label: '子女', value: 3},
        {label: '轮流使用', value: 4},
        {label: '其他人', value: 5}
    ],
    typeCompany: [
        {label: '有限责任公司', value: 1},
        {label: '合伙企业', value: 2},
        {label: '独资企业', value: 3}
    ],
    partitionCompany: [
        {label: '成为股东', value: 1},
        {label: '折价归并归原告', value: 2},
        {label: '折价归并归被告', value: 3},
        {label: '分割转让款', value: 4}
    ],
    typeValuables: [
        {label: '名人字画', value: 1},
        {label: '名贵家具', value: 2},
        {label: '名贵⾸饰', value: 3},
        {label: '⾼档家电', value: 4},
        {label: '其他', value: 5}
    ],
    merge: [
        {label: '归原告所有', value: 1},
        {label: '归被告所有', value: 2},
    ],
    personOther: [
        {label: '原告', value: 1},
        {label: '被告', value: 2},
        {label: '其他人', value: 3},
    ],
    agentType: [
        {label: '律师', value: 1},
        {label: '法律工作者', value: 2},
        {label: '自然人', value: 3}
    ],
    assistDependents: [
        {label: '爷爷', value: 11},
        {label: '奶奶', value: 12},
        {label: '外公', value: 21},
        {label: '外婆', value: 22},
        {label: '其他', value: 30},
    ],
    workStatus: [
        {label: '无工作', value: 1},
        {label: '无稳定工作', value: 2},
        {label: '有稳定工作', value: 3},
    ],
    edu: [
        {label: '高中及以下', value: 1},
        {label: '大学本科/专科', value: 2},
        {label: '研究生及以上', value: 3}
    ],
    healthStatus: [
        {label: '良好', value: 1},
        {label: '患有传染性疾病', value: 2},
        {label: '患有精神性疾病', value: 3},
        {label: '患有严重残疾', value: 4},
        {label: '有其他不适合抚养的情况', value: 5}
    ],
    pregnancyStatus: [
        {label: '怀孕期间', value: 1},
        {label: '分娩后1年内', value: 2},
        {label: '中止妊娠6个月内', value: 3},
        {label: '其他', value: 0}
    ],
    sendType: [
        {label: '线上', value: 1},
        {label: '线下及线上', value: 2}
    ]
}