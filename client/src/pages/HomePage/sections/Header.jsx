import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../../components/CryptoChart/LineChart.component';


const Header = () => {
    
    let times = new Array(24).fill('')
    let values = [0, 1, 2, 3, 4, 8, 10, 15, 30, 19, 10, 20, 40, 20, 45, 14, 15, 9, 12, 30, 40, 50, 60, 100]
    
    
    return (
    <section className='Header'>

    <div className='Header__header'>
        <div className='Header__header--textContainer'>
            <div className='Header__header--titleContainer'>
                <h1 className='Header__header--title'> Cryptofy </h1>
                <div className='Header__header--imageWrapper'>
                    <img alt='ether' src='../images/ether.png' />
                </div>
            </div>

            <h1 className='Header__header--slogan'>Cryptocurrency wallet tracking tool for traders </h1> 


    
            <Link to='/connect' ><button className='Header__header--button' > Launch App </button></Link>

        </div>
        <div className='Header__header--chartContainer'>
            <div className='Header__header--chart'>
                <div className='Header__header--chartWrapper'>
                    <LineChart tickMark='%' height={180} times={times} values={values} chartColor='#32ff7e'  />
                </div>
            </div>
        </div>
    </div>
    
</section>
)}

export default Header