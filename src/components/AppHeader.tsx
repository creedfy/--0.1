import React, { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext'; // 导入 useAuth
import { Layout, Typography, Avatar, Badge, Space, Dropdown, Switch, Menu, notification } from 'antd';
import { SettingOutlined, BellOutlined, UserOutlined, LogoutOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import type { MenuProps, NotificationInstance } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  read: boolean;
}

interface AppHeaderProps {
  onThemeChange?: (isDark: boolean) => void;
  // onLogout is now handled by AuthContext
}

const AppHeader: React.FC<AppHeaderProps> = ({ onThemeChange }) => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: '设备预警',
      description: '设备ID: VIB001 振动值超过阈值',
      read: false
    }
  ]);

  const handleThemeChange = useCallback((checked: boolean) => {
    setIsDarkMode(checked);
    onThemeChange?.(checked);
  }, [onThemeChange]);

  const handleNotificationClick = useCallback((item: NotificationItem) => {
    notification.info({
      message: item.title,
      description: item.description,
    });
    
    // 标记通知为已读
    setNotifications(prev => 
      prev.map(n => 
        n.id === item.id ? { ...n, read: true } : n
      )
    );
  }, []);

  const notificationMenu: MenuProps['items'] = notifications.map((item) => ({
    key: item.id,
    label: (
      <div onClick={() => handleNotificationClick(item)}>
        <div style={{ fontWeight: 'bold' }}>{item.title}</div>
        <div style={{ fontSize: '12px' }}>{item.description}</div>
      </div>
    ),
  }));

    const handleLogout = () => {
    logout();
    // Optionally, redirect to login page or show notification
    notification.success({ message: '已成功退出登录' });
  };

  const userMenu: MenuProps['items'] = isAuthenticated && currentUser ? [
    {
      key: 'userInfo',
      label: `用户: ${currentUser.username} (${currentUser.role})`,
      disabled: true, // Just for display
    },
    {
      type: 'divider'
    },
    {
      key: 'profile',
      label: '个人信息',
      icon: <UserOutlined />
    },
    {
      key: 'theme',
      label: (
        <Space>
          主题设置
          <Switch
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            checked={isDarkMode}
            onChange={handleThemeChange}
          />
        </Space>
      )
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      onClick: handleLogout // 使用新的 handleLogout
    }
  ] : [
    // Potentially add a Login button here if not authenticated, 
    // or handle login via a dedicated login page.
    // For now, we assume login happens elsewhere or App.tsx handles unauthenticated state.
    {
      key: 'loginInfo',
      label: '未登录',
      disabled: true,
    }
  ];

  // Original userMenu definition starts here, so we replace it entirely
  // const userMenu: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人信息',
      icon: <UserOutlined />
    },
    {
      key: 'theme',
      label: (
        <Space>
          主题设置
          <Switch
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            checked={isDarkMode}
            onChange={handleThemeChange}
          />
        </Space>
      )
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      onClick: handleLogout
    }
  ];

  return (
    <Header 
      style={{
        background: '#fff',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 4px rgba(0,21,41,.08)'
      }}
    >
      <Title level={4} style={{ margin: 0 }}>振动分析专家系统</Title>
      <Space size="large">
        <Dropdown menu={{ items: notificationMenu }} placement="bottomRight">
          <Badge count={notifications.filter(n => !n.read).length} size="small">
            <BellOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
          </Badge>
        </Dropdown>
        <Dropdown menu={{ items: userMenu }} placement="bottomRight">
          <Space>
            <Avatar icon={<UserOutlined />} />
            <span>{isAuthenticated && currentUser ? currentUser.username : '访客'}</span>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};


export default AppHeader;