import React from 'react';
import { Link } from 'react-router-dom';

import Layout from './Layout'
import GameCarousel from './GameCarousel'
import GameCard from './GameCard'

import {
  SimpleGrid,
  Grid,
  GridItem, Image,
  Flex,
  Box,
  Stack
} from '@chakra-ui/react';

const Home = () => {
  return (
    <Layout title="Popular Titles">
      <Grid
        templateColumns="repeat(1, 1fr)"
        gap={6}
        templateRows="repeat(2, 1fr)"
      >
        <Stack spacing='1px'>
          <GameCarousel />
          <Flex spacing='1px'> 
          this needs work and gamecards
          </Flex>
        </Stack>


      </Grid>
    </Layout>
  );
};

export default Home;