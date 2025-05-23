// 全局类型定义

// 用户角色类型
export type Role = 'developer' | 'admin' | 'guest';

// 用户接口
export interface User {
  id: string;
  username: string;
  role: Role;
  password?: string; // 仅用于模拟认证
}


// 设备状态类型
export type DeviceStatus = 'normal' | 'warning' | 'critical';

// 设备数据接口
export interface DeviceData {
  key: string;
  name: string;
  type: string;
  location: string;
  status: DeviceStatus;
  lastMaintenance: string;
}

// 振动数据接口
export interface VibrationData {
  timestamp: string;
  amplitude: number;
  frequency: number;
  temperature: number;
}

// 维护任务状态类型
export type MaintenanceStatus = 'pending' | 'completed' | 'overdue';

// 维护任务接口
export interface MaintenanceTask {
  key: string;
  deviceName: string;
  taskType: string;
  plannedDate: string;
  status: MaintenanceStatus;
  assignee: string;
  description: string;
}

// 通知项接口
export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  read: boolean;
}

// 知识库条目内容类型
export type KnowledgeBaseContentType = 'text' | 'video' | 'database_info';

// 知识库条目接口
export interface KnowledgeBaseEntry {
  id: string;
  title: string;
  type: KnowledgeBaseContentType; // 内容类型
  content: string; // 根据type存储不同内容：Markdown文本、视频URL、数据库信息文本
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// 报告配置接口 (用于生成高级报告)
export interface ReportConfig {
  deviceId: string;
  reportType: string;
  timeRange: [string, string];
  includeKnowledgeBase: boolean;
  // ... 其他报告生成相关配置
}