import React, { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext'; // 导入 useAuth
import { Role } from '../types'; // 导入 Role 类型
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
  const { hasRole, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const filteredMenuItems = useMemo(() => {
    if (!isAuthenticated) return []; // 如果未认证，不显示任何菜单项

    return menuItems.filter(item => {
      if (item.key === '/devices' && !hasRole(['admin', 'developer'])) return false;
      if (item.key === '/maintenance' && !hasRole(['admin', 'developer'])) return false;
      // 开发者可以访问所有页面，管理员可以访问设备管理和维护计划，访客只能访问概览和知识库（如果允许）
      // 假设访客可以访问知识库，如果知识库也需要权限控制，可以在这里添加逻辑
      if (hasRole(['guest'])) {
        return ['/', '/knowledge-base'].includes(item.key);
      }
      return true; // 其他角色默认可以看到所有（或根据具体需求调整）
    });
  }, [isAuthenticated, hasRole]);

  return (
    <Sider width={200} style={{ background: '#fff' }}>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0 }}
        items={filteredMenuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default AppSider;