import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import io from "socket.io-client";
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { useAuthContext } from './hooks';

import { setOnlineUsers } from './Redux/onlineUsers/onlineUsersSlice';

export const socket = io("http://localhost:3001");

// ----------------------------------------------------------------------

export default function App() {

  const { auth } = useAuthContext();

  const dispatch = useDispatch();

  const queryClient = new QueryClient();

  useEffect(() => {
    socket.emit("log-in", auth?.user?._id);
    console.log({authUserId: auth?.user?._id});
    socket.on("user-connected", onlineUsers => {
      dispatch(
        setOnlineUsers(onlineUsers)
      );
    })
  })
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
