import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '大学专业推荐平台 - 科学测评，精准推荐',
  description: '基于十五五计划和中国未来发展趋势，为高中毕业生提供专业的大学和专业推荐服务',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
