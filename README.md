# 振动分析系统

一个基于React的工业设备振动分析和监控系统，用于设备状态监测、故障诊断和维护管理。

## 功能特点

- 设备管理：管理和监控工业设备的基本信息和运行状态
- 数据分析：实时监测和分析设备振动数据
- 维护计划：制定和管理设备维护计划，跟踪维护任务执行情况
- 报告管理：生成和管理设备运行报告、故障分析报告等

## GitHub 仓库

[https://github.com/creedfy/--0.1.git](https://github.com/creedfy/--0.1.git)

## 技术栈

- React 18
- TypeScript
- Ant Design 组件库
- Vite 构建工具

## 开发环境配置

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm run dev
```

3. 构建生产版本
```bash
npm run build
```

## 项目结构

```
src/
  ├── components/     # 公共组件
  ├── pages/          # 页面组件
  ├── services/       # API服务
  ├── types/          # TypeScript类型定义
  ├── utils/          # 工具函数
  ├── App.tsx         # 应用入口组件
  └── main.tsx        # 应用入口文件
```

## 主要功能模块

### 设备管理
- 设备信息管理
- 设备状态监控
- 设备类型配置

### 维护计划
- 维护任务创建和分配
- 任务状态跟踪
- 维护记录管理

### 报告管理
- 设备运行报告
- 故障分析报告
- 维护记录报告