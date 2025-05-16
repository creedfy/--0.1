import React from 'react';
import { Layout } from 'antd';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import AppHeader from './components/AppHeader';
import AppSider from './components/AppSider';
import Dashboard from './pages/Dashboard';
import DeviceManagement from './pages/DeviceManagement';
import DataAnalysis from './pages/DataAnalysis';
import MaintenancePlan from './pages/MaintenancePlan';
import ReportManagement from './pages/ReportManagement';
import KnowledgeBase from './pages/KnowledgeBase'; // 导入新的知识库页面组件
import { Role } from './types'; // 导入 Role 类型

const { Content } = Layout;

const App: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();
  return (
    <Layout style={{ height: '100%' }}>
      {isAuthenticated && <AppHeader />}
      <Layout>
        {isAuthenticated && <AppSider />}
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
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes */}
              <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />

              <Route element={<ProtectedRoute allowedRoles={['developer', 'admin']} />}>
                <Route path="/devices" element={<DeviceManagement />} />
                <Route path="/maintenance" element={<MaintenancePlan />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['developer', 'admin', 'guest']} />}>
                {/* Assuming guests can also see analysis and reports, adjust if not */}
                {/* Or make specific routes for guests if their view is different */}
                <Route path="/analysis" element={<DataAnalysis />} />
                <Route path="/reports" element={<ReportManagement />} />
                <Route path="/knowledge-base" element={<KnowledgeBase />} />
              </Route>

              {/* Developer specific routes - if any, can be nested or defined here */}
              {/* Example: <Route element={<ProtectedRoute allowedRoles={['developer']} />} > */}
              {/* <Route path="/dev-tools" element={<DeveloperToolsPage />} /> */}
              {/* </Route> */}

              {/* Fallback for any other authenticated route or redirect to login if not authenticated */}
              <Route path="*" element={isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;