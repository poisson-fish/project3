import React from 'react';
import { Link } from 'react-router-dom';

import GameCard from './GameCard'

import '../public/static/css/popular.css'

import {
    SimpleGrid,
    Grid,
    GridItem, Image,
    Flex,
    Box,
    Stack
} from '@chakra-ui/react';

import { gql, useQuery } from '@apollo/client';

const GET_POPULAR = gql`
  query popular {
	popular {
    id
    name
    company
    summary
    category {
			id
			category_str
		}
    cover_url {
			url
		}
    screenshots{
			url
		}
    similar_game_ids
    status
    message
	}
}
`;

const PopularGames = () => {

    const { loading, error, data } = useQuery(GET_POPULAR);

    if (data) {
        const GameCards = data.popular.map((game) => {
            return (
                <div className='game-pop'>
                    <GameCard name={game.name} company={game.company} description={game.summary} categories={game.category.category_str} coverURL={game.cover_url.url} />
                </div>
            )
        })
        return (
            <div className='pop-games-div'>
                {GameCards}
            </div>
        );
    }
    else {
        return "Loading...";
    }
};

export default PopularGames;

