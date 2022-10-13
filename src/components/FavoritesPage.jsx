import React from "react";
import { Link } from 'react-router-dom';
import './index.css'

import Layout from "./Layout";
import GameCard from "./GameCard";
import DummyCyberpunk from "./DummyCyberpunk";
import DummySaints from "./DummySaints";

import {
    SimpleGrid,
    Grid,
    GridItem, Image,
    Flex,
    Box,
    Stack
} from '@chakra-ui/react';

// not sure what other imports are missing for Favorites Page

const FavoritesPage = () => {
    return (
        <div className="popular-games-wrap">
            <h1>
                FAVORITE GAMES
            </h1>

            <div className="pop-games-div">
                <div className="game-pop">
                    <GameCard />
                </div>
                <div className="game-pop">
                    <DummyCyberpunk />
                </div>
                <div className="game-pop">
                    <DummySaints />
                </div>
            </div>
        </div>
    );
};

export default FavoritesPage;