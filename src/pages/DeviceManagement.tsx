import React, { useState } from 'react';
import { Table, Card, Button, Tag, Space, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

type DeviceStatus = 'normal' | 'warning' | 'critical';

interface DeviceData {
  key: string;
  name: string;
  type: string;
  location: string;
  status: DeviceStatus;
  lastMaintenance: string;
}

const DeviceManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 模拟设备数据
  const [devices] = useState<DeviceData[]>([
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
  ]);

  const columns = [
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '设备类型',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: '安装位置',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: DeviceStatus) => {
        const statusMap = {
          normal: { color: '#52c41a', text: '正常' },
          warning: { color: '#faad14', text: '预警' },
          critical: { color: '#ff4d4f', text: '故障' }
        };
        return <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>;
      }
    },
    {
      title: '上次维护时间',
      dataIndex: 'lastMaintenance',
      key: 'lastMaintenance'
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: DeviceData) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      )
    }
  ];

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: DeviceData) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: DeviceData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除设备 ${record.name} 吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        // 实现删除逻辑
        console.log('删除设备:', record);
      }
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      // 实现保存逻辑
      console.log('保存设备:', values);
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Card
        title="设备管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加设备
          </Button>
        }
      >
        <Table columns={columns} dataSource={devices} />
      </Card>

      <Modal
        title="设备信息"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText="确认"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="设备名称"
            rules={[{ required: true, message: '请输入设备名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="设备类型"
            rules={[{ required: true, message: '请选择设备类型' }]}
          >
            <Select>
              <Select.Option value="离心泵">离心泵</Select.Option>
              <Select.Option value="电机">电机</Select.Option>
              <Select.Option value="风机">风机</Select.Option>
              <Select.Option value="压缩机">压缩机</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="location"
            label="安装位置"
            rules={[{ required: true, message: '请输入安装位置' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="运行状态"
            rules={[{ required: true, message: '请选择运行状态' }]}
          >
            <Select>
              <Select.Option value="normal">正常</Select.Option>
              <Select.Option value="warning">预警</Select.Option>
              <Select.Option value="critical">故障</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="lastMaintenance"
            label="上次维护时间"
            rules={[{ required: true, message: '请输入上次维护时间' }]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeviceManagement;