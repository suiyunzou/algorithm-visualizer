# 算法可视化平台

算法可视化平台是一个交互式学习工具，旨在帮助用户通过可视化方式理解数据结构和算法。

## 功能特点

- 交互式数据结构可视化
- 算法步骤演示，支持可调节速度
- 详细的解释和复杂度分析
- 支持自定义输入，实现动手学习
- 响应式设计，适配多种设备

## 技术栈

- React
- TypeScript
- React Router
- Tailwind CSS
- React Icons

## 项目结构

```
src/
├── components/
│   ├── DataStructures/
│   │   └── Array.tsx
│   ├── Algorithms/
│   │   └── Sorting/
│   │       └── BubbleSort.tsx
│   └── Layout.tsx
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
   git clone https://github.com/your-username/algorithm-visualizer.git
   ```

2. 安装依赖：
   ```
   cd algorithm-visualizer
   npm install
   ```

3. 运行开发服务器：
   ```
   npm start
   ```

4. 在浏览器中打开 `http://localhost:3000` 查看应用。

## 使用指南

1. 在首页选择"探索数据结构"或"发现算法"
2. 在侧边栏中选择具体的数据结构或算法
3. 使用可视化界面和控制按钮来交互和学习
4. 调整设置以自定义学习体验

## 贡献

欢迎贡献代码、报告问题或提出新功能建议。请先开 issue 讨论您想要改变或添加的内容。

## 许可证

[MIT](https://choosealicense.com/licenses/mit/)

## 界面预览

### 首页
![首页](./public/images/home-preview.png)

### 数据结构可视化
![数据结构](./public/images/data-structure-preview.png)

### 算法动画
![算法](./public/images/algorithm-preview.png)


https://github.com/suiyunzou/algorithm-visualizer.git

   git remote add origin https://github.com/suiyunzou/algorithm-visualizer.git
   git remote set-url origin https://github.com/suiyunzou/algorithm-visualizer.git