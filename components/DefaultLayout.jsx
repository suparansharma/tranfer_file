import React, { useState } from 'react';
import { Layout } from 'antd';
import Navbar from './NavBar'
import Footer from './Footer'
import Leftsidebar from './LeftSidebar';
import Axios from "../utils/axios";

const DefaultLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const { http, setToken, token } = Axios();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const colorBgContainer = '#ffffff';
  return (
    <Layout style={{ minHeight: '100vh' }}>
       {/* <Leftsidebar collapsed={collapsed}/> */}
       {token !== null && 
        <Leftsidebar collapsed={collapsed} />
       }
       <Layout>
        <Navbar collapsed={collapsed} toggleCollapsed={toggleCollapsed} colorBgContainer={colorBgContainer}/>
        {children}
        <Footer/>
        </Layout>
        </Layout>
  )
}

export default DefaultLayout