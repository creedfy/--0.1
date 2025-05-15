import React, { useState } from 'react';
import { Card, Row, Col, Select, DatePicker, Space, Table, Button } from 'antd';
import { Line, DualAxes } from '@ant-design/plots';
import { DownloadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

interface VibrationData {
  timestamp: string;
  amplitude: number;
  frequency: number;
  temperature: number;
}

const DataAnalysis: React.FC = () => {
  // 模拟数据
  const [selectedDevice] = useState('device-1');
  const [vibrationData] = useState<VibrationData[]>([
    { timestamp: '08:00', amplitude: 2.5, frequency: 50, temperature: 45 },
    { timestamp: '09:00', amplitude: 2.8, frequency: 52, temperature: 46 },
    { timestamp: '10:00', amplitude: 3.2, frequency: 55, temperature: 48 },
    { timestamp: '11:00', amplitude: 2.9, frequency: 53, temperature: 47 },
    { timestamp: '12:00', amplitude: 3.0, frequency: 54, temperature: 48 }
  ]);

  // 振动趋势图配置
  const trendConfig = {
    data: vibrationData,
    xField: 'timestamp',
    yField: 'amplitude',
    meta: {
      amplitude: {
        alias: '振动幅值 (mm/s)',
      },
    },
    smooth: true,
  };

  // 频谱分析图配置
  const spectrumConfig = {
    data: [vibrationData],
    xField: 'timestamp',
    yField: ['frequency', 'temperature'],
    meta: {
      frequency: {
        alias: '频率 (Hz)',
      },
      temperature: {
        alias: '温度 (°C)',
      },
    },
    geometryOptions: [
      {
        geometry: 'line',
        smooth: true,
        color: '#5B8FF9',
      },
      {
        geometry: 'line',
        smooth: true,
        color: '#5AD8A6',
      },
    ],
  };

  // 表格列配置
  const columns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: '振动幅值 (mm/s)',
      dataIndex: 'amplitude',
      key: 'amplitude',
    },
    {
      title: '频率 (Hz)',
      dataIndex: 'frequency',
      key: 'frequency',
    },
    {
      title: '温度 (°C)',
      dataIndex: 'temperature',
      key: 'temperature',
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Select
          value={selectedDevice}
          style={{ width: 200 }}
          options={[
            { value: 'device-1', label: '离心泵-01' },
            { value: 'device-2', label: '电机-02' },
          ]}
        />
        <RangePicker showTime />
        <Button type="primary" icon={<DownloadOutlined />}>导出数据</Button>
      </Space>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="振动趋势分析">
            <Line {...trendConfig} />
          </Card>
        </Col>
        <Col span={24}>
          <Card title="频谱分析">
            <DualAxes {...spectrumConfig} />
          </Card>
        </Col>
        <Col span={24}>
          <Card title="数据记录">
            <Table
              columns={columns}
              dataSource={vibrationData}
              rowKey="timestamp"
              pagination={{
                pageSize: 10,
                showTotal: (total) => `共 ${total} 条记录`,
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DataAnalysis;