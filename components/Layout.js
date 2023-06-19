import React, { useState } from 'react';
import { theme,Layout } from 'antd';
import Leftsidebar from '../components/LeftSidebar';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
// import CustomContent from './Content';

const App = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const colorBgContainer = '#ffffff';
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Leftsidebar collapsed={collapsed} />
      <Layout>
        <Navbar collapsed={collapsed} toggleCollapsed={toggleCollapsed} colorBgContainer={colorBgContainer} />
        {children}
      <Footer/>
      </Layout>
    </Layout>
  );
};

export default App;
