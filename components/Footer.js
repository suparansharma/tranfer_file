import React from 'react'
import { Layout } from 'antd';
const Footerv = () => {
    const { Header, Sider, Content, Footer } = Layout;
    return (
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            Ant Design ©2023 Created by Ant UED
        </Footer>
    )
}

export default Footerv;