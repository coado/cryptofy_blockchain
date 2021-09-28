import React from 'react';
import { connect } from 'react-redux';

const WalletRow = ({ theme, to, currency, course, amount, value, percentage, percentageProfit, valueProfit, style, averageCourseEntry}) => {
        let border;

        switch(theme) {
            case 'matrix': 
                border = 'solid 1px #32ff7d46';
                break;
            case 'light':
                border = 'solid 1px #b217ff3f';
                break;
            default:
                border = 'solid 1px rgba(255,255,255,0.1)'
        }
    
    return (
    <tr style={style}>
        <td style={{borderBottom: border}}>{currency}</td>
        <td style={{borderBottom: border}}>{amount}</td>
        <td style={{borderBottom: border}}>{to === 'btc' ? `${value}₿` : `${value}$`}
            {
                valueProfit >= 0 ?
                <span className='dashboard__wallet--percentageSpanPlus'>{to === 'btc' ? `+${valueProfit}₿` : `+${valueProfit}$`}</span>
                : <span className='dashboard__wallet--percentageSpanMinus'>{to === 'btc' ? `${valueProfit}₿` : `${valueProfit}$`}</span>

            }
        </td>
        <td style={{borderBottom: border}}>{averageCourseEntry}$</td>
        <td style={{borderBottom: border}}>{to === 'btc' ? `${course}₿` : `${course}$`}
            {
                percentageProfit >= 0 ?
                <span className='dashboard__wallet--percentageSpanPlus'>+{percentageProfit}%</span>
                : <span className='dashboard__wallet--percentageSpanMinus'>{percentageProfit}%</span>

            }
        </td>
        <td style={{borderBottom: border}}>{percentage}%</td>
    </tr>
)};

const mapStateToProps = state => ({
    theme: state.user.theme
});

export default connect(mapStateToProps)(WalletRow);