import React from 'react';
import { Heading } from '@chakra-ui/react';

import Layout from './Layout';

const DynamicPage = () => {
  return (
    <Layout>
      <Heading as="h2">Dynamic Page</Heading>
      <p>This page was loaded asynchronously!!!</p>
    </Layout>
  );
};

export default DynamicPage;