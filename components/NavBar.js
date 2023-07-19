import { LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

const { Header } = Layout;

const Navbar = ({ collapsed, toggleCollapsed }) => {
  const colorBgContainer = '#ffffff';
  const router = useRouter();

  
  const onLogout = async () => {
    localStorage.clear();
    await router.replace("/");
    await router.reload();
  }


  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />

      <Menu mode="horizontal" theme="light" selectedKeys={[router.pathname]} className="float-start">
        <Menu.Item key="/" onClick={() => navigateTo('/')}>
          Home
        </Menu.Item>
        {/* <Menu.Item key="/about" onClick={() => navigateTo('/about')}>
          About
        </Menu.Item> */}
        <Menu.Item key="/login" onClick={() => navigateTo('/login')}>
          Login
        </Menu.Item>

        


      </Menu>

      <span className="float-end me-3">
        <Button type="link" onClick={onLogout} icon={<LoginOutlined />} size="large" />
      </span>
    </Header>
  );
};

export default Navbar;
