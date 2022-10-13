import React from 'react';
import { Link } from 'react-router-dom';

import Layout from './Layout'
import GameCarousel from './GameCarousel'
import GameCard from './GameCard'
import './index.css'

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
    <div className='popular-games-wrap'>

      <h1>
        POPULAR GAMES
      </h1>

      <div className='carousel-div'>
      <GameCarousel />
      </div>

      <div className='pop-games-div'>
        <div className='game-pop'>
          <GameCard />
        </div>
        <div className='game-pop'>
          <GameCard />
        </div>
        <div className='game-pop'>
          <GameCard />
        </div>
        <div className='game-pop'>
          <GameCard />
        </div>
        <div className='game-pop'>
          <GameCard />
        </div>
        <div className='game-pop'>
          <GameCard />
        </div>
      </div>

    </div>
  );
};

export default Home;