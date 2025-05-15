import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, DatePicker, Space, Tag } from 'antd';
import { PlusOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';

type MaintenanceStatus = 'pending' | 'completed' | 'overdue';

interface MaintenanceTask {
  key: string;
  deviceName: string;
  taskType: string;
  plannedDate: string;
  status: MaintenanceStatus;
  assignee: string;
  description: string;
}

const MaintenancePlan: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 模拟维护任务数据
  const [tasks] = useState<MaintenanceTask[]>([
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
  ]);

  const columns = [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName'
    },
    {
      title: '任务类型',
      dataIndex: 'taskType',
      key: 'taskType'
    },
    {
      title: '计划日期',
      dataIndex: 'plannedDate',
      key: 'plannedDate'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: MaintenanceStatus) => {
        const statusMap = {
          pending: { color: '#1890ff', text: '待执行' },
          completed: { color: '#52c41a', text: '已完成' },
          overdue: { color: '#ff4d4f', text: '已逾期' }
        };
        return <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>;
      }
    },
    {
      title: '负责人',
      dataIndex: 'assignee',
      key: 'assignee'
    },
    {
      title: '任务描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: MaintenanceTask) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          {record.status === 'pending' && (
            <Button
              type="text"
              icon={<CheckOutlined />}
              onClick={() => handleComplete(record)}
            >
              完成
            </Button>
          )}
        </Space>
      )
    }
  ];

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: MaintenanceTask) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleComplete = (record: MaintenanceTask) => {
    Modal.confirm({
      title: '确认完成',
      content: `确认将任务 ${record.deviceName} - ${record.taskType} 标记为已完成？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        // 实现完成任务的逻辑
        console.log('完成任务:', record);
      }
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      // 实现保存逻辑
      console.log('保存任务:', values);
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Card
        title="维护计划"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加计划
          </Button>
        }
      >
        <Table columns={columns} dataSource={tasks} />
      </Card>

      <Modal
        title="维护任务"
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
            name="taskType"
            label="任务类型"
            rules={[{ required: true, message: '请选择任务类型' }]}
          >
            <Select>
              <Select.Option value="定期检查">定期检查</Select.Option>
              <Select.Option value="预防性维护">预防性维护</Select.Option>
              <Select.Option value="故障维修">故障维修</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="plannedDate"
            label="计划日期"
            rules={[{ required: true, message: '请选择计划日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="assignee"
            label="负责人"
            rules={[{ required: true, message: '请输入负责人' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="任务描述"
            rules={[{ required: true, message: '请输入任务描述' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MaintenancePlan;