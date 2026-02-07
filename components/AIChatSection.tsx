'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, Bot, User, Sparkles } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是你的AI专业咨询助手。我可以帮助你：\n\n1. 解答关于专业和大学的疑问\n2. 提供个性化的职业规划建议\n3. 分析专业前景和就业趋势\n4. 根据你的情况推荐合适的专业\n\n请告诉我你想了解什么？',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput('')
    setIsLoading(true)

    try {
      // 获取用户上下文（问卷答案等）
      const questionnaireAnswers = localStorage.getItem('questionnaireAnswers')
      const context: any = {}
      
      if (questionnaireAnswers) {
        try {
          context.questionnaireAnswers = JSON.parse(questionnaireAnswers)
        } catch (e) {
          console.error('Failed to parse questionnaire answers', e)
        }
      }

      // 构建对话历史（只发送最近的10条消息）
      const recentMessages = messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      // 调用API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          context: context,
          conversationHistory: recentMessages
        }),
      })

      const data = await response.json()

      if (data.success) {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
      } else {
        throw new Error(data.error || '获取回复失败')
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '抱歉，我暂时无法回复。请稍后再试，或者你可以先完成专业评测和问卷，然后查看推荐结果。',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }


  const quickQuestions = [
    '人工智能专业前景如何？',
    '哪些专业薪资最高？',
    '根据我的情况推荐专业',
    '计算机和软件工程有什么区别？',
  ]

  return (
    <section id="ai-chat" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-[#007AFF]" />
            <h2 className="text-5xl font-bold">AI智能咨询</h2>
          </div>
          <p className="text-xl text-[#98989D]">
            与AI助手深度对话，获得个性化的专业和职业规划建议
          </p>
        </motion.div>

        <div className="card h-[600px] flex flex-col">
          {/* 消息区域 */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start space-x-3 max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user'
                          ? 'bg-[#007AFF]'
                          : 'bg-gradient-to-br from-[#007AFF] to-[#AF52DE]'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-[#007AFF] text-white'
                          : 'bg-[#2C2C2E] text-white'
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </p>
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp.toLocaleTimeString('zh-CN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start space-x-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#007AFF] to-[#AF52DE] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-[#2C2C2E] rounded-2xl px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-[#98989D] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-[#98989D] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-[#98989D] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 快捷问题 */}
          {messages.length === 1 && (
            <div className="mb-4">
              <p className="text-sm text-[#98989D] mb-2">快捷问题：</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => {
                      setInput(question)
                      setTimeout(() => handleSend(), 100)
                    }}
                    className="px-3 py-1.5 bg-[#2C2C2E] rounded-lg text-sm text-[#98989D] hover:text-white hover:bg-[#38383A] transition-all"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 输入区域 */}
          <div className="flex items-end space-x-3 pt-4 border-t border-[#2C2C2E]">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="输入你的问题..."
              className="flex-1 bg-[#2C2C2E] border border-[#38383A] rounded-xl px-4 py-3 text-white placeholder-[#98989D] resize-none focus:outline-none focus:border-[#007AFF]"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="w-11 h-11 rounded-xl bg-[#007AFF] flex items-center justify-center text-white hover:bg-[#0051D5] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
