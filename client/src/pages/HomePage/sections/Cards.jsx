import React from 'react';

import { ReactComponent as Icon1} from '../../../svg/001.svg';
import { ReactComponent as Icon2} from '../../../svg/002.svg';
import { ReactComponent as Icon3} from '../../../svg/003.svg';
import { ReactComponent as Icon4} from '../../../svg/004.svg';
import { ReactComponent as Blob} from '../../../svg/blob.svg';


import Card from './card';

const Cards = () => (
    <section className='Cards'>
        <Blob className='Cards__blob' />
        <Card text='Live tracking current cryptocurrency courses' Icon={Icon1} />
        <Card text='Support for over 100 tokens across multiple blockchains' Icon={Icon2} />
        <Card text='data aggregation for saved spot and futures market trades' Icon={Icon3} />
        <Card text='Calculates current profit in pairs to usd or bitcoin' Icon={Icon4} />
    </section>
);

export default Cards;
