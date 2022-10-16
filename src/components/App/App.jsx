import React, { useState } from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

import Home from '../Home';
import NoMatch from '../NoMatch';
import DesktopNav from '../NavBar';
import FullPageCard from '../FullPageCard';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import { ChakraProvider } from '@chakra-ui/react'

import useToken from './useToken';

const App = () => {
    const { token, setToken } = useToken();

    const { signedIn } = useState(false)

    const apollo = new ApolloClient({
        uri: 'http://35.90.139.39/graphql',
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={apollo}>
            <ChakraProvider>
                <DesktopNav setToken={setToken} token={token}/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home token={token}/>} />
                        
                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        </ApolloProvider>
    );
};

export default App;