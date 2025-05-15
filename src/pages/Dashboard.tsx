import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { Line } from '@ant-design/plots';
import { CheckCircleOutlined, WarningOutlined, StopOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  // 模拟数据
  const vibrationData = {
    normal: 42,
    warning: 5,
    critical: 2,
    trendData: [
      { time: '00:00', value: 0.15 },
      { time: '04:00', value: 0.18 },
      { time: '08:00', value: 0.22 },
      { time: '12:00', value: 0.20 },
      { time: '16:00', value: 0.25 },
      { time: '20:00', value: 0.23 },
      { time: '24:00', value: 0.18 }
    ]
  };

  const config = {
    data: vibrationData.trendData,
    xField: 'time',
    yField: 'value',
    smooth: true,
    meta: {
      value: {
        alias: '振动值 (mm/s)',
      },
    },
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic
              title="正常运行设备"
              value={vibrationData.normal}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="预警设备"
              value={vibrationData.warning}
              prefix={<WarningOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="故障设备"
              value={vibrationData.critical}
              prefix={<StopOutlined style={{ color: '#ff4d4f' }} />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="24小时振动趋势" style={{ marginTop: '16px' }}>
        <Line {...config} />
      </Card>
    </div>
  );
};

export default Dashboard;