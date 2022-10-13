import React from 'react';
import { Link } from 'react-router-dom';

import Layout from './Layout'
import GameCarousel from './GameCarousel'
import GameCard from './GameCard'
import '../public/static/css/popular.css'
import PopularGames from './PopularGames';

import {
  SimpleGrid,
  Grid,
  GridItem, Image,
  Flex,
  Box,
  Stack
} from '@chakra-ui/react';


const Home = ({ token }) => {

  return (
    <div className='popular-games-wrap'>

      <h1>
        Popular
      </h1>

      <div className='carousel-div'>
        <GameCarousel />
      </div>

      <PopularGames/>

    </div>
  );
};

export default Home;