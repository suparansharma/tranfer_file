'use client'
import Axios from '../utils/axios';
import Layout from '../components/Layout';
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer } from "react-toastify";
import LogIn from './login';
import { useEffect, useState } from 'react';
import Loader from '../components/common/Loader';
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query';

const MyApp = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const [queryClient] = useState(() => new QueryClient());

  const { http, user, token, logout } = Axios();
  // console.log("user", user);

  if (typeof window !== undefined) {
    if (!token) {
      return (
        <>

          {loading ? (
            <Loader />
          ) : (
            <>

              <LogIn />

              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                closeOnClick
                pauseOnHover
                transition={Slide}
              />
            </>
          )}
        </>
      );
    }
  }

  return (
    <>


      {loading ? (
        <Loader />
      ) : (
        <>
          <Layout>

            <QueryClientProvider client={queryClient}>
              
                <Component {...pageProps} />
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  draggable={false}
                  closeOnClick
                  pauseOnHover
                  transition={Slide}
                />
            
            </QueryClientProvider>

          </Layout>

        </>
      )}
    </>
  );

}


export default MyApp;