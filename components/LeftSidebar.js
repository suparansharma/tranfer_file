import { DashboardOutlined, FileOutlined, UserOutlined, SettingOutlined, ContainerOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Axios from "../utils/axios";
const { Sider } = Layout;

const Leftsidebar = ({ collapsed }) => {
  const router = useRouter();
  const [collapse, setCollapse] = useState(collapsed);
  const { http, setToken, token } = Axios();
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      path: '/dashboard/dashboard'
    },
    {
      key: '/helloTutor',
      icon: <SettingOutlined />,
      label: 'Master Data',
      children: [
        { key: 'subject', label: 'Subject', path: '/subject' },
        { key: 'class', label: 'Class', path: '/class' },
        { key: 'categorie', label: 'Category', path: '/categorie' },
        { key: 'city', label: 'City', path: '/city' },
        { key: 'location', label: 'Location', path: '/location' },
      ],
    },
    {
      key: 'job',
      icon: <ContainerOutlined />,
      label: 'Job Management',
      children: [
        { key: 'job', label: 'Job Creation', path: '/jobRequest' },
        { key: 'job Assign', label: 'Job Assign', path: '/jobAssign' },
      ],
    },
    {
      key: 'user_manage',
      icon: <UserOutlined />,
      label: 'User Manager',
      children: [
        { key: 'users', label: 'User', path: '/users' },
        { key: 'guardian', label: 'Guardian', path: '/guardian' },
        { key: 'tutor', label: 'Tutor', path: '/tutor' },
      ],
    },
  ];

  const handleMenuItemClick = (path) => {
    router.push(path, undefined, { shallow: true });
  };

  const renderedMenuItems = token ? menuItems : [menuItems[0]]; // Show all items if token is present, otherwise show only the first item (Dashboard)

  const renderMenuItems = (menuItems) => {
    return menuItems.map((item) => {
      if (item.children) {
        return (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} icon={item.icon} onClick={() => handleMenuItemClick(item.path)}>
          <Link href={item.path}>
            <a style={{ textDecoration: 'none' }}>{item.label}</a>
          </Link>
        </Menu.Item>
      );
    });
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapse}
      breakpoint="md"
      onBreakpoint={(broken) => {
        setCollapse(broken);
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[router.pathname]}>
        {renderMenuItems(renderedMenuItems)}
      </Menu>
    </Sider>
  );
};

export default Leftsidebar;
