'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Star, MapPin, TrendingUp, ExternalLink, DollarSign, Briefcase, Users } from 'lucide-react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { generateRecommendations, type Major, type University, type QuestionnaireAnswers } from '@/lib/recommendation'

export default function RecommendationSection() {
  const [recommendations, setRecommendations] = useState<{
    majors: Major[]
    universities: University[]
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null)

  const generateRecommendationsFromAnswers = async () => {
    setLoading(true)
    
    // 从localStorage获取问卷答案
    const savedAnswers = localStorage.getItem('questionnaireAnswers')
    let answers: QuestionnaireAnswers = {}
    
    if (savedAnswers) {
      try {
        answers = JSON.parse(savedAnswers)
      } catch (e) {
        console.error('Failed to parse saved answers', e)
      }
    }
    
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 生成推荐
    const result = generateRecommendations(answers)
    setRecommendations(result)
    setLoading(false)
  }

  useEffect(() => {
    // 检查是否有保存的问卷答案
    const savedAnswers = localStorage.getItem('questionnaireAnswers')
    if (savedAnswers) {
      const answers = JSON.parse(savedAnswers)
      // 如果问卷已完成，自动生成推荐
      if (Object.keys(answers).length >= 5) {
        generateRecommendationsFromAnswers()
      }
    }
  }, [])

  // 准备雷达图数据
  const getRadarData = (major: Major) => {
    return [
      { subject: '匹配度', value: major.matchScore, fullMark: 100 },
      { subject: '薪资水平', value: (major.salary.mid / 30000) * 100, fullMark: 100 },
      { subject: '就业前景', value: 90, fullMark: 100 },
      { subject: '发展空间', value: 85, fullMark: 100 },
    ]
  }

  // 准备薪资对比数据
  const getSalaryData = () => {
    if (!recommendations) return []
    return recommendations.majors.map(major => ({
      name: major.name.length > 6 ? major.name.substring(0, 6) + '...' : major.name,
      初级: major.salary.entry,
      中级: major.salary.mid,
      高级: major.salary.senior,
    }))
  }

  return (
    <section id="recommendation" className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-[#007AFF]" />
            <h2 className="text-5xl font-bold">精准推荐</h2>
          </div>
          <p className="text-xl text-[#98989D] max-w-2xl mx-auto">
            基于你的测评结果和问卷回答，AI为你推荐最适合的专业和大学
          </p>
        </motion.div>

        {!recommendations ? (
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateRecommendationsFromAnswers}
              disabled={loading}
              className="btn btn-primary text-lg px-8 py-4 disabled:opacity-50"
            >
              {loading ? '生成推荐中...' : '生成个性化推荐'}
            </motion.button>
            <p className="text-[#98989D] mt-4">
              请先完成专业评测和智能问卷，以获得更精准的推荐
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* 数据可视化 */}
            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <h3 className="text-xl font-semibold mb-6">专业薪资对比</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getSalaryData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" />
                    <XAxis dataKey="name" stroke="#98989D" fontSize={12} />
                    <YAxis stroke="#98989D" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1C1C1E',
                        border: '1px solid #2C2C2E',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="初级" fill="#007AFF" />
                    <Bar dataKey="中级" fill="#AF52DE" />
                    <Bar dataKey="高级" fill="#FF2D55" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {selectedMajor && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <h3 className="text-xl font-semibold mb-6">{selectedMajor.name} - 综合评估</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={getRadarData(selectedMajor)}>
                      <PolarGrid stroke="#2C2C2E" />
                      <PolarAngleAxis dataKey="subject" stroke="#98989D" fontSize={12} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#98989D" />
                      <Radar
                        name="评估"
                        dataKey="value"
                        stroke="#007AFF"
                        fill="#007AFF"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </motion.div>
              )}
            </div>

            {/* 专业推荐 */}
            <div>
              <h3 className="text-3xl font-bold mb-8">推荐专业</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.majors.map((major, index) => (
                  <motion.div
                    key={major.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedMajor(major)}
                    className={`card hover:border-[#007AFF] transition-all cursor-pointer ${
                      selectedMajor?.id === major.id ? 'border-[#007AFF]' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-semibold mb-1">{major.name}</h4>
                        <span className="text-sm text-[#98989D]">{major.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#007AFF]">{major.matchScore}</div>
                        <div className="text-xs text-[#98989D]">匹配度</div>
                      </div>
                    </div>
                    <p className="text-[#98989D] mb-4 text-sm leading-relaxed">{major.description}</p>
                    
                    {/* 匹配原因 */}
                    {major.matchReasons.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-[#98989D] mb-2">匹配原因：</p>
                        <ul className="space-y-1">
                          {major.matchReasons.slice(0, 2).map((reason, i) => (
                            <li key={i} className="text-xs text-[#007AFF] flex items-start">
                              <span className="mr-1">•</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2 text-sm mb-4">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-green-500">{major.futureProspect}</span>
                    </div>
                    
                    {/* 薪资信息 */}
                    <div className="mb-4 p-3 bg-[#2C2C2E] rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="w-4 h-4 text-[#007AFF]" />
                        <span className="text-sm font-medium">薪资水平</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <div className="text-[#98989D]">初级</div>
                          <div className="font-semibold">¥{major.salary.entry.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-[#98989D]">中级</div>
                          <div className="font-semibold">¥{major.salary.mid.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-[#98989D]">高级</div>
                          <div className="font-semibold">¥{major.salary.senior.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-[#2C2C2E]">
                      <p className="text-xs text-[#98989D] mb-2">相关专业：</p>
                      <div className="flex flex-wrap gap-2">
                        {major.relatedMajors.map(related => (
                          <span
                            key={related}
                            className="px-2 py-1 bg-[#2C2C2E] rounded text-xs"
                          >
                            {related}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 专业详细信息 */}
            {selectedMajor && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <h3 className="text-2xl font-semibold mb-6">{selectedMajor.name} - 详细信息</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                      <Briefcase className="w-5 h-5 text-[#007AFF]" />
                      <span>工作内容</span>
                    </h4>
                    <ul className="space-y-2">
                      {selectedMajor.workContent.map((content, i) => (
                        <li key={i} className="flex items-start space-x-2 text-[#98989D]">
                          <span className="text-[#007AFF] mt-1">•</span>
                          <span>{content}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-[#007AFF]" />
                      <span>职业发展路径</span>
                    </h4>
                    <div className="space-y-2">
                      {selectedMajor.careerPath.map((path, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-[#007AFF] flex items-center justify-center text-xs font-semibold">
                            {i + 1}
                          </div>
                          <span className="text-[#98989D]">{path}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-[#007AFF]" />
                      <span>主要就业城市</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMajor.cities.map(city => (
                        <span
                          key={city}
                          className="px-3 py-1 bg-[#2C2C2E] rounded-lg text-sm"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                      <Users className="w-5 h-5 text-[#007AFF]" />
                      <span>匹配原因</span>
                    </h4>
                    <ul className="space-y-2">
                      {selectedMajor.matchReasons.map((reason, i) => (
                        <li key={i} className="flex items-start space-x-2 text-[#98989D]">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 大学推荐 */}
            <div>
              <h3 className="text-3xl font-bold mb-8">推荐大学</h3>
              <div className="space-y-4">
                {recommendations.universities.map((university, index) => (
                  <motion.div
                    key={university.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card hover:border-[#007AFF] transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h4 className="text-2xl font-semibold">{university.name}</h4>
                          {university.ranking && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm text-[#98989D]">排名 #{university.ranking}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-6 mb-4">
                          <div className="flex items-center space-x-2 text-[#98989D]">
                            <MapPin className="w-4 h-4" />
                            <span>{university.city}</span>
                          </div>
                          <span className="px-3 py-1 bg-[#007AFF]/20 text-[#007AFF] rounded-full text-sm">
                            {university.level}
                          </span>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm text-[#98989D] mb-2">开设相关专业：</p>
                          <div className="flex flex-wrap gap-2">
                            {university.majors.map(major => (
                              <span
                                key={major}
                                className="px-3 py-1 bg-[#2C2C2E] rounded-lg text-sm"
                              >
                                {major}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="ml-6 text-right">
                        <div className="text-3xl font-bold text-[#007AFF] mb-1">
                          {university.matchScore}
                        </div>
                        <div className="text-sm text-[#98989D]">匹配度</div>
                        <button className="mt-4 btn btn-secondary text-sm px-4 py-2">
                          查看详情
                          <ExternalLink className="w-3 h-3 ml-1 inline" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
