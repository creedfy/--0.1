import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, Select, DatePicker, Space, Tag } from 'antd';
import { FileTextOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';

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
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [form] = Form.useForm();

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

  const handleGenerateReport = () => {
    form.resetFields();
    setIsPreviewVisible(true);
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
      // 实现生成报告的逻辑
      console.log('生成报告:', values);
      setIsPreviewVisible(false);
    });
  };

  return (
    <div>
      <Card
        title="报告管理"
        extra={
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            onClick={handleGenerateReport}
          >
            生成报告
          </Button>
        }
      >
        <Table columns={columns} dataSource={reports} />
      </Card>

      <Modal
        title="生成报告"
        open={isPreviewVisible}
        onOk={handleModalOk}
        onCancel={() => setIsPreviewVisible(false)}
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
            <Select>
              <Select.Option value="离心泵-01">离心泵-01</Select.Option>
              <Select.Option value="电机-02">电机-02</Select.Option>
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