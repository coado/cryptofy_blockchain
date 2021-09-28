import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../Spinner/Spinner';
import WalletTrackerRow from './TransactionsRow.component';


const TransactionsTable = ({ theme, averageProfit, transactionsTableLoading, setEditData, setHiddenUpdateForm, transactions, setNodeArr }) => {
    
    useEffect(() => {
        const checkbox = document.querySelectorAll('.table__checkbox');
        setNodeArr(Array.from(checkbox))
    }, [transactions])
    
    let rocketsReference = Math.round(((averageProfit + (averageProfit / 3)) / 3));
    
    return (
    <div className={`table-${theme} table`}>
        <div className={`table__header-${theme} table__header`}>
            <table className= 'table__table'>
                <thead>
                    <tr className='table__thead'>
                        <th></th>
                        <th>Currency</th>
                        <th>Amount</th>
                        <th>Course</th>
                        <th>date</th>
                        <th>course</th>
                        <th>profit</th>
                        <th>date</th>
                        <th>rockets</th>
                    </tr>
                </thead>
            </table>    
        </div>
        <div className='table__content'>
        {
            transactionsTableLoading ? <Spinner /> : null
        }    
        
        <table className='table__table walletTracker__table--table'>
            <tbody>
            {
                transactions ? 
                transactions.map((el, i) => <WalletTrackerRow 
                                        id={el._id}
                                        buyAmount={el.buyAmount}
                                        buyCourse={el.buyCourse}
                                        buyCurrency={el.buyCurrency}
                                        buyDate={el.buyDate}
                                        profit={el.profit}
                                        sellCourse={el.sellCourse}
                                        percentageCourseChange={el.percentageCourseChange}
                                        sellDate={el.sellDate}
                                        key={i}
                                        setHiddenUpdateForm={setHiddenUpdateForm}
                                        setEditData={setEditData}
                                        theme={theme}
                                        style={transactionsTableLoading ? {display: "none"} : null}
                                        rocketsNumber={ Math.floor(el.profit / rocketsReference) > 3 ? 3 : Math.floor(el.profit / rocketsReference)}
                                        />)
                : null
            }
            </tbody>
        </table>
    </div>
    </div>
)};

const mapStateToProps = state => ({
    transactions: state.user.currentUser.transactions,
    transactionsTableLoading: state.user.transactionsTableLoading
});

export default connect(mapStateToProps)(TransactionsTable);