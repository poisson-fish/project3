import React from 'react';
import { Link } from 'react-router-dom';
import { Heading, Container, Divider, Icon } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Container>
      <Link to="/">
        <Heading as="h1">
          webpack-for-react
        </Heading>
      </Link>
      {children}
      <Divider />
      <p>
        Made with <Icon name="heart" color="red" /> by Esau Silva
      </p>
    </Container>
  );
};

export default Layout;