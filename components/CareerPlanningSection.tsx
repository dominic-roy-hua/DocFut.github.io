'use client'

import { motion } from 'framer-motion'
import { Target, GraduationCap, Briefcase, TrendingUp, Calendar } from 'lucide-react'

export default function CareerPlanningSection() {
  const planningStages = [
    {
      stage: '大学阶段',
      icon: GraduationCap,
      timeline: '4年',
      goals: [
        '完成专业课程学习，掌握核心技能',
        '参与科研项目或实习实践',
        '考取相关职业资格证书',
        '建立专业人脉网络',
        '明确职业发展方向'
      ],
      tips: '注重理论与实践结合，多参与项目实践'
    },
    {
      stage: '研究生阶段（可选）',
      icon: Target,
      timeline: '2-3年',
      goals: [
        '深化专业领域研究',
        '发表学术论文或专利',
        '参与行业前沿项目',
        '积累项目管理和团队协作经验',
        '拓展国际视野'
      ],
      tips: '选择与未来职业方向相关的研究方向'
    },
    {
      stage: '职业初期',
      icon: Briefcase,
      timeline: '1-3年',
      goals: [
        '快速适应工作环境',
        '掌握岗位核心技能',
        '完成从学生到职场人的转变',
        '建立良好的职业口碑',
        '寻找职业导师'
      ],
      tips: '保持学习热情，主动承担有挑战性的任务'
    },
    {
      stage: '职业发展期',
      icon: TrendingUp,
      timeline: '3-10年',
      goals: [
        '成为领域专家或技术骨干',
        '承担更多责任和项目',
        '提升管理和领导能力',
        '建立个人品牌和影响力',
        '考虑职业转型或创业'
      ],
      tips: '持续学习新技能，关注行业发展趋势'
    },
  ]

  const futureTrends = [
    {
      title: '数字化转型',
      description: '人工智能、大数据、云计算等领域将持续快速发展',
      impact: '高'
    },
    {
      title: '绿色经济',
      description: '新能源、环保技术、可持续发展相关专业前景广阔',
      impact: '高'
    },
    {
      title: '健康医疗',
      description: '生物医药、健康管理、医疗科技需求持续增长',
      impact: '中高'
    },
    {
      title: '智能制造',
      description: '工业互联网、机器人、自动化技术应用广泛',
      impact: '中高'
    },
  ]

  return (
    <section id="planning" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">未来规划</h2>
          <p className="text-xl text-[#98989D] max-w-2xl mx-auto">
            基于十五五计划和中国未来发展趋势，为你规划清晰的职业发展路径
          </p>
        </motion.div>

        {/* 职业发展路径 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8">职业发展路径</h3>
          <div className="relative">
            {/* 时间线 */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#007AFF] via-[#AF52DE] to-[#FF2D55]" />
            
            <div className="space-y-12">
              {planningStages.map((stage, index) => {
                const Icon = stage.icon
                return (
                  <motion.div
                    key={stage.stage}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-24"
                  >
                    {/* 时间线节点 */}
                    <div className="absolute left-4 top-2 w-8 h-8 rounded-full bg-[#007AFF] border-4 border-black flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white" />
                    </div>

                    <div className="card">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-2xl font-semibold mb-2">{stage.stage}</h4>
                          <div className="flex items-center space-x-2 text-[#98989D]">
                            <Calendar className="w-4 h-4" />
                            <span>{stage.timeline}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-[#98989D] mb-3">主要目标：</p>
                        <ul className="space-y-2">
                          {stage.goals.map((goal, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <span className="text-[#007AFF] mt-1">•</span>
                              <span className="text-[#98989D]">{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-[#2C2C2E]">
                        <p className="text-sm">
                          <span className="text-[#007AFF] font-medium">💡 建议：</span>
                          <span className="text-[#98989D] ml-2">{stage.tips}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 未来趋势 */}
        <div>
          <h3 className="text-3xl font-bold mb-8">未来发展趋势</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {futureTrends.map((trend, index) => (
              <motion.div
                key={trend.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-xl font-semibold">{trend.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    trend.impact === '高' 
                      ? 'bg-green-500/20 text-green-500'
                      : 'bg-blue-500/20 text-blue-500'
                  }`}>
                    {trend.impact}影响
                  </span>
                </div>
                <p className="text-[#98989D]">{trend.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
