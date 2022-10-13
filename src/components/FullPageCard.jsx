import React from 'react';
import GameCard from './GameCard';
import '../public/static/css/popular.css'

function FullPageCard() {
    return (
        <div className='fullpage-game'>
            <GameCard />
        </div>
    );
}

export default FullPageCard;