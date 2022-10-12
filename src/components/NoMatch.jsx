import React from 'react';
import { Icon } from '@chakra-ui/react';

const NoMatch = () => {
  return (
    <Stack>
      <Icon name="minus circle" size="big" />
      <strong>Page not found!</strong>
    </Stack>
  );
};

export default NoMatch;