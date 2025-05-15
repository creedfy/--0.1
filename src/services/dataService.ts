import { DeviceData, VibrationData, MaintenanceTask, NotificationItem } from '../types';

// 模拟后端API响应延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 设备数据服务
export const deviceService = {
  // 获取设备列表
  async getDevices(): Promise<DeviceData[]> {
    await delay(500);
    return [
      {
        key: '1',
        name: '离心泵-01',
        type: '离心泵',
        location: '1号车间',
        status: 'normal',
        lastMaintenance: '2023-12-01'
      },
      {
        key: '2',
        name: '电机-02',
        type: '电机',
        location: '2号车间',
        status: 'warning',
        lastMaintenance: '2023-11-15'
      }
    ];
  },

  // 获取设备振动数据
  async getVibrationData(deviceId: string): Promise<VibrationData[]> {
    await delay(500);
    return [
      { timestamp: '08:00', amplitude: 2.5, frequency: 50, temperature: 45 },
      { timestamp: '09:00', amplitude: 2.8, frequency: 52, temperature: 46 },
      { timestamp: '10:00', amplitude: 3.2, frequency: 55, temperature: 48 },
      { timestamp: '11:00', amplitude: 2.9, frequency: 53, temperature: 47 },
      { timestamp: '12:00', amplitude: 3.0, frequency: 54, temperature: 48 }
    ];
  }
};

// 维护计划服务
export const maintenanceService = {
  // 获取维护任务列表
  async getTasks(): Promise<MaintenanceTask[]> {
    await delay(500);
    return [
      {
        key: '1',
        deviceName: '离心泵-01',
        taskType: '定期检查',
        plannedDate: '2023-12-20',
        status: 'pending',
        assignee: '张工',
        description: '检查轴承磨损情况，测量振动值'
      },
      {
        key: '2',
        deviceName: '电机-02',
        taskType: '预防性维护',
        plannedDate: '2023-12-15',
        status: 'completed',
        assignee: '李工',
        description: '更换润滑油，检查电机运行参数'
      }
    ];
  }
};

// 通知服务
export const notificationService = {
  // 获取通知列表
  async getNotifications(): Promise<NotificationItem[]> {
    await delay(500);
    return [
      {
        id: '1',
        title: '设备预警',
        description: '设备ID: VIB001 振动值超过阈值',
        read: false
      }
    ];
  },

  // 标记通知为已读
  async markAsRead(notificationId: string): Promise<void> {
    await delay(300);
    console.log(`标记通知 ${notificationId} 为已读`);
  }
};