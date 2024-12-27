# 算法可视化平台

算法可视化平台是一个交互式学习工具，旨在帮助用户通过可视化方式理解数据结构和算法。

## 功能特点

- 交互式数据结构可视化
- 算法步骤演示，支持可调节速度
- 详细的解释和复杂度分析
- 支持自定义输入，实现动手学习
- 响应式设计，适配多种设备
- AI 助手功能，提供智能问答支持

## AI 助手功能

平台集成了强大的 AI 助手功能，支持：

- OpenAI (GPT-4/GPT-3.5)
- Google Gemini
- Anthropic Claude

AI 助手可以：
- 回答算法和数据结构相关问题
- 解释代码的工作原理
- 提供编程建议和最佳实践
- 帮助调试和优化代码

注意：使用 AI 助手功能需要配置相应的 API 密钥。

## 技术栈

- React
- TypeScript
- React Router
- Tailwind CSS
- React Icons
- React Markdown
- Syntax Highlighter
- OpenAI/Google/Claude API

## 项目结构

```
src/
├── components/
│   ├── DataStructures/
│   │   └── Array.tsx
│   ├── Algorithms/
│   │   └── Sorting/
│   │       └── BubbleSort.tsx
│   ├── AIChat/
│   │   └── AIChat.tsx
│   └── Layout.tsx
├── services/
│   └── configService.ts
├── pages/
│   ├── Home.tsx
│   ├── DataStructures.tsx
│   ├── Algorithms.tsx
│   └── About.tsx
├── styles/
│   └── tailwind.css
├── App.tsx
└── index.tsx
```

## 安装和运行

1. 克隆仓库：
   ```
   git clone https://github.com/suiyunzou/algorithm-visualizer.git
   ```

2. 安装依赖：
   ```
   cd algorithm-visualizer
   npm install
   ```

3. 启动开发服务器：
   ```
   npm start
   ```

4. 在浏览器中访问：
   ```
   http://localhost:3000
   ```

## AI 助手配置

要使用 AI 助手功能，您需要：

1. 获取所需的 API 密钥：
   - OpenAI API 密钥：https://platform.openai.com
   - Google AI API 密钥：https://makersuite.google.com
   - Claude API 密钥：https://console.anthropic.com

2. 在应用中配置：
   - 点击 AI 助手界面右上角的设置图标
   - 输入对应服务的 API 密钥
   - 选择想要使用的 AI 模型

注意：API 密钥仅保存在浏览器内存中，刷新页面后需要重新输入。

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 界面预览

### 首页

![image](https://github.com/user-attachments/assets/5dab4fba-68a7-4793-b4c4-c3d6bb359369)
![image](https://github.com/user-attachments/assets/34a61191-af6d-4b0c-a350-b28b1b55d6a9)


### 数据结构可视化
![image](https://github.com/user-attachments/assets/5cbf7fad-cfec-494d-abcd-440704e2e7a8)


### 算法动画
![image](https://github.com/user-attachments/assets/037d8f1b-58f9-486e-8c2a-17ac8fd8f3b5)
