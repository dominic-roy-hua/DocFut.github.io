'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'

interface HeroProps {
  setCurrentSection: (section: string) => void
}

export default function Hero({ setCurrentSection }: HeroProps) {
  const scrollToAssessment = () => {
    const element = document.getElementById('assessment')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setCurrentSection('assessment')
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#007AFF]/10 via-[#AF52DE]/10 to-[#FF2D55]/10" />
      
      {/* 网格背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1C1C1E_1px,transparent_1px),linear-gradient(to_bottom,#1C1C1E_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#1C1C1E] border border-[#2C2C2E] mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#007AFF]" />
            <span className="text-sm text-[#98989D]">基于十五五计划 · 科学测评体系</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">找到最适合你的</span>
            <br />
            <span className="text-white">大学和专业</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#98989D] mb-12 max-w-3xl mx-auto leading-relaxed">
            通过科学的测评体系，了解自己的兴趣爱好和适合的专业方向
            <br />
            AI智能推荐，助你规划美好未来
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToAssessment}
              className="btn btn-primary text-lg px-8 py-4"
            >
              开始专业评测
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary text-lg px-8 py-4"
            >
              了解更多
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={scrollToAssessment}
            className="text-[#98989D] hover:text-white transition-colors"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
