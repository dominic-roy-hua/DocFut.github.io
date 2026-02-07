'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, MapPin, BarChart3 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

interface SalaryData {
  major: string
  entry: number
  mid: number
  senior: number
  growth: number
}

interface RegionSalary {
  region: string
  average: number
  top: number
}

export default function SalarySection() {
  const [selectedMajor, setSelectedMajor] = useState<string>('all')

  const salaryData: SalaryData[] = [
    {
      major: '人工智能',
      entry: 15000,
      mid: 30000,
      senior: 60000,
      growth: 25
    },
    {
      major: '数据科学与大数据技术',
      entry: 12000,
      mid: 25000,
      senior: 50000,
      growth: 22
    },
    {
      major: '新能源科学与工程',
      entry: 10000,
      mid: 20000,
      senior: 40000,
      growth: 20
    },
    {
      major: '计算机科学与技术',
      entry: 13000,
      mid: 28000,
      senior: 55000,
      growth: 23
    },
    {
      major: '软件工程',
      entry: 12000,
      mid: 26000,
      senior: 52000,
      growth: 24
    },
  ]

  const regionData: RegionSalary[] = [
    { region: '北京', average: 25000, top: 50000 },
    { region: '上海', average: 24000, top: 48000 },
    { region: '深圳', average: 23000, top: 46000 },
    { region: '杭州', average: 22000, top: 45000 },
    { region: '广州', average: 20000, top: 40000 },
    { region: '成都', average: 18000, top: 35000 },
  ]

  const careerProgression = [
    { year: '0-1年', salary: 12000 },
    { year: '1-3年', salary: 20000 },
    { year: '3-5年', salary: 30000 },
    { year: '5-10年', salary: 45000 },
    { year: '10年+', salary: 60000 },
  ]

  const displayData = selectedMajor === 'all' 
    ? salaryData 
    : salaryData.filter(d => d.major === selectedMajor)

  return (
    <section id="salary" className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <DollarSign className="w-8 h-8 text-[#007AFF]" />
            <h2 className="text-5xl font-bold">行情与薪资</h2>
          </div>
          <p className="text-xl text-[#98989D] max-w-2xl mx-auto">
            了解各专业的薪资水平和就业行情，为你的职业规划提供参考
          </p>
        </motion.div>

        {/* 专业筛选 */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedMajor('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedMajor === 'all'
                ? 'bg-[#007AFF] text-white'
                : 'bg-[#1C1C1E] text-[#98989D] hover:text-white'
            }`}
          >
            全部专业
          </button>
          {salaryData.map(major => (
            <button
              key={major.major}
              onClick={() => setSelectedMajor(major.major)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedMajor === major.major
                  ? 'bg-[#007AFF] text-white'
                  : 'bg-[#1C1C1E] text-[#98989D] hover:text-white'
              }`}
            >
              {major.major}
            </button>
          ))}
        </div>

        {/* 薪资对比图表 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-[#007AFF]" />
              <span>薪资水平对比</span>
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={displayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" />
                <XAxis dataKey="major" stroke="#98989D" fontSize={12} />
                <YAxis stroke="#98989D" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1C1C1E',
                    border: '1px solid #2C2C2E',
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }}
                />
                <Bar dataKey="entry" fill="#007AFF" name="初级" />
                <Bar dataKey="mid" fill="#AF52DE" name="中级" />
                <Bar dataKey="senior" fill="#FF2D55" name="高级" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-[#007AFF]" />
              <span>职业发展路径</span>
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={careerProgression}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" />
                <XAxis dataKey="year" stroke="#98989D" fontSize={12} />
                <YAxis stroke="#98989D" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1C1C1E',
                    border: '1px solid #2C2C2E',
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }}
                />
                <Line type="monotone" dataKey="salary" stroke="#007AFF" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* 地区薪资对比 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card mb-12"
        >
          <h3 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-[#007AFF]" />
            <span>地区薪资对比</span>
          </h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {regionData.map((region, index) => (
              <div key={region.region} className="text-center">
                <div className="text-lg font-semibold mb-2">{region.region}</div>
                <div className="text-2xl font-bold text-[#007AFF] mb-1">
                  ¥{region.average.toLocaleString()}
                </div>
                <div className="text-sm text-[#98989D]">
                  平均: {region.average.toLocaleString()}
                  <br />
                  最高: {region.top.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 专业详情卡片 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayData.map((major, index) => (
            <motion.div
              key={major.major}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <h4 className="text-xl font-semibold mb-4">{major.major}</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#98989D]">初级薪资</span>
                  <span className="text-lg font-semibold">¥{major.entry.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#98989D]">中级薪资</span>
                  <span className="text-lg font-semibold">¥{major.mid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#98989D]">高级薪资</span>
                  <span className="text-lg font-semibold">¥{major.senior.toLocaleString()}</span>
                </div>
                <div className="pt-3 border-t border-[#2C2C2E] flex items-center justify-between">
                  <span className="text-[#98989D]">年增长率</span>
                  <span className="text-green-500 font-semibold flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{major.growth}%</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
