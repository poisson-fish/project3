import React, { useState } from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

import Home from '../Home';
import DynamicPage from '../DynamicPage';
import NoMatch from '../NoMatch';
import LoginCard from '../LoginCard';
import DesktopNav from '../NavBar'

import { ChakraProvider } from '@chakra-ui/react'

import useToken from './useToken';

const App = () => {
    const { token, setToken } = useToken();

    if (!token) {
        return (
            <ChakraProvider>
                <LoginCard setToken={setToken} />
            </ChakraProvider>
        )
    }

    return (
        <ChakraProvider>
            <DesktopNav
                showSignIn={showSignIn}
                showSignUp={showSignUp}
            />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dynamic" element={<DynamicPage />} />
                    <Route path="/login" element={<LoginCard />} />
                    <Route element={<NoMatch />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
};

export default App;