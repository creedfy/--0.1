import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, Space, Tag, message, Select } from 'antd';
const { Option } = Select;
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { KnowledgeBaseEntry, KnowledgeBaseContentType } from '../types';

const { TextArea } = Input;

const initialKnowledgeBaseData: KnowledgeBaseEntry[] = [
  {
    id: 'kb1',
    title: '离心泵常见故障诊断',
    type: 'text',
    content: '### 1. 振动过大\n\n- **原因分析：** 叶轮不平衡、轴承损坏、联轴器不对中\n- **处理建议：** 校正平衡、更换轴承、重新对中',
    tags: ['离心泵', '故障诊断', '振动'],
    createdAt: '2023-10-15',
    updatedAt: '2023-10-16',
  },
  {
    id: 'kb2',
    title: '电机轴承异响处理',
    type: 'text',
    content: '### 症状：电机运行时有刺耳的金属摩擦声\n\n- **可能原因：**\n  1. 轴承缺油或润滑不良\n  2. 轴承内外圈破损\n  3. 轴承滚珠/滚柱损坏\n- **排查步骤：**\n  1. 检查润滑情况，按规定加油\n  2. 听诊判断异响部位\n  3. 拆解检查轴承状况',
    tags: ['电机', '轴承', '异响'],
    createdAt: '2023-11-01',
    updatedAt: '2023-11-05',
  },
  {
    id: 'kb3',
    title: '设备维护视频教程 - 更换联轴器',
    type: 'video',
    content: 'https://www.youtube.com/watch?v=exampleVideoId', // 示例视频链接
    tags: ['视频教程', '联轴器', '维护'],
    createdAt: '2023-11-10',
    updatedAt: '2023-11-10',
  },
  {
    id: 'kb4',
    title: '重要参数数据库表结构说明',
    type: 'database_info',
    content: '数据库名: VibrationData\n表名: SensorReadings\n字段:\n  - sensor_id (VARCHAR(255), PK)\n  - timestamp (DATETIME, PK)\n  - temperature (FLOAT)\n  - vibration_x (FLOAT)\n  - vibration_y (FLOAT)\n  - vibration_z (FLOAT)',
    tags: ['数据库', '参数', '表结构'],
    createdAt: '2023-11-15',
    updatedAt: '2023-11-15',
  },
];

// Helper function to render content based on type
const renderContent = (entry: KnowledgeBaseEntry) => {
  switch (entry.type) {
    case 'text':
      return <ReactMarkdown>{entry.content}</ReactMarkdown>;
    case 'video':
      // Basic video link display, consider embedding an iframe for actual playback
      return <a href={entry.content} target="_blank" rel="noopener noreferrer">观看视频: {entry.content}</a>;
    case 'database_info':
      return <pre>{entry.content}</pre>; // Display as preformatted text
    default:
      return <p>未知内容类型</p>;
  }
};

const initialKnowledgeBaseData: KnowledgeBaseEntry[] = [
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
    content: '### 症状：电机运行时有刺耳的金属摩擦声\n\n- **可能原因：**\n  1. 轴承缺油或润滑不良\n  2. 轴承内外圈破损\n  3. 轴承滚珠/滚柱损坏\n- **排查步骤：**\n  1. 检查润滑情况，按规定加油\n  2. 听诊判断异响部位\n  3. 拆解检查轴承状况',
    tags: ['电机', '轴承', '异响'],
    createdAt: '2023-11-01',
    updatedAt: '2023-11-05',
  },
];

const KnowledgeBase: React.FC = () => {
  const [knowledgeEntries, setKnowledgeEntries] = useState<KnowledgeBaseEntry[]>(initialKnowledgeBaseData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [editingEntry, setEditingEntry] = useState<KnowledgeBaseEntry | null>(null);
  const [viewingEntry, setViewingEntry] = useState<KnowledgeBaseEntry | null>(null);
  const [form] = Form.useForm();
  const [currentContentType, setCurrentContentType] = useState<KnowledgeBaseContentType>('text');

  const handleAdd = () => {
    setEditingEntry(null);
    form.resetFields();
    form.setFieldsValue({ type: 'text' }); // Default to text when adding
    setCurrentContentType('text');
    setIsModalVisible(true);
  };

  const handleEdit = (entry: KnowledgeBaseEntry) => {
    setEditingEntry(entry);
    form.setFieldsValue({
      ...entry,
      tags: entry.tags?.join(','), // Convert tags array to comma-separated string for form input
    });
    setCurrentContentType(entry.type);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setKnowledgeEntries(knowledgeEntries.filter(entry => entry.id !== id));
    message.success('知识条目删除成功');
  };

  const handleView = (entry: KnowledgeBaseEntry) => {
    setViewingEntry(entry);
    setIsViewModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(rawValues => {
      const values = {
        ...rawValues,
        tags: rawValues.tags ? rawValues.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) : [],
      };
      if (editingEntry) {
        setKnowledgeEntries(
          knowledgeEntries.map(entry =>
            entry.id === editingEntry.id ? { ...entry, ...values, updatedAt: new Date().toISOString().split('T')[0] } : entry
          )
        );
        message.success('知识条目更新成功');
      } else {
        setKnowledgeEntries([
          ...knowledgeEntries,
          { ...values, id: `kb${Date.now()}`, createdAt: new Date().toISOString().split('T')[0], updatedAt: new Date().toISOString().split('T')[0] },
        ]);
        message.success('知识条目添加成功');
      }
      setIsModalVisible(false);
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: '25%',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: '10%',
      render: (type: KnowledgeBaseContentType) => {
        let color = 'geekblue';
        let text = type.toUpperCase();
        if (type === 'video') color = 'volcano';
        else if (type === 'database_info') color = 'green';
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      width: '20%',
      render: (tags: string[]) => (
        <>
          {tags?.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '15%',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '15%',
    },
    {
      title: '操作',
      key: 'action',
      width: '15%',
      render: (_: any, record: KnowledgeBaseEntry) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => handleView(record)}>预览</Button>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>编辑</Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card
        title="知识库管理"
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>添加知识条目</Button>}
      >
        <Table columns={columns} dataSource={knowledgeEntries} rowKey="id" />
      </Card>

      <Modal
        title={editingEntry ? '编辑知识条目' : '添加知识条目'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical" initialValues={{ type: 'text' }}>
          <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="内容类型" rules={[{ required: true, message: '请选择内容类型' }]}>
            <Select onChange={(value) => setCurrentContentType(value as KnowledgeBaseContentType)}>
              <Option value="text">文字 (Markdown)</Option>
              <Option value="video">视频链接</Option>
              <Option value="database_info">数据库信息</Option>
            </Select>
          </Form.Item>
          <Form.Item 
            name="content" 
            label={currentContentType === 'text' ? '内容 (Markdown)' : currentContentType === 'video' ? '视频链接 (URL)' : '数据库相关信息'} 
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <TextArea 
              rows={10} 
              placeholder={
                currentContentType === 'text' ? '使用Markdown格式编写内容' : 
                currentContentType === 'video' ? '请输入视频的完整URL，例如 https://www.youtube.com/watch?v=...' : 
                '请输入数据库相关信息，例如表结构、重要查询语句等'
              }
            />
          </Form.Item>
          <Form.Item name="tags" label="标签 (逗号分隔)">
            <Input placeholder="例如: 离心泵,故障,振动" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={viewingEntry?.title}
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={null}
        width={800}
      >
        {viewingEntry && renderContent(viewingEntry)}
      </Modal>
    </div>
  );
};

export default KnowledgeBase;