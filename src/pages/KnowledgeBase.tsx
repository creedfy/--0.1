import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, Space, Tag, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { KnowledgeBaseEntry } from '../types';

const { TextArea } = Input;

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

  const handleAdd = () => {
    setEditingEntry(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (entry: KnowledgeBaseEntry) => {
    setEditingEntry(entry);
    form.setFieldsValue(entry);
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
    form.validateFields().then(values => {
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
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
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
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: '操作',
      key: 'action',
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
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="内容 (Markdown)" rules={[{ required: true, message: '请输入内容' }]}>
            <TextArea rows={10} placeholder="使用Markdown格式编写内容" />
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
        {viewingEntry && <ReactMarkdown>{viewingEntry.content}</ReactMarkdown>}
      </Modal>
    </div>
  );
};

export default KnowledgeBase;