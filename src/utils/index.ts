import { message } from 'antd';
import { DeviceStatus, MaintenanceStatus } from '../types';

// 设备状态映射
export const deviceStatusMap = {
  normal: { color: '#52c41a', text: '正常' },
  warning: { color: '#faad14', text: '预警' },
  critical: { color: '#ff4d4f', text: '故障' }
};

// 维护任务状态映射
export const maintenanceStatusMap = {
  pending: { color: '#1890ff', text: '待执行' },
  completed: { color: '#52c41a', text: '已完成' },
  overdue: { color: '#ff4d4f', text: '已逾期' }
};

// 统一的错误处理函数
export const handleError = (error: any) => {
  console.error('操作失败:', error);
  message.error('操作失败，请稍后重试');
};

// 日期格式化函数
export const formatDate = (date: string | Date) => {
  const d = new Date(date);
  return d.toLocaleDateString('zh-CN');
};

// 数据格式化函数
export const formatNumber = (num: number, precision: number = 2) => {
  return Number(num.toFixed(precision));
};

// 检查设备状态是否异常
export const isDeviceAbnormal = (status: DeviceStatus) => {
  return status === 'warning' || status === 'critical';
};

// 检查维护任务是否逾期
export const isTaskOverdue = (plannedDate: string) => {
  const now = new Date();
  const planned = new Date(plannedDate);
  return now > planned;
};