// 推荐算法和数据处理

export interface QuestionnaireAnswers {
  'dream-city'?: string[]
  region?: string
  hobby?: string[]
  skills?: string[]
  'family-background'?: string
  personality?: string
  workplace?: string
  'career-goals'?: string[]
}

export interface Major {
  id: string
  name: string
  category: string
  description: string
  matchScore: number
  futureProspect: string
  relatedMajors: string[]
  salary: {
    entry: number
    mid: number
    senior: number
  }
  workContent: string[]
  careerPath: string[]
  cities: string[]
  matchReasons: string[]
}

export interface University {
  id: string
  name: string
  region: string
  city: string
  level: string
  majors: string[]
  matchScore: number
  ranking?: number
  tuition?: number
  description?: string
}

// 专业数据库
const majorsDatabase: Major[] = [
  {
    id: 'ai',
    name: '人工智能',
    category: '工学',
    description: '培养掌握人工智能基础理论、基本方法和应用技术的高级专门人才，包括机器学习、深度学习、自然语言处理等核心技术',
    matchScore: 0,
    futureProspect: '十五五计划重点发展领域，就业前景广阔，市场需求持续增长',
    relatedMajors: ['计算机科学与技术', '数据科学与大数据技术', '机器人工程', '软件工程'],
    salary: { entry: 15000, mid: 30000, senior: 60000 },
    workContent: [
      '算法设计与优化',
      '机器学习模型开发',
      '自然语言处理',
      '计算机视觉应用',
      'AI产品研发'
    ],
    careerPath: ['算法工程师', 'AI研究员', 'AI产品经理', '数据科学家', '技术专家'],
    cities: ['北京', '上海', '深圳', '杭州', '广州'],
    matchReasons: []
  },
  {
    id: 'data-science',
    name: '数据科学与大数据技术',
    category: '工学',
    description: '培养具备大数据处理、分析和应用能力的高级专门人才，掌握数据挖掘、数据分析、数据可视化等技能',
    matchScore: 0,
    futureProspect: '数字化转型核心专业，市场需求旺盛，薪资水平较高',
    relatedMajors: ['人工智能', '统计学', '计算机科学与技术', '信息管理与信息系统'],
    salary: { entry: 12000, mid: 25000, senior: 50000 },
    workContent: [
      '数据采集与清洗',
      '数据挖掘与分析',
      '数据可视化',
      '商业智能分析',
      '大数据平台建设'
    ],
    careerPath: ['数据分析师', '数据工程师', '数据科学家', '商业分析师', '数据产品经理'],
    cities: ['北京', '上海', '深圳', '杭州', '成都'],
    matchReasons: []
  },
  {
    id: 'new-energy',
    name: '新能源科学与工程',
    category: '工学',
    description: '培养新能源领域的技术研发、工程设计和管理人才，包括太阳能、风能、储能等方向',
    matchScore: 0,
    futureProspect: '碳中和目标下的重点发展专业，政策支持力度大',
    relatedMajors: ['材料科学与工程', '电气工程', '环境工程', '化学工程'],
    salary: { entry: 10000, mid: 20000, senior: 40000 },
    workContent: [
      '新能源技术研发',
      '系统设计与优化',
      '项目管理',
      '技术咨询',
      '产品开发'
    ],
    careerPath: ['研发工程师', '系统工程师', '项目经理', '技术专家', '产品经理'],
    cities: ['北京', '上海', '深圳', '西安', '成都'],
    matchReasons: []
  },
  {
    id: 'cs',
    name: '计算机科学与技术',
    category: '工学',
    description: '培养计算机科学理论基础扎实、实践能力强的高级专门人才',
    matchScore: 0,
    futureProspect: '传统优势专业，就业面广，薪资水平高',
    relatedMajors: ['软件工程', '人工智能', '数据科学与大数据技术', '网络工程'],
    salary: { entry: 13000, mid: 28000, senior: 55000 },
    workContent: [
      '软件开发',
      '系统架构设计',
      '技术攻关',
      '代码审查',
      '团队协作'
    ],
    careerPath: ['软件工程师', '系统架构师', '技术专家', '技术总监', 'CTO'],
    cities: ['北京', '上海', '深圳', '杭州', '广州'],
    matchReasons: []
  },
  {
    id: 'finance',
    name: '金融工程',
    category: '经济学',
    description: '培养掌握金融理论和工程技术方法，能够进行金融产品设计和风险管理的复合型人才',
    matchScore: 0,
    futureProspect: '金融科技快速发展，需求稳定增长',
    relatedMajors: ['金融学', '经济学', '统计学', '数学与应用数学'],
    salary: { entry: 11000, mid: 25000, senior: 50000 },
    workContent: [
      '金融产品设计',
      '风险管理',
      '量化交易',
      '数据分析',
      '投资研究'
    ],
    careerPath: ['量化分析师', '风险管理师', '产品经理', '投资经理', '金融科技专家'],
    cities: ['北京', '上海', '深圳', '杭州', '广州'],
    matchReasons: []
  },
  {
    id: 'biomedical',
    name: '生物医学工程',
    category: '工学',
    description: '培养掌握生物医学工程基础理论和专业技能，能够从事医疗器械研发、医学影像处理等工作',
    matchScore: 0,
    futureProspect: '健康医疗产业快速发展，前景广阔',
    relatedMajors: ['生物技术', '医学', '电子信息工程', '材料科学与工程'],
    salary: { entry: 9000, mid: 18000, senior: 35000 },
    workContent: [
      '医疗器械研发',
      '医学影像处理',
      '生物信号处理',
      '产品测试',
      '技术文档编写'
    ],
    careerPath: ['研发工程师', '产品工程师', '技术专家', '项目经理', '研发总监'],
    cities: ['北京', '上海', '深圳', '苏州', '杭州'],
    matchReasons: []
  },
  {
    id: 'design',
    name: '工业设计',
    category: '艺术学',
    description: '培养具备创新设计思维和设计实践能力，能够从事产品设计、交互设计等工作',
    matchScore: 0,
    futureProspect: '消费升级推动设计需求增长',
    relatedMajors: ['艺术设计', '产品设计', '视觉传达设计', '数字媒体技术'],
    salary: { entry: 8000, mid: 15000, senior: 30000 },
    workContent: [
      '产品设计',
      '用户研究',
      '原型制作',
      '设计评审',
      '设计趋势分析'
    ],
    careerPath: ['产品设计师', '交互设计师', '设计总监', '设计经理', '设计咨询师'],
    cities: ['北京', '上海', '深圳', '杭州', '广州'],
    matchReasons: []
  },
]

// 大学数据库
const universitiesDatabase: University[] = [
  {
    id: 'tsinghua',
    name: '清华大学',
    region: 'north',
    city: '北京',
    level: '985/211',
    majors: ['人工智能', '计算机科学与技术', '数据科学与大数据技术', '新能源科学与工程'],
    matchScore: 0,
    ranking: 1,
    tuition: 5000,
    description: '中国顶尖综合性大学，工科实力强劲'
  },
  {
    id: 'pku',
    name: '北京大学',
    region: 'north',
    city: '北京',
    level: '985/211',
    majors: ['人工智能', '计算机科学与技术', '金融工程'],
    matchScore: 0,
    ranking: 2,
    tuition: 5000,
    description: '中国顶尖综合性大学，文理并重'
  },
  {
    id: 'zju',
    name: '浙江大学',
    region: 'east',
    city: '杭州',
    level: '985/211',
    majors: ['人工智能', '数据科学与大数据技术', '新能源科学与工程', '计算机科学与技术'],
    matchScore: 0,
    ranking: 3,
    tuition: 5300,
    description: '综合性研究型大学，工科和商科实力强'
  },
  {
    id: 'sjtu',
    name: '上海交通大学',
    region: 'east',
    city: '上海',
    level: '985/211',
    majors: ['人工智能', '计算机科学与技术', '金融工程', '生物医学工程'],
    matchScore: 0,
    ranking: 4,
    tuition: 5000,
    description: '综合性研究型大学，工科和医学实力强'
  },
  {
    id: 'fudan',
    name: '复旦大学',
    region: 'east',
    city: '上海',
    level: '985/211',
    majors: ['金融工程', '计算机科学与技术', '数据科学与大数据技术'],
    matchScore: 0,
    ranking: 5,
    tuition: 5000,
    description: '综合性研究型大学，文理医并重'
  },
  {
    id: 'ustc',
    name: '中国科学技术大学',
    region: 'east',
    city: '合肥',
    level: '985/211',
    majors: ['人工智能', '计算机科学与技术', '新能源科学与工程'],
    matchScore: 0,
    ranking: 6,
    tuition: 4800,
    description: '理工科强校，科研实力突出'
  },
  {
    id: 'nju',
    name: '南京大学',
    region: 'east',
    city: '南京',
    level: '985/211',
    majors: ['人工智能', '计算机科学与技术', '数据科学与大数据技术'],
    matchScore: 0,
    ranking: 7,
    tuition: 4600,
    description: '综合性研究型大学，文理并重'
  },
  {
    id: 'hit',
    name: '哈尔滨工业大学',
    region: 'northeast',
    city: '哈尔滨',
    level: '985/211',
    majors: ['人工智能', '计算机科学与技术', '机器人工程'],
    matchScore: 0,
    ranking: 8,
    tuition: 4000,
    description: '工科强校，航天和机器人领域突出'
  },
  {
    id: 'xjtlu',
    name: '西交利物浦大学',
    region: 'east',
    city: '苏州',
    level: '中外合作',
    majors: ['计算机科学与技术', '数据科学与大数据技术', '工业设计'],
    matchScore: 0,
    ranking: 50,
    tuition: 88000,
    description: '中外合作办学，国际化教育'
  },
]

// 匹配规则
function calculateMajorMatchScore(major: Major, answers: QuestionnaireAnswers): number {
  let score = 50 // 基础分
  const reasons: string[] = []

  // 兴趣爱好匹配
  if (answers.hobby) {
    const techHobbies = ['technology', 'science', 'gaming']
    const artHobbies = ['art', 'music', 'photography']
    const businessHobbies = ['business', 'social']
    
    if (major.id === 'ai' || major.id === 'cs' || major.id === 'data-science') {
      const matchCount = answers.hobby.filter(h => techHobbies.includes(h)).length
      if (matchCount > 0) {
        score += matchCount * 10
        reasons.push(`你的兴趣爱好与${major.name}专业匹配`)
      }
    }
    
    if (major.id === 'design') {
      const matchCount = answers.hobby.filter(h => artHobbies.includes(h)).length
      if (matchCount > 0) {
        score += matchCount * 10
        reasons.push(`你的艺术兴趣与${major.name}专业匹配`)
      }
    }
    
    if (major.id === 'finance') {
      const matchCount = answers.hobby.filter(h => businessHobbies.includes(h)).length
      if (matchCount > 0) {
        score += matchCount * 10
        reasons.push(`你的商业兴趣与${major.name}专业匹配`)
      }
    }
  }

  // 技能匹配
  if (answers.skills) {
    const techSkills = ['math', 'analysis', 'technical', 'problem-solving']
    const creativeSkills = ['creativity', 'artistic']
    const socialSkills = ['communication', 'leadership', 'language']
    
    if (major.id === 'ai' || major.id === 'cs' || major.id === 'data-science') {
      const matchCount = answers.skills.filter(s => techSkills.includes(s)).length
      if (matchCount > 0) {
        score += matchCount * 8
        reasons.push(`你的技能优势与${major.name}专业匹配`)
      }
    }
    
    if (major.id === 'design') {
      const matchCount = answers.skills.filter(s => creativeSkills.includes(s)).length
      if (matchCount > 0) {
        score += matchCount * 8
        reasons.push(`你的创造能力与${major.name}专业匹配`)
      }
    }
  }

  // 性格匹配
  if (answers.personality) {
    if ((major.id === 'ai' || major.id === 'cs' || major.id === 'data-science') && 
        (answers.personality === 'analytical' || answers.personality === 'introverted')) {
      score += 15
      reasons.push(`你的${answers.personality === 'analytical' ? '分析型' : '内向型'}性格适合${major.name}专业`)
    }
    
    if (major.id === 'design' && answers.personality === 'creative') {
      score += 15
      reasons.push(`你的创造型性格适合${major.name}专业`)
    }
  }

  // 职业目标匹配
  if (answers['career-goals']) {
    if (answers['career-goals'].includes('high-salary')) {
      if (major.id === 'ai' || major.id === 'cs' || major.id === 'data-science') {
        score += 10
        reasons.push(`${major.name}专业薪资水平较高，符合你的期望`)
      }
    }
    
    if (answers['career-goals'].includes('innovation')) {
      if (major.id === 'ai' || major.id === 'new-energy') {
        score += 10
        reasons.push(`${major.name}专业注重创新，符合你的期望`)
      }
    }
  }

  // 工作场所匹配
  if (answers.workplace) {
    if ((major.id === 'ai' || major.id === 'cs' || major.id === 'data-science') && 
        (answers.workplace === 'office' || answers.workplace === 'remote')) {
      score += 5
    }
    
    if (major.id === 'new-energy' && answers.workplace === 'field') {
      score += 5
    }
    
    if (major.id === 'biomedical' && answers.workplace === 'lab') {
      score += 5
    }
  }

  major.matchReasons = reasons
  return Math.min(100, score)
}

function calculateUniversityMatchScore(university: University, answers: QuestionnaireAnswers, recommendedMajors: Major[]): number {
  let score = 50
  const reasons: string[] = []

  // 地区匹配
  if (answers.region && university.region === answers.region) {
    score += 20
    reasons.push(`位于你偏好的${answers.region}地区`)
  }

  // 梦想城市匹配
  if (answers['dream-city']) {
    const cityMap: Record<string, string> = {
      'beijing': '北京',
      'shanghai': '上海',
      'shenzhen': '深圳',
      'hangzhou': '杭州',
      'guangzhou': '广州',
      'chengdu': '成都',
      'nanjing': '南京',
      'wuhan': '武汉',
      'xian': '西安',
    }
    
    const dreamCities = answers['dream-city']
      .filter(c => c !== 'no-preference')
      .map(c => cityMap[c])
      .filter(Boolean)
    
    if (dreamCities.includes(university.city)) {
      score += 25
      reasons.push(`位于你的梦想城市${university.city}`)
    }
  }

  // 专业匹配
  const universityMajorNames = university.majors
  const recommendedMajorNames = recommendedMajors.map(m => m.name)
  const matchCount = universityMajorNames.filter(m => recommendedMajorNames.includes(m)).length
  
  if (matchCount > 0) {
    score += matchCount * 10
    reasons.push(`开设${matchCount}个推荐专业`)
  }

  // 家庭背景匹配（学费考虑）
  if (answers['family-background']) {
    if (answers['family-background'] === 'limited' && university.tuition && university.tuition > 10000) {
      score -= 15
    }
    
    if (answers['family-background'] === 'comfortable' || answers['family-background'] === 'wealthy') {
      if (university.level === '985/211') {
        score += 5
      }
    }
  }

  return Math.min(100, score)
}

export function generateRecommendations(answers: QuestionnaireAnswers): {
  majors: Major[]
  universities: University[]
} {
  // 计算专业匹配度
  const majors = majorsDatabase.map(major => ({
    ...major,
    matchScore: calculateMajorMatchScore(major, answers)
  }))

  // 按匹配度排序，取前5个
  const recommendedMajors = majors
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5)

  // 计算大学匹配度
  const universities = universitiesDatabase.map(university => ({
    ...university,
    matchScore: calculateUniversityMatchScore(university, answers, recommendedMajors)
  }))

  // 按匹配度排序，取前6个
  const recommendedUniversities = universities
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6)

  return {
    majors: recommendedMajors,
    universities: recommendedUniversities
  }
}
