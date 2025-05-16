import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Select, DatePicker, Space, Tag, message } from 'antd';
import { FileTextOutlined, DownloadOutlined, EyeOutlined, ExperimentOutlined } from '@ant-design/icons';
import ReportGenerator from '../components/ReportGenerator';
import { ReportConfig, KnowledgeBaseEntry, DeviceData } from '../types';

// 模拟设备数据 (实际应用中应从API获取)
const mockDeviceData: DeviceData[] = [
  {
    key: 'dev1',
    name: '离心泵-01',
    type: '离心泵',
    location: '车间A',
    status: 'normal',
    lastMaintenance: '2023-10-15',
  },
  {
    key: 'dev2',
    name: '电机-02',
    type: '电机',
    location: '车间B',
    status: 'warning',
    lastMaintenance: '2023-09-20',
  },
  {
    key: 'dev3',
    name: '风机-03',
    type: '风机',
    location: '车间C',
    status: 'critical',
    lastMaintenance: '2023-11-01',
  },
];

// 模拟知识库数据 (实际应用中应从API获取或状态管理)
const mockKnowledgeBaseData: KnowledgeBaseEntry[] = [
  {
    id: 'kb1',
    title: '离心泵常见故障诊断',
    content: '### 1. 振动过大\n\n- **原因分析：** 叶轮不平衡、轴承损坏、联轴器不对中\n- **处理建议：** 校正平衡、更换轴承、重新对中',
    tags: ['离心泵', '故障诊断', '振动'],
    createdAt: '2023-10-15',
    updatedAt: '2023-10-16',
  },
  {
    id: 'kb2',
    title: '电机轴承异响处理',
    content: '### 症状：电机运行时有刺耳的金属摩擦声...',
    tags: ['电机', '轴承', '异响'],
    createdAt: '2023-11-01',
    updatedAt: '2023-11-05',
  },
];

type ReportStatus = 'normal' | 'warning' | 'critical';

interface Report {
  key: string;
  deviceName: string;
  reportType: string;
  generatedDate: string;
  status: ReportStatus;
  analyst: string;
}

const ReportManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Renamed from isPreviewVisible for clarity
  const [isReportGeneratorVisible, setIsReportGeneratorVisible] = useState(false);
  const [form] = Form.useForm();
  const [devices, setDevices] = useState<DeviceData[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseEntry[]>([]);

  // 模拟数据加载
  useEffect(() => {
    setDevices(mockDeviceData);
    setKnowledgeBase(mockKnowledgeBaseData);
  }, []);

  // 模拟报告数据
  const [reports] = useState<Report[]>([
    {
      key: '1',
      deviceName: '离心泵-01',
      reportType: '月度运行报告',
      generatedDate: '2023-11-30',
      status: 'normal',
      analyst: '张工'
    },
    {
      key: '2',
      deviceName: '电机-02',
      reportType: '故障分析报告',
      generatedDate: '2023-12-05',
      status: 'warning',
      analyst: '李工'
    }
  ]);

  const columns = [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName'
    },
    {
      title: '报告类型',
      dataIndex: 'reportType',
      key: 'reportType'
    },
    {
      title: '生成日期',
      dataIndex: 'generatedDate',
      key: 'generatedDate'
    },
    {
      title: '设备状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: ReportStatus) => {
        const statusMap = {
          normal: { color: '#52c41a', text: '正常' },
          warning: { color: '#faad14', text: '预警' },
          critical: { color: '#ff4d4f', text: '故障' }
        };
        return <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>;
      }
    },
    {
      title: '分析人员',
      dataIndex: 'analyst',
      key: 'analyst'
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Report) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handlePreview(record)}
          >
            预览
          </Button>
          <Button
            type="text"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(record)}
          >
            下载
          </Button>
        </Space>
      )
    }
  ];

  const handleGenerateSimpleReport = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleGenerateAdvancedReport = () => {
    setIsReportGeneratorVisible(true);
  };

  const handleAdvancedReportGenerated = (config: ReportConfig) => {
    console.log('高级报告配置:', config);
    // 在这里可以添加将报告保存到列表或进一步处理的逻辑
    message.success(`已提交生成 ${config.reportType} 关于设备 ${devices.find(d => d.key === config.deviceId)?.name} 的高级报告`);
    // 实际应用中可能会将新生成的报告添加到 reports 状态中
  };

  const handlePreview = (record: Report) => {
    // 实现报告预览逻辑
    console.log('预览报告:', record);
  };

  const handleDownload = (record: Report) => {
    // 实现报告下载逻辑
    console.log('下载报告:', record);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      // 实现生成简单报告的逻辑
      console.log('生成简单报告:', values);
      // 可以在这里将新报告添加到 reports 状态中
      message.success('简单报告已生成 (模拟)');
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Card
        title="报告管理"
        extra={
          <Space>
            <Button
              type="default"
              icon={<ExperimentOutlined />}
              onClick={handleGenerateAdvancedReport}
            >
              生成高级报告
            </Button>
            <Button
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            onClick={handleGenerateSimpleReport}
          >
            生成报告
          </Button>
        }
      >
        <Table columns={columns} dataSource={reports} />
      </Card>

      <Modal
        title="生成简单报告"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText="确认"
        cancelText="取消"
      >
        {/* ... (Form for simple report remains the same) ... */}
      </Modal>

      <ReportGenerator
        visible={isReportGeneratorVisible}
        onCancel={() => setIsReportGeneratorVisible(false)}
        onGenerate={handleAdvancedReportGenerated}
        devices={devices}
        knowledgeBase={knowledgeBase}
      />
    </div>
  );
};

export default ReportManagement;

      <Modal
        title="生成简单报告" // Changed title for clarity
        open={isModalVisible} // Changed from isPreviewVisible
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)} // Changed from setIsPreviewVisible
        okText="确认"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="deviceName"
            label="设备名称"
            rules={[{ required: true, message: '请选择设备' }]}
          >
            <Select placeholder="请选择设备">
              {devices.map(device => (
                <Select.Option key={device.key} value={device.name}>
                  {device.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="reportType"
            label="报告类型"
            rules={[{ required: true, message: '请选择报告类型' }]}
          >
            <Select>
              <Select.Option value="月度运行报告">月度运行报告</Select.Option>
              <Select.Option value="故障分析报告">故障分析报告</Select.Option>
              <Select.Option value="维护记录报告">维护记录报告</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dateRange"
            label="分析时间范围"
            rules={[{ required: true, message: '请选择时间范围' }]}
          >
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="analyst"
            label="分析人员"
            rules={[{ required: true, message: '请选择分析人员' }]}
          >
            <Select>
              <Select.Option value="张工">张工</Select.Option>
              <Select.Option value="李工">李工</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ReportManagement;