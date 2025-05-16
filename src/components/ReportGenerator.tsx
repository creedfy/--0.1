import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, DatePicker, Checkbox, Button, Spin, Alert, Row, Col, Typography, Divider } from 'antd';
import ReactMarkdown from 'react-markdown';
import { ReportConfig, KnowledgeBaseEntry, DeviceData } from '../types'; // 假设DeviceData也从types导入

const { Title, Paragraph, Text } = Typography;

interface ReportGeneratorProps {
  visible: boolean;
  onCancel: () => void;
  onGenerate: (config: ReportConfig) => void;
  devices: DeviceData[]; // 假设设备列表从外部传入
  knowledgeBase: KnowledgeBaseEntry[]; // 假设知识库数据从外部传入
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({
  visible,
  onCancel,
  onGenerate,
  devices,
  knowledgeBase,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<DeviceData | null>(null);
  const [relevantKnowledge, setRelevantKnowledge] = useState<KnowledgeBaseEntry[]>([]);

  useEffect(() => {
    if (visible) {
      form.resetFields();
      setSelectedDevice(null);
      setRelevantKnowledge([]);
    }
  }, [visible, form]);

  const handleDeviceChange = (deviceId: string) => {
    const device = devices.find(d => d.key === deviceId);
    setSelectedDevice(device || null);
    // 简单模拟根据设备类型或名称筛选相关知识
    if (device) {
      setRelevantKnowledge(
        knowledgeBase.filter(kb => 
          kb.tags?.some(tag => device.type.includes(tag) || device.name.includes(tag))
        )
      );
    } else {
      setRelevantKnowledge([]);
    }
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      setLoading(true);
      // 模拟报告生成过程
      setTimeout(() => {
        const reportConfig: ReportConfig = {
          deviceId: values.deviceId,
          reportType: values.reportType,
          timeRange: [values.timeRange[0].format('YYYY-MM-DD'), values.timeRange[1].format('YYYY-MM-DD')],
          includeKnowledgeBase: values.includeKnowledgeBase,
          // ... 其他配置
        };
        onGenerate(reportConfig);
        setLoading(false);
        onCancel(); // 关闭弹窗
      }, 1500);
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  return (
    <Modal
      title="生成高级诊断报告"
      open={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      width={800}
      confirmLoading={loading}
      okText="生成报告"
      cancelText="取消"
    >
      <Spin spinning={loading} tip="报告生成中...">
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="deviceId"
                label="选择设备"
                rules={[{ required: true, message: '请选择设备' }]}
              >
                <Select placeholder="请选择一个设备" onChange={handleDeviceChange} showSearch optionFilterProp="children">
                  {devices.map(device => (
                    <Select.Option key={device.key} value={device.key}>
                      {device.name} ({device.type})
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="reportType"
                label="报告类型"
                rules={[{ required: true, message: '请选择报告类型' }]}
                initialValue="故障诊断报告"
              >
                <Select>
                  <Select.Option value="故障诊断报告">故障诊断报告 (STAR)</Select.Option>
                  <Select.Option value="设备健康度评估">设备健康度评估</Select.Option>
                  <Select.Option value="维护建议报告">维护建议报告</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="timeRange"
            label="分析时间范围"
            rules={[{ required: true, message: '请选择时间范围' }]}
          >
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="includeKnowledgeBase" valuePropName="checked" initialValue={true}>
            <Checkbox>整合相关知识库条目</Checkbox>
          </Form.Item>

          {selectedDevice && (
            <Card size="small" title={`设备信息: ${selectedDevice.name}`}>
              <Paragraph>类型: {selectedDevice.type}</Paragraph>
              <Paragraph>位置: {selectedDevice.location}</Paragraph>
              <Paragraph>状态: <Text type={selectedDevice.status === 'critical' ? 'danger' : selectedDevice.status === 'warning' ? 'warning' : undefined}>{selectedDevice.status}</Text></Paragraph>
            </Card>
          )}

          {form.getFieldValue('includeKnowledgeBase') && relevantKnowledge.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <Divider>相关知识库条目</Divider>
              {relevantKnowledge.map(kb => (
                <Card key={kb.id} size="small" title={kb.title} style={{ marginBottom: 8 }}>
                  <ReactMarkdown>{kb.content.substring(0, 150) + (kb.content.length > 150 ? '...' : '')}</ReactMarkdown>
                </Card>
              ))}
            </div>
          )}
          {form.getFieldValue('includeKnowledgeBase') && relevantKnowledge.length === 0 && selectedDevice && (
             <Alert message="未找到与此设备直接相关的知识库条目。" type="info" showIcon style={{marginTop: 16}}/>
          )}

          <Divider>报告预览 (示意)</Divider>
          <Typography>
            <Title level={4}>STAR 诊断流程 (示例)</Title>
            <Paragraph><Text strong>S (Situation):</Text> 设备 {selectedDevice?.name || '[未选设备]'} 于 [时间] 出现 [具体现象]。</Paragraph>
            <Paragraph><Text strong>T (Task):</Text> 需诊断故障原因并提出解决方案。</Paragraph>
            <Paragraph><Text strong>A (Action):</Text> 检查了 [检查项1], [检查项2]。分析了 [数据类型] 数据。</Paragraph>
            <Paragraph><Text strong>R (Result):</Text> 初步判断为 [可能原因]，建议 [处理措施]。</Paragraph>
            <Title level={4} style={{marginTop: 16}}>图像分析 (占位)</Title>
            <Paragraph>此处将展示相关的振动波形图、频谱图等分析图像。</Paragraph>
            <div style={{textAlign: 'center', padding: '20px', border: '1px dashed #ccc', background: '#f9f9f9'}}>
              [图像分析区域]
            </div>
          </Typography>

        </Form>
      </Spin>
    </Modal>
  );
};

export default ReportGenerator;