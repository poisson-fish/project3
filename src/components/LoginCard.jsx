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
import React, { useState, useEffect } from 'react';

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
const DO_REGISTER = gql`
  mutation register($password: String!, $email: String!, $username: String!) {
	register(password: $password, email: $email, username: $username) {
    status
		token
		message
	}
}
`;

export default function LoginCard({ setToken, isSignin, onClose }) {

  const [doLogin, { data: loginData, loading: loginLoading, error: loginError }] = useMutation(DO_LOGIN);
  const [doRegister, { data: regData, loading: regLoading, error: regError }] = useMutation(DO_REGISTER);

  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (loginData) {
      if (loginData.login.status === 'OK') {
        setToken(loginData.login.token)
      }
    }
    if (regData) {
      if (regData.register.status === 'OK') {
        setToken(regData.register.token)
      }
    }
  })
  if (loginLoading || regLoading) return 'Logging in...';
  if (isSignin) {
    return (
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={e => setEmail(e.target.value)} />
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
              onClick={async () => {
                await doLogin({ variables: { email: email, password: password } })
                onClose()
              }}
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
  else {
    return (
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input type="text" onChange={e => setUserName(e.target.value)} />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={e => setEmail(e.target.value)} />
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
              onClick={async () => {
                await doRegister({ variables: { username: username, email: email, password: password } })

                onClose()
              }}
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