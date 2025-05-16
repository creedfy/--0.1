import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  AppstoreOutlined,
  AreaChartOutlined,
  ToolOutlined,
  FileTextOutlined,
  BookOutlined // 新增知识库图标
} from '@ant-design/icons';

const { Sider } = Layout;

const menuItems = [
  {
    key: '/',
    icon: <DashboardOutlined />,
    label: '系统概览'
  },
  {
    key: '/devices',
    icon: <AppstoreOutlined />,
    label: '设备管理'
  },
  {
    key: '/analysis',
    icon: <AreaChartOutlined />,
    label: '数据分析'
  },
  {
    key: '/maintenance',
    icon: <ToolOutlined />,
    label: '维护计划'
  },
  {
    key: '/reports',
    icon: <FileTextOutlined />,
    label: '报告管理'
  },
  {
    key: '/knowledge-base',
    icon: <BookOutlined />,
    label: '知识库管理'
  }
];

const AppSider: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider width={200} style={{ background: '#fff' }}>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default AppSider;