import React from 'react';
import { Heading } from '@chakra-ui/react';

import Layout from './Layout';

const DynamicPage = () => {
  return (
    <Stack>
      <Heading as="h2">Dynamic Page</Heading>
      <p>This page was loaded asynchronously!!!</p>
    </Stack>
  );
};

export default DynamicPage;