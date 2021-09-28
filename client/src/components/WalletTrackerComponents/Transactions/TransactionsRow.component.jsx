import React from 'react';

import { ReactComponent as Rocket} from '../../../svg/rocket-outline.svg';
import { removeDolarSign } from '../../../utils/formFuntions';


const WalletTrackerRow = ({ theme, percentageCourseChange, rocketsNumber, style, setEditData, setHiddenUpdateForm, id, buyAmount, buyCourse, buyCurrency, buyDate, profit, sellCourse, sellDate}) => {
    let rockets = [];

        

        for (let i = 0; i < rocketsNumber; i++) {
            rockets.push(<Rocket key={i} className='walletTracker__table--rocketIcon' />)
        }
  


    const getData = e => {
        let nodeArr = Array.from(e.target.parentNode.childNodes);
        
        if (nodeArr.length < 9) nodeArr = Array.from(e.target.parentNode.parentNode.childNodes)
        if (nodeArr.length < 9) nodeArr = Array.from(e.target.parentNode.parentNode.parentNode.childNodes)
        if (nodeArr.length < 9) nodeArr = Array.from(e.target.parentNode.parentNode.parentNode.parentNode.childNodes)
        
        const arr = nodeArr.slice(1,9).map(el => el.innerHTML);
        if (arr[4]) {
            arr[4] = nodeArr[5].childNodes[0].textContent;
        }
        
        setEditData(prevState => ({
            ...prevState,
            objectID: id,
            buyCurrency: arr[0],
            buyAmount: arr[1],
            buyCourse: removeDolarSign(arr[2]),
            buyDate: arr[3],
            sellCourse: removeDolarSign(arr[4]),
            profit: removeDolarSign(arr[5]),
            sellDate: arr[6]

        }))
        setHiddenUpdateForm(false);
    }
    
    return (
    <tr className={`table__tr-${theme}`} style={style} >
        <td> <input  data-id={id} className='table__checkbox' type='checkbox'/></td>
        <td onClick={getData} >{buyCurrency}</td>
        <td onClick={getData}>{buyAmount}</td>
        <td onClick={getData}>{buyCourse}$</td>
        <td onClick={getData}>{buyDate}</td>
        <td onClick={getData}>{
            sellCourse === null ? null : `${sellCourse}$`
        }
        {
            percentageCourseChange ?
            <span  style={{color: percentageCourseChange >= 0 ? '#32ff7e' : '#ff3838'}} className='walletTracker__table--percentageCourse'>{percentageCourseChange >= 0 ? `+${percentageCourseChange}%` : `${percentageCourseChange}%`}</span>
            :
            null
        }
        </td>
        <td style={{color: profit >= 0 ? '#32ff7e' : '#ff3838'}} onClick={getData}>
        {
         profit === null ? null : `${profit}$`
        }
        </td>
        <td onClick={getData}>{sellDate}</td>
        <td onClick={getData}> 
            <div className='walletTracker__table--rocketContainer'>
            {
                rockets.map(el => el)
            }
            </div>
        </td>
    </tr>
)};

export default WalletTrackerRow;