import React from 'react';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import AppSider from './components/AppSider';
import Dashboard from './pages/Dashboard';
import DeviceManagement from './pages/DeviceManagement';
import DataAnalysis from './pages/DataAnalysis';
import MaintenancePlan from './pages/MaintenancePlan';
import ReportManagement from './pages/ReportManagement';
import KnowledgeBase from './pages/KnowledgeBase'; // 导入新的知识库页面组件

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ height: '100%' }}>
      <AppHeader />
      <Layout>
        <AppSider />
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
              borderRadius: '4px'
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/devices" element={<DeviceManagement />} />
              <Route path="/analysis" element={<DataAnalysis />} />
              <Route path="/maintenance" element={<MaintenancePlan />} />
              <Route path="/reports" element={<ReportManagement />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} /> {/* 添加知识库路由 */}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;