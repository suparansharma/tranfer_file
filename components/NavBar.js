import { LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import Axios from "../utils/axios";

const { Header } = Layout;

const Navbar = ({ collapsed, toggleCollapsed }) => {
  const { http, setToken, token } = Axios();
  console.log("token",token);
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
      <Menu mode="horizontal" theme="light" selectedKeys={[router.pathname]} className="float-start">
        {token !== null && (
          <Menu.Item>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
            />
          </Menu.Item>
        )}
        <Menu.Item key="/" onClick={() => navigateTo('/')}>
          Home
        </Menu.Item>
        {/* <Menu.Item key="/about" onClick={() => navigateTo('/about')}>
          About
        </Menu.Item> */}
        {token === null ? (
          <Menu.Item className="float-end me-3" key="/login" onClick={() => navigateTo('/login')}>
            Login
          </Menu.Item>
        ) : (
          <Menu.Item>
            <Button type="link" onClick={onLogout} icon={<LoginOutlined />} size="large" />
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export default Navbar;
