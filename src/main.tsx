// Dashboard.tsx
import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const Dashboard: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    { key: '1', label: <Link to="/">Home</Link> },
    { key: '2', label: <Link to="/rakesh">Rakesh</Link> }, // This will open Rakesh component
    { key: '3', label: <Link to="/another-page">Another Page</Link> },
  ];

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'right',
          padding: '16px 0',
    
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Top Section with Logo or Links</h2>
        </div>
      </Header>

      <Header
        style={{
          display: 'flex',
          justifyContent: 'center',
          background: '#001529',
          padding: '0',
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: 'auto',
          }}
        />
      </Header>



    </Layout>
  );
};

export default Dashboard;
