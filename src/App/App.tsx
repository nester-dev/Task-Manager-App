import React, { useEffect } from 'react';

import { LINKS } from 'constants/constants';
import { Boards } from 'Pages/Boards';
import { Error } from 'Pages/Error';
import { Search } from 'Pages/Search';
import { Welcome } from 'Pages/Welcome';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout/Layout';
import { useAppDispatch } from './state/store';
import { setToken, setUser } from '../features/authSlice';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') as string) || null;
    const token = JSON.parse(localStorage.getItem('token') as string) || {};

    dispatch(setToken(token));
    dispatch(setUser(user));
  }, []);
  return (
    <>
      <CssBaseline>
        <ToastContainer />
        <Routes>
          <Route path={LINKS.welcome} element={<Layout />}>
            <Route path={LINKS.search} element={<Welcome />} />
            <Route path={LINKS.search} element={<Search />} />
            <Route path={LINKS.boards} element={<Boards />} />
          </Route>
          <Route path={LINKS.signIn} element={<SignIn />} />
          <Route path={LINKS.signUp} element={<SignUp />} />
          <Route path={LINKS.error} element={<Error />} />
        </Routes>
      </CssBaseline>
    </>
  );
};
