import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import FuturesRow from './FuturesRow.component';
import Spinner from '../../Spinner/Spinner';

const FuturesTable = ({ theme, averageProfit, setHiddenUpdateForm, setEditData, futures, futuresTableLoading, setNodeArr }) => {

    useEffect(() => {
        const checkbox = document.querySelectorAll('.table__checkbox');
        setNodeArr(Array.from(checkbox))
    }, [futures])

    let rocketsReference = Math.round(((averageProfit + (averageProfit / 3)) / 3));

    return (
    <div className={`table-${theme} table`}>
        <div className={`table__header-${theme} table__header`}>
            <table className='table__table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>type</th>
                        <th>Contract</th>
                        <th>Entry</th>
                        <th>laverage</th>
                        <th>Profit</th>
                        <th>date</th>
                        <th>Rockets</th>
                    </tr>
                </thead>
            </table>    
        </div>
        <div className='table__content'>
        {
            futuresTableLoading ? <Spinner /> : null
        }
        
        <table className='table__table walletTracker__table--table'>
            <tbody   >
                {
                    futures ? 
                    futures.map((el, i) => <FuturesRow 
                        id={el._id}
                        typeOfFuture={el.typeOfFuture}
                        contract={el.contract}
                        date={el.date}
                        profit={el.profit}
                        entry={el.entry}
                        laverage={el.laverage}
                        key={i}
                        style={futuresTableLoading ? {display: "none"} : null}
                        setEditData={setEditData}
                        setHiddenUpdateForm={setHiddenUpdateForm}
                        rocketsNumber={ Math.floor(el.profit / rocketsReference) > 3 ? 3 : Math.floor(el.profit / rocketsReference)}
                        />)
                    :
                        null
                }
            </tbody>
        </table>
    </div>
    </div>
)};

const mapStateToProps = state => ({
    futures: state.user.currentUser.futures,
    futuresTableLoading: state.user.futuresTableLoading
});

export default connect(mapStateToProps)(FuturesTable);