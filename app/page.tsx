'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import Navigation from '@/components/Navigation'
import AssessmentSection from '@/components/AssessmentSection'
import QuestionnaireSection from '@/components/QuestionnaireSection'
import RecommendationSection from '@/components/RecommendationSection'
import CareerPlanningSection from '@/components/CareerPlanningSection'
import SalarySection from '@/components/SalarySection'
import AIChatSection from '@/components/AIChatSection'

export default function Home() {
  const [currentSection, setCurrentSection] = useState('hero')

  return (
    <main className="min-h-screen bg-black">
      <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero setCurrentSection={setCurrentSection} />
        <AssessmentSection />
        <QuestionnaireSection />
        <RecommendationSection />
        <CareerPlanningSection />
        <SalarySection />
        <AIChatSection />
      </motion.div>
    </main>
  )
}
