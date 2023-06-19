import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import React, { useState } from 'react';
import { MenuFoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme, Breadcrumb } from 'antd';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { Header, Sider, Content, Footer } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (

         <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            Bill is a cat.
          </div>
        </Content>

  )
}
