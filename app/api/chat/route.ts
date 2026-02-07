import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

// 系统提示词
const SYSTEM_PROMPT = `你是一位专业的大学和专业推荐咨询师，专门帮助高中毕业生选择适合的大学和专业。

你的职责：
1. 根据学生的兴趣爱好、性格特质、能力水平、家庭背景等信息，推荐合适的专业和大学
2. 详细介绍各专业的课程设置、就业前景、薪资水平、工作内容等
3. 结合中国十五五计划和发展趋势，分析专业前景
4. 提供职业规划建议和学习路径指导

回答要求：
- 专业、准确、客观
- 结合中国实际情况和最新政策
- 语言友好、易懂
- 提供具体的数据和建议
- 如果用户提供了问卷答案，要结合这些信息给出个性化建议

请用中文回答。`

export async function POST(request: NextRequest) {
  try {
    const { message, context, conversationHistory } = await request.json()

    // 获取用户问卷答案作为上下文
    let userContext = ''
    if (context && typeof context === 'object') {
      const contextParts: string[] = []
      if (context.questionnaireAnswers) {
        contextParts.push(`用户问卷答案：${JSON.stringify(context.questionnaireAnswers)}`)
      }
      if (context.assessmentResults) {
        contextParts.push(`用户测评结果：${JSON.stringify(context.assessmentResults)}`)
      }
      userContext = contextParts.join('\n')
    }

    // 构建消息历史
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPT + (userContext ? `\n\n用户背景信息：\n${userContext}` : '')
      }
    ]

    // 添加对话历史
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.forEach((msg: any) => {
        if (msg.role && msg.content) {
          messages.push({
            role: msg.role as 'user' | 'assistant',
            content: msg.content
          })
        }
      })
    }

    // 添加当前消息
    messages.push({
      role: 'user',
      content: message
    })

    // 调用OpenAI API
    let response: string
    if (process.env.OPENAI_API_KEY) {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini', // 使用更经济的模型
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000,
        })

        response = completion.choices[0]?.message?.content || '抱歉，我无法生成回复。'
      } catch (openaiError: any) {
        console.error('OpenAI API error:', openaiError)
        // 如果API调用失败，使用备用回复
        response = generateFallbackResponse(message)
      }
    } else {
      // 如果没有配置API Key，使用备用回复
      response = generateFallbackResponse(message)
    }

    return NextResponse.json({
      success: true,
      message: response,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { success: false, error: '处理请求时出错' },
      { status: 500 }
    )
  }
}

// 备用回复函数（当API不可用时）
function generateFallbackResponse(userInput: string): string {
  const lowerInput = userInput.toLowerCase()
  
  if (lowerInput.includes('人工智能') || lowerInput.includes('ai')) {
    return `人工智能是当前最热门的专业之一，也是十五五计划重点发展的领域。

**专业特点：**
- 结合计算机科学、数学、认知科学等多学科
- 注重算法设计、机器学习、深度学习等核心技术
- 实践性强，需要大量项目经验

**就业前景：**
- 市场需求旺盛，薪资水平较高（初级15k+，中级30k+，高级60k+）
- 可从事算法工程师、AI产品经理、数据科学家等职位
- 适合对数学和编程感兴趣的同学

**推荐院校：**
清华大学、北京大学、浙江大学、上海交通大学等都有很强的AI专业。

**工作内容：**
- 算法设计与优化
- 机器学习模型开发
- 自然语言处理
- 计算机视觉应用
- AI产品研发

你想了解这个专业的哪些具体方面呢？`
  }

  if (lowerInput.includes('薪资') || lowerInput.includes('工资') || lowerInput.includes('收入')) {
    return `根据最新数据，不同专业的薪资水平差异较大：

**高薪专业（月薪15k+）：**
- 人工智能：初级15k，中级30k，高级60k
- 数据科学与大数据技术：初级12k，中级25k，高级50k
- 计算机科学与技术：初级13k，中级28k，高级55k

**中高薪专业（月薪10-15k）：**
- 新能源科学与工程：初级10k，中级20k，高级40k
- 金融工程：初级11k，中级25k，高级50k

**影响因素：**
1. 城市：一线城市薪资普遍更高（北京、上海、深圳）
2. 学历：研究生学历起薪更高
3. 技能：掌握热门技术栈薪资更高
4. 经验：工作年限影响薪资增长

你想了解哪个专业的详细薪资情况？`
  }

  if (lowerInput.includes('推荐') || lowerInput.includes('适合')) {
    return `为了给你更精准的推荐，我建议你：

1. **完成专业评测** - 了解自己的兴趣爱好、性格特质、能力水平
2. **填写智能问卷** - 告诉我们你的梦想城市、家庭背景、职业目标等
3. **查看推荐结果** - 基于你的测评和问卷，我会为你推荐最适合的专业和大学

你也可以直接告诉我：
- 你的兴趣爱好是什么？
- 你更偏向理论研究还是实践应用？
- 你希望在哪个城市发展？
- 你对未来职业有什么期望？

我会根据你的情况给出个性化的推荐建议。`
  }

  return `感谢你的提问！作为AI咨询助手，我可以为你提供：

1. **专业解析** - 详细介绍各专业的课程设置、学习内容
2. **就业指导** - 分析就业前景、薪资水平、职业发展路径
3. **院校推荐** - 根据你的情况推荐合适的大学
4. **规划建议** - 制定个性化的学习和职业规划

你可以问我：
- "人工智能专业怎么样？"
- "哪些专业薪资比较高？"
- "根据我的情况推荐专业"
- "XX大学的XX专业如何？"

请告诉我你想了解什么？`
}
