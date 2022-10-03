import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

import Home from './Home';
import DynamicPage from './DynamicPage';
import NoMatch from './NoMatch';

import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dynamic" element={<DynamicPage />} />
                    <Route element={<NoMatch />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
};

export default App;