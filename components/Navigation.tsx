'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, BarChart3, FileText, Sparkles, TrendingUp, MessageSquare } from 'lucide-react'

interface NavigationProps {
  currentSection: string
  setCurrentSection: (section: string) => void
}

export default function Navigation({ currentSection, setCurrentSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'assessment', label: '专业评测', icon: BarChart3 },
    { id: 'questionnaire', label: '智能问卷', icon: FileText },
    { id: 'recommendation', label: '精准推荐', icon: Sparkles },
    { id: 'planning', label: '未来规划', icon: TrendingUp },
    { id: 'salary', label: '行情薪资', icon: GraduationCap },
    { id: 'ai-chat', label: 'AI咨询', icon: MessageSquare },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setCurrentSection(sectionId)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-[#2C2C2E]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-[#007AFF]" />
            <span className="text-xl font-semibold">大学专业推荐</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentSection === item.id
                      ? 'bg-[#007AFF] text-white'
                      : 'text-[#98989D] hover:text-white hover:bg-[#1C1C1E]'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
