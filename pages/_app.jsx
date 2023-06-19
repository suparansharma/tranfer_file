import '@/styles/globals.css';
import React, { useState } from 'react';
// import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import UserContext from '../components/context/userContext'
export default function App({ Component, pageProps }) {
  const [collapsed, setCollapsed] = useState(false);
  return (

  

     <Layout/>

  );
}
