import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from "next/router";
import { useState } from 'react';
import { Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import Login from '../pages/user/login';
import '../styles/globals.css';
import '../styles/Home.module.css'
import Axios from '../utils/axios';
import UserContext from './../components/context/userContext';
import Layout from "../components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultLayout from '../components/DefaultLayout';
import { Provider } from "react-redux";
import store from "../store";
const MyApp = ({ Component, pageProps }) => {

  const [queryClient] = useState(() => new QueryClient());


  return (
    <>
      <UserContext.Provider>
        <DefaultLayout>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
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
            </Hydrate>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </DefaultLayout>
      </UserContext.Provider>

    </>
  );
};
export default MyApp;




