import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import PropTypes from 'prop-types'
import React, { useState } from 'react';

import { gql, useMutation } from '@apollo/client';

const DO_LOGIN = gql`
  mutation login($password: String!, $email: String!) {
	login(password: $password, email: $email) {
    status
		token
		message
	}
}
`;

export default function LoginCard({ setToken, isSignin }) {

  const [doLogin, { data, loading, error }] = useMutation(DO_LOGIN);

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  if(data) {
    if(data.login.status === 'OK'){
      setToken(data.login.token)
    }
  }
  if (loading) return 'Logging in...';
  if(isSignin){
    return (
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={e => setUserName(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={e => setPassword(e.target.value)} />
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Link color={'blue.400'}>Forgot password?</Link>
            </Stack>
            <Button
              onClick={() => doLogin({ variables: { email: username, password: password } })}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
);
  }
  else{
    return (
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={e => setUserName(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={e => setPassword(e.target.value)} />
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Link color={'blue.400'}>Forgot password?</Link>
            </Stack>
            <Button
              onClick={() => doLogin({ variables: { email: username, password: password } })}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Register
            </Button>
          </Stack>
        </Stack>
      </Box>
);
  }
}

LoginCard.propTypes = {
  setToken: PropTypes.func.isRequired
}