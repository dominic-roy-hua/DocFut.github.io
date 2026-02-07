'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Heart, Target, Zap } from 'lucide-react'

export default function AssessmentSection() {
  const [currentTest, setCurrentTest] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [results, setResults] = useState<any>(null)

  const assessments = [
    {
      id: 'interest',
      title: '兴趣测评',
      icon: Heart,
      description: '了解你的兴趣爱好，发现潜在的专业方向',
      questions: [
        { id: 1, text: '你更喜欢动手实践还是理论研究？', options: ['动手实践', '理论研究', '两者结合'] },
        { id: 2, text: '你对数字和数据分析感兴趣吗？', options: ['非常感兴趣', '一般', '不太感兴趣'] },
        { id: 3, text: '你更愿意与人交流还是独自工作？', options: ['与人交流', '独自工作', '都可以'] },
        { id: 4, text: '你对艺术创作感兴趣吗？', options: ['非常感兴趣', '一般', '不太感兴趣'] },
        { id: 5, text: '你更关注当下还是未来？', options: ['当下', '未来', '两者平衡'] },
      ]
    },
    {
      id: 'personality',
      title: '人格测评',
      icon: Brain,
      description: '基于MBTI等科学模型，分析你的性格特质',
      questions: [
        { id: 1, text: '在社交场合，你更倾向于？', options: ['主动交流', '被动回应', '观察他人'] },
        { id: 2, text: '做决定时，你更依赖？', options: ['逻辑分析', '直觉感受', '两者结合'] },
        { id: 3, text: '面对压力，你的反应是？', options: ['冷静分析', '情绪化', '寻求帮助'] },
        { id: 4, text: '你更喜欢？', options: ['计划安排', '灵活应变', '两者结合'] },
        { id: 5, text: '你的能量来源主要是？', options: ['独处', '社交', '两者平衡'] },
      ]
    },
    {
      id: 'ability',
      title: '能力测评',
      icon: Zap,
      description: '评估你的核心能力，匹配适合的专业领域',
      questions: [
        { id: 1, text: '你的数学能力如何？', options: ['优秀', '良好', '一般'] },
        { id: 2, text: '你的语言表达能力如何？', options: ['优秀', '良好', '一般'] },
        { id: 3, text: '你的逻辑思维能力如何？', options: ['优秀', '良好', '一般'] },
        { id: 4, text: '你的创新能力如何？', options: ['优秀', '良好', '一般'] },
        { id: 5, text: '你的团队协作能力如何？', options: ['优秀', '良好', '一般'] },
      ]
    },
    {
      id: 'values',
      title: '价值观测评',
      icon: Target,
      description: '探索你的价值观，找到与你匹配的专业',
      questions: [
        { id: 1, text: '你更看重？', options: ['高收入', '工作意义', '工作生活平衡'] },
        { id: 2, text: '你希望的工作环境是？', options: ['快节奏', '稳定安逸', '灵活自由'] },
        { id: 3, text: '你更倾向于？', options: ['创新突破', '稳定发展', '服务他人'] },
        { id: 4, text: '你对成功的定义是？', options: ['财富积累', '社会贡献', '个人成长'] },
        { id: 5, text: '你更愿意？', options: ['独立创业', '团队合作', '跟随领导'] },
      ]
    },
  ]

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers({ ...answers, [`${currentTest}_${questionId}`]: answerIndex })
  }

  const calculateResults = () => {
    // 简单的评分逻辑，实际应该更复杂
    const scores: Record<string, number> = {}
    Object.keys(answers).forEach(key => {
      const [testId] = key.split('_')
      scores[testId] = (scores[testId] || 0) + answers[key]
    })
    setResults(scores)
  }

  const selectedAssessment = assessments.find(a => a.id === currentTest)

  return (
    <section id="assessment" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">专业评测</h2>
          <p className="text-xl text-[#98989D] max-w-2xl mx-auto">
            通过科学的测评体系，深入了解自己的兴趣爱好、性格特质、能力水平和价值观
          </p>
        </motion.div>

        {!currentTest ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {assessments.map((assessment) => {
              const Icon = assessment.icon
              return (
                <motion.div
                  key={assessment.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  onClick={() => setCurrentTest(assessment.id)}
                  className="card cursor-pointer hover:border-[#007AFF] transition-all"
                >
                  <Icon className="w-12 h-12 text-[#007AFF] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{assessment.title}</h3>
                  <p className="text-[#98989D] text-sm">{assessment.description}</p>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="card">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-semibold">{selectedAssessment?.title}</h3>
                <button
                  onClick={() => {
                    setCurrentTest(null)
                    setAnswers({})
                    setResults(null)
                  }}
                  className="text-[#98989D] hover:text-white"
                >
                  返回
                </button>
              </div>

              {!results ? (
                <>
                  <div className="space-y-8">
                    {selectedAssessment?.questions.map((question, qIndex) => (
                      <div key={question.id}>
                        <p className="text-lg mb-4">
                          {qIndex + 1}. {question.text}
                        </p>
                        <div className="space-y-3">
                          {question.options.map((option, oIndex) => (
                            <button
                              key={oIndex}
                              onClick={() => handleAnswer(question.id, oIndex)}
                              className={`w-full text-left p-4 rounded-lg border transition-all ${
                                answers[`${currentTest}_${question.id}`] === oIndex
                                  ? 'border-[#007AFF] bg-[#007AFF]/10'
                                  : 'border-[#38383A] hover:border-[#48484A]'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={calculateResults}
                    disabled={Object.keys(answers).length < (selectedAssessment?.questions.length || 0)}
                    className="btn btn-primary w-full mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    查看结果
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <h4 className="text-2xl font-semibold mb-4">测评完成</h4>
                  <p className="text-[#98989D] mb-6">
                    你的测评结果已保存，将用于后续的专业推荐
                  </p>
                  <button
                    onClick={() => {
                      setCurrentTest(null)
                      setResults(null)
                      setAnswers({})
                    }}
                    className="btn btn-primary"
                  >
                    继续其他测评
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
