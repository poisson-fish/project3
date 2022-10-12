import React from 'react';
import { Link } from 'react-router-dom';
import { Heading, Container, Divider, Icon } from '@chakra-ui/react';

const Layout = ({ children, title }) => {
  return (
    <Container maxW='100%' centerContent>
      <Link to="/">
        <Heading as="h1">
          {title}
        </Heading>
      </Link>
      {children}
      <Divider />
      <p>
        WIP
      </p>
    </Container>
  );
};

export default Layout;