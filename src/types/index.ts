// 全局类型定义

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