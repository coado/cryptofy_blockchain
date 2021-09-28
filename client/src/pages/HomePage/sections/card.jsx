import React from 'react';

const Card = ({ Icon, text }) => (
    <div className='Cards__card'>
        <div className='Cards__card--iconWrapper'>
            <Icon className='Cards__card--icon' />
        </div>
        <h2 className='Cards__card--description'> {text} </h2>
    </div>
);

export default Card;