'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Heart, Users, Building2, CheckCircle, Code, DollarSign } from 'lucide-react'

export default function QuestionnaireSection() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})

  const questionnaire = [
    {
      id: 'dream-city',
      title: '梦想城市',
      icon: MapPin,
      question: '你最希望在哪个城市学习和工作？（可多选）',
      options: [
        { value: 'beijing', label: '北京', description: '政治文化中心，教育资源丰富' },
        { value: 'shanghai', label: '上海', description: '经济金融中心，国际化程度高' },
        { value: 'shenzhen', label: '深圳', description: '科技创新之都，创业氛围浓厚' },
        { value: 'hangzhou', label: '杭州', description: '互联网之都，电商产业发达' },
        { value: 'guangzhou', label: '广州', description: '商贸中心，生活成本相对较低' },
        { value: 'chengdu', label: '成都', description: '新一线城市，生活节奏舒适' },
        { value: 'nanjing', label: '南京', description: '历史文化名城，教育资源优质' },
        { value: 'wuhan', label: '武汉', description: '中部中心城市，交通便利' },
        { value: 'xian', label: '西安', description: '历史文化名城，高校云集' },
        { value: 'no-preference', label: '无特殊偏好', description: '愿意去任何城市' },
      ],
      multiple: true
    },
    {
      id: 'region',
      title: '地区偏好',
      icon: MapPin,
      question: '你更倾向于在哪个地区就读？',
      options: [
        { value: 'north', label: '华北地区（北京、天津等）', cities: ['北京', '天津', '石家庄'] },
        { value: 'east', label: '华东地区（上海、杭州、南京等）', cities: ['上海', '杭州', '南京', '苏州'] },
        { value: 'south', label: '华南地区（广州、深圳等）', cities: ['广州', '深圳', '珠海'] },
        { value: 'west', label: '西部地区（成都、重庆、西安等）', cities: ['成都', '重庆', '西安'] },
        { value: 'central', label: '中部地区（武汉、长沙等）', cities: ['武汉', '长沙', '郑州'] },
        { value: 'northeast', label: '东北地区（沈阳、大连等）', cities: ['沈阳', '大连', '哈尔滨'] },
        { value: 'no-preference', label: '无特殊偏好', cities: [] },
      ]
    },
    {
      id: 'hobby',
      title: '兴趣爱好',
      icon: Heart,
      question: '你的兴趣爱好主要有哪些？（可多选）',
      options: [
        { value: 'technology', label: '科技与编程' },
        { value: 'art', label: '艺术与设计' },
        { value: 'sports', label: '体育运动' },
        { value: 'music', label: '音乐' },
        { value: 'reading', label: '阅读写作' },
        { value: 'business', label: '商业创业' },
        { value: 'science', label: '科学研究' },
        { value: 'social', label: '社交活动' },
        { value: 'gaming', label: '游戏电竞' },
        { value: 'photography', label: '摄影摄像' },
        { value: 'cooking', label: '烹饪美食' },
        { value: 'travel', label: '旅行探索' },
      ],
      multiple: true
    },
    {
      id: 'skills',
      title: '擅长领域',
      icon: Users,
      question: '你在哪些方面比较擅长？（可多选）',
      options: [
        { value: 'math', label: '数学逻辑' },
        { value: 'language', label: '语言表达' },
        { value: 'creativity', label: '创新创造' },
        { value: 'analysis', label: '分析推理' },
        { value: 'communication', label: '沟通协调' },
        { value: 'leadership', label: '领导组织' },
        { value: 'artistic', label: '艺术审美' },
        { value: 'technical', label: '技术操作' },
        { value: 'memory', label: '记忆背诵' },
        { value: 'problem-solving', label: '问题解决' },
      ],
      multiple: true
    },
    {
      id: 'family-background',
      title: '家庭背景',
      icon: Building2,
      question: '你的家庭经济状况如何？',
      options: [
        { value: 'wealthy', label: '富裕 - 可以承担任何费用，包括出国留学' },
        { value: 'comfortable', label: '小康 - 可以承担国内大学费用，包括私立学校' },
        { value: 'moderate', label: '中等 - 可以承担公立大学费用，需要部分资助' },
        { value: 'limited', label: '一般 - 需要奖学金或助学贷款' },
        { value: 'prefer-not-say', label: '不想透露' },
      ]
    },
    {
      id: 'personality',
      title: '性格特质',
      icon: Users,
      question: '你认为自己更符合以下哪种性格类型？',
      options: [
        { value: 'introverted', label: '内向型 - 喜欢独处思考' },
        { value: 'extroverted', label: '外向型 - 喜欢社交交流' },
        { value: 'analytical', label: '分析型 - 注重逻辑推理' },
        { value: 'creative', label: '创造型 - 注重创新想象' },
        { value: 'practical', label: '实践型 - 注重实际应用' },
        { value: 'balanced', label: '平衡型 - 多种特质结合' },
      ]
    },
    {
      id: 'workplace',
      title: '工作场所偏好',
      icon: Building2,
      question: '你理想的工作环境是？',
      options: [
        { value: 'office', label: '传统办公室' },
        { value: 'remote', label: '远程办公' },
        { value: 'field', label: '户外/现场工作' },
        { value: 'lab', label: '实验室/研究室' },
        { value: 'studio', label: '工作室/创作空间' },
        { value: 'flexible', label: '灵活多样' },
      ]
    },
    {
      id: 'career-goals',
      title: '职业目标',
      question: '你对未来职业的期望是？（可多选）',
      options: [
        { value: 'high-salary', label: '高薪资' },
        { value: 'stability', label: '工作稳定' },
        { value: 'growth', label: '快速成长' },
        { value: 'impact', label: '社会影响力' },
        { value: 'innovation', label: '创新突破' },
        { value: 'leadership', label: '领导管理' },
        { value: 'work-life-balance', label: '工作生活平衡' },
        { value: 'freedom', label: '工作自由度高' },
      ],
      multiple: true
    },
  ]

  const handleAnswer = (questionId: string, value: any) => {
    if (questionnaire.find(q => q.id === questionId)?.multiple) {
      const current = answers[questionId] || []
      const newValue = current.includes(value)
        ? current.filter((v: any) => v !== value)
        : [...current, value]
      setAnswers({ ...answers, [questionId]: newValue })
    } else {
      setAnswers({ ...answers, [questionId]: value })
    }
  }

  const currentQuestion = questionnaire[step]
  const Icon = currentQuestion?.icon || CheckCircle
  const isComplete = step === questionnaire.length
  const progress = ((step + 1) / questionnaire.length) * 100

  const handleComplete = () => {
    // 保存答案到localStorage
    localStorage.setItem('questionnaireAnswers', JSON.stringify(answers))
    localStorage.setItem('questionnaireCompleted', 'true')
    
    // 滚动到推荐区域
    setTimeout(() => {
      const element = document.getElementById('recommendation')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 500)
  }

  if (isComplete) {
    return (
      <section id="questionnaire" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">问卷完成！</h2>
            <p className="text-[#98989D] mb-8">
              我们已经收集了你的偏好信息，将为你生成个性化的推荐方案
            </p>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => {
                  handleComplete()
                }}
                className="btn btn-primary"
              >
                查看推荐结果
              </button>
              <button
                onClick={() => {
                  setStep(0)
                  setAnswers({})
                }}
                className="btn btn-secondary"
              >
                重新填写
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="questionnaire" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">智能问卷</h2>
          <p className="text-xl text-[#98989D]">
            通过回答几个简单问题，让我们更好地了解你的偏好
          </p>
        </motion.div>

        <div className="card">
          {/* 进度条 */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-[#98989D] mb-2">
              <span>步骤 {step + 1} / {questionnaire.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-[#2C2C2E] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#007AFF] to-[#AF52DE]"
              />
            </div>
          </div>

          {/* 问题 */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Icon className="w-8 h-8 text-[#007AFF]" />
              <h3 className="text-2xl font-semibold">{currentQuestion.title}</h3>
            </div>
            <p className="text-lg text-[#98989D] mb-8">{currentQuestion.question}</p>

            <div className="space-y-4">
              {currentQuestion.options.map((option) => {
                const isSelected = currentQuestion.multiple
                  ? (answers[currentQuestion.id] || []).includes(option.value)
                  : answers[currentQuestion.id] === option.value

                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      isSelected
                        ? 'border-[#007AFF] bg-[#007AFF]/10'
                        : 'border-[#38383A] hover:border-[#48484A]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <span>{option.label}</span>
                        {option.description && (
                          <p className="text-sm text-[#98989D] mt-1">{option.description}</p>
                        )}
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-[#007AFF] ml-2 flex-shrink-0" />
                      )}
                    </div>
                    {option.cities && option.cities.length > 0 && (
                      <p className="text-sm text-[#98989D] mt-2">
                        主要城市：{option.cities.join('、')}
                      </p>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 导航按钮 */}
          <div className="flex justify-between">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一步
            </button>
            <button
              onClick={() => {
                if (step < questionnaire.length - 1) {
                  setStep(step + 1)
                } else {
                  // 最后一步，完成问卷
                  handleComplete()
                  setStep(questionnaire.length) // 设置为完成状态
                }
              }}
              disabled={
                currentQuestion.multiple
                  ? !answers[currentQuestion.id] || (answers[currentQuestion.id] as any[]).length === 0
                  : !answers[currentQuestion.id]
              }
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === questionnaire.length - 1 ? '完成' : '下一步'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
