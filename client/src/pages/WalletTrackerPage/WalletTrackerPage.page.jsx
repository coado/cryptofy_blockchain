import React, { useState } from 'react';
import { connect } from 'react-redux';

import { ReactComponent as Rocket} from '../../svg/rocket-outline.svg';
import { ReactComponent as Moon} from '../../svg/moon.svg'

import TransactionsTable from '../../components/WalletTrackerComponents/Transactions/TransactionsTable.component';
import FuturesTable from '../../components/WalletTrackerComponents/Futures/FuturesTable.component';


import TransactionsAddRecordForm from '../../components/WalletTrackerComponents/Transactions/TransactionsAddRecordForm.component';
import TransactionsUpdateRecordForm from '../../components/WalletTrackerComponents/Transactions/TransactionsUpdateRecordForm.component';

import FuturesAddRecordForm from '../../components/WalletTrackerComponents/Futures/FuturesAddRecordForm.component';
import FuturesUpdateRecordForm from '../../components/WalletTrackerComponents/Futures/FuturesUpdateRecordForm.component';

import Button from '../../components/button/button.component';
import Label from '../../components/Label/Label.component';
import StatisticCard from '../../components/WalletTrackerComponents/StatisticCard.component';
import { setWalletTrackerLabel } from '../../redux/error/error.actions';
import { userTransactionDelete, setTransactionsTableLoading, userFutureDelete, setFuturesTableLoading } from '../../redux/user/user.actions';
import LineChart from '../../components/CryptoChart/LineChart.component';

const WalletTrackerPage = ({ theme, walletTrackerFuturesData, setFuturesTableLoading, userFutureDelete, walletTrackerTransactionData, setWalletTrackerLabel, label, id, userTransactionDelete, setTransactionsTableLoading }) => {
    


    const [transactionsUploadForm, setTransactionsUploadForm] = useState(true);
    const [transactionsUpdateForm, setTransactionsUpdateForm] = useState(true);
    const [futuresUploadForm, setFuturesUploadForm] = useState(true);
    const [futuresUpdateForm, setFuturesUpdateForm] = useState(true);


    const [nodeArrTransactions, setNodeArrTransactions] = useState([]);
    const [nodeArrFutures, setNodeArrFutures] = useState([]);
    const [editTransactionData, setEditTransactionData] = useState({
        id,
        objectID: null,
        buyCurrency: '',
        buyAmount: null,
        buyCourse: null,
        buyDate: null,
        profit: null,
        sellAmount: null,
        sellCourse: null,
        sellDate: null        
    });

    const [editFutureData, setEditFutureData] = useState({
        id,
        objectID: null,
        typeOfFuture: '',
        contract: '' ,
        profit: '',
        date: ''     
    });

    const deleteRecordsTransactions = () => {
        const deleteArr = nodeArrTransactions.filter(el => el.checked === true).map(el => el.dataset.id);
        if (deleteArr.length === 0) return;
        nodeArrTransactions.forEach(el => el.checked = false);
        setTransactionsTableLoading();
        userTransactionDelete({
            id,
            records: deleteArr
        })
    }

    const deleteRecordsFutures = () => {
        const deleteArr = nodeArrFutures.filter(el => el.checked === true).map(el => el.dataset.id);
        if (deleteArr.length === 0) return;
        nodeArrFutures.forEach(el => el.checked = false);
        
        setFuturesTableLoading();
        userFutureDelete({
            id,
            records: deleteArr
        })
        
    }

    return (
    
    <div className={`walletTracker-${theme} walletTracker`}>
    {
        label.status ? <Label status='error' message={label.message} hideLabel={() => setWalletTrackerLabel({status : false, message: ''})} /> : null
    }
    {
        transactionsUploadForm ? null :  <TransactionsAddRecordForm theme={theme} setTransactionsTableLoading={setTransactionsTableLoading} id={id} setWalletTrackerLabel={setWalletTrackerLabel} hideForm={() => setTransactionsUploadForm(true)} />
    }
    {
        transactionsUpdateForm ? null : <TransactionsUpdateRecordForm theme={theme} setTransactionsTableLoading={setTransactionsTableLoading} editData={editTransactionData} setEditData={setEditTransactionData} setWalletTrackerLabel={setWalletTrackerLabel} hideForm={() => setTransactionsUpdateForm(true)} />
    }
    
    {
        futuresUpdateForm ? null : <FuturesUpdateRecordForm theme={theme} setWalletTrackerLabel={setWalletTrackerLabel} setFuturesTableLoading={setFuturesTableLoading} editData={editFutureData} setEditData={setEditFutureData} hideForm={() => setFuturesUpdateForm(true)} />
    }

    {
       futuresUploadForm ? null :  <FuturesAddRecordForm theme={theme} setWalletTrackerLabel={setWalletTrackerLabel} setFuturesTableLoading={setFuturesTableLoading} id={id} hideForm={() => setFuturesUploadForm(true)} />
    }
        <div className='walletTracker__transactionsAndFutures'> 
           
                <div className='walletTracker__transactions'>
                    <div className='walletTracker__table--header'>
                        <div className='walletTracker__table--buttons'>
                            <Button styles={{marginTop: '0'}} text='Add new record' onClick={() => setTransactionsUploadForm(false)} />
                            <Button onClick={deleteRecordsTransactions} styles={{marginTop: '0'}} text='Delete record' />
                        </div>
                        <h1 className='walletTracker__table--text'> SPOT </h1>

                    </div>
                    <TransactionsTable theme={theme} averageProfit={walletTrackerTransactionData.averageProfitPerOneTransaction} setEditData={setEditTransactionData} setHiddenUpdateForm={setTransactionsUpdateForm} setNodeArr={setNodeArrTransactions} />

                </div>

                <div className='walletTracker__futures'>
                    <div className='walletTracker__table--header'>
                        <div className='walletTracker__table--buttons'>
                            <Button styles={{marginTop: '0'}} text='Add new record' onClick={() => setFuturesUploadForm(false)} />
                            <Button onClick={deleteRecordsFutures} styles={{marginTop: '0'}} text='Delete record' />
                        </div>
                        <h1 className='walletTracker__table--text'> FUTURES </h1>

                    </div>
                        <FuturesTable theme={theme} averageProfit={walletTrackerFuturesData.averageProfitPerOneTransaction} setHiddenUpdateForm={setFuturesUpdateForm} setEditData={setEditFutureData} setNodeArr={setNodeArrFutures} />
                </div>
        </div>

            <div className='walletTracker__cards'>   
                    <StatisticCard type='transactions' header='Total Profit' dolar={true} data={walletTrackerTransactionData.totalProfit ? walletTrackerTransactionData.totalProfit : null} />
                    <StatisticCard type='transactions' header='total transactions' dolar={false} data={walletTrackerTransactionData.totalTransactionsAmount ? walletTrackerTransactionData.totalTransactionsAmount : null} />
                    <StatisticCard type='futures' header='Total Profit' dolar={true} data={walletTrackerFuturesData.totalProfit ? walletTrackerFuturesData.totalProfit : null} />
                    <StatisticCard type='futures' header='total transactions' dolar={false} data={walletTrackerFuturesData.totalTransactionsAmount ? walletTrackerFuturesData.totalTransactionsAmount : null} /> 
            </div>
           

        
        
            
            
        

        <div className='walletTracker__statsAndCharts'>
            <div className='walletTracker__stats'>
                <h1 className='walletTracker__stats--header'> statistics </h1>
            <table className='walletTracker__stats--table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>SPOT</th>
                        <th>Futures</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='walletTracker__stats--title'>Average profit per one transaction:</td>
                        <td>{walletTrackerTransactionData.averageProfitPerOneTransaction}$</td>
                        <td>{walletTrackerFuturesData.averageProfitPerOneTransaction}$</td>
                    </tr>
                    <tr>
                        <td className='walletTracker__stats--title'>highest profit:</td>
                        <td>{walletTrackerTransactionData.highestProfit}$</td>
                        <td>{walletTrackerFuturesData.highestProfit}$</td>
                    </tr>
                    <tr>
                        <td className='walletTracker__stats--title'>lowest profit:</td>
                        <td>{walletTrackerTransactionData.lowestProfit}$</td>
                        <td>{walletTrackerFuturesData.lowestProfit}$</td>
                    </tr>
                    
                    <tr>
                        <td className='walletTracker__stats--title'>first Trade:</td>
                        <td>{walletTrackerTransactionData.firstTrade}</td>
                        <td>{walletTrackerFuturesData.firstTrade}</td>
                    </tr>
                    <tr>
                        <td className='walletTracker__stats--title'>last trade:</td>
                        <td>{walletTrackerTransactionData.lastTrade}</td>
                        <td>{walletTrackerFuturesData.lastTrade}</td>
                    </tr>
                    
                    <tr>
                        <td className='walletTracker__stats--title'>Average moves per month:</td>
                        <td>{walletTrackerTransactionData.averageTransactionsPerMonth}</td>
                        <td>{walletTrackerFuturesData.averageTransactionsPerMonth}</td>
                    </tr>
                    <tr>
                        <td className='walletTracker__stats--title'>Highest amount of moves per month:</td>
                        <td>{walletTrackerTransactionData.highestTransactionsAmountInMonth}</td>
                        <td>{walletTrackerFuturesData.highestTransactionsAmountInMonth}</td>
                    </tr>

                    <tr>
                        <td className='walletTracker__stats--title'>Highest amount of moves in month:</td>
                        <td>{walletTrackerTransactionData.highestTransactionsDate}</td>
                        <td>{walletTrackerFuturesData.highestTransactionsDate}</td>
                    </tr>

                    <tr>
                        <td className='walletTracker__stats--title'>The best month:</td>
                        <td>{walletTrackerTransactionData.bestMonth}</td>
                        <td>{walletTrackerFuturesData.bestMonth}</td>
                    </tr>
                    <tr>
                        <td className='walletTracker__stats--title'>The worste month:</td>
                        <td>{walletTrackerTransactionData.worstMonth}</td>
                        <td>{walletTrackerFuturesData.worstMonth}</td>
                    </tr>


                </tbody>
            </table>

                <div className='walletTracker__stats--card'>
                    <Rocket className='walletTracker__stats--cardRocket' />
                    <Moon className={`walletTracker__stats--cardMoon-${theme}  walletTracker__stats--cardMoon`} />
                    <div className={`walletTracker__stats--cardContainer-${theme} walletTracker__stats--cardContainer`}>
                        <p>Cash Flow: {walletTrackerTransactionData.cashFlow + walletTrackerFuturesData.cashFlow}$ </p>
                        <p>Total profit: {walletTrackerTransactionData.totalProfit + walletTrackerFuturesData.totalProfit}$</p>
                        
                             
                            <p>Every dolar invested in futures <br></br> makes you
                            {
                                walletTrackerFuturesData.totalProfit && walletTrackerFuturesData.cashFlow ?
                               ` ${(Math.round(walletTrackerFuturesData.totalProfit / walletTrackerFuturesData.cashFlow*100)) / 100}$ ` 
                               : ' 0$ '
                            }    
                            richer </p>
                        
                            <p>Every dolar invested in transactions <br></br> makes you
                            {
                                walletTrackerTransactionData.totalProfit && walletTrackerTransactionData.cashFlow ?
                               ` ${(Math.round(walletTrackerTransactionData.totalProfit / walletTrackerTransactionData.cashFlow*100)) / 100}$ ` 
                               : ' 0$ '
                            }    
                            richer </p>
                        </div>
                    
                </div>
            </div>

            <div className='walletTracker__charts'>
                    <div className='walletTracker__charts--transactions'>
                        <h1 className='walletTracker__charts--header'> Spot </h1>

                        <div className='walletTracker__charts--box'>
                            <div className='walletTracker__charts--container'>
                            {
                                walletTrackerTransactionData.monthlyProfitChartdata ?
                                
                                    <LineChart tickMark='$' header='monthly profits' width={300} height={300} times={walletTrackerTransactionData.monthlyProfitChartdata.profitTimes} values={walletTrackerTransactionData.monthlyProfitChartdata.profitValues} chartColor='#f39c12' />
                                
                                :
                                <h1 className='walletTracker__charts--alternativeText'> Add some spot transactions to see chart </h1>
                            }
                            </div>
                        <div className='walletTracker__charts--container'>
                            {
                                walletTrackerTransactionData.monthlyProfitChartdata ?
                                
                                    <LineChart tickMark='%' beginAtZero={true}  header='efficiency' width={300} height={300} times={walletTrackerTransactionData.monthlyProfitChartdata.efficiencyTimes} values={walletTrackerTransactionData.monthlyProfitChartdata.efficiencyValues} chartColor='#7ed6df' />
                                
                                :
                                <h1 className='walletTracker__charts--alternativeText'> Add some spot transactions to see chart </h1>
                            }
                        </div>
                        </div>
                    </div>

                    <div className='walletTracker__charts--futures'>

                    <h1 className='walletTracker__charts--header'> Futures </h1>
                    <div className='walletTracker__charts--box'>
                    <div className='walletTracker__charts--container'>
                        {
                            walletTrackerFuturesData.monthlyProfitChartdata ?
                            
                                <LineChart tickMark='$' header='monthly profits' width={300} height={300} times={walletTrackerFuturesData.monthlyProfitChartdata.profitTimes} values={walletTrackerFuturesData.monthlyProfitChartdata.profitValues} chartColor= '#f39c12'/>
                            
                            :
                            <h1 className='walletTracker__charts--alternativeText'> Add some futures transactions to see chart </h1>
                        }
                    </div>
                    <div className='walletTracker__charts--container'>
                        {
                            walletTrackerFuturesData.monthlyProfitChartdata ?
                            
                                <LineChart tickMark='%' beginAtZero={true} header='efficiency' width={300} height={300} times={walletTrackerFuturesData.monthlyProfitChartdata.efficiencyTimes} values={walletTrackerFuturesData.monthlyProfitChartdata.efficiencyValues} chartColor= '#7ed6df' />
                            
                            :
                            <h1 className='walletTracker__charts--alternativeText'> Add some futures transactions to see chart </h1>
                        }
                    </div>
                    </div>
                    </div>
                
                
                </div>
            </div>
        
    </div>
)};

const mapDispatchToProps = dispatch => ({
    setWalletTrackerLabel: data => dispatch(setWalletTrackerLabel(data)),
    userTransactionDelete: data => dispatch(userTransactionDelete(data)),
    setTransactionsTableLoading: () => dispatch(setTransactionsTableLoading()),
    setFuturesTableLoading: () => dispatch(setFuturesTableLoading()),
    userFutureDelete: data => dispatch(userFutureDelete(data)),
    
});

const mapStateToProps = state => ({
    label: state.error.walletTrackerLabel,
    id: state.user.currentUser._id,
    walletTrackerTransactionData: state.user.walletTrackerTransactionData,
    walletTrackerFuturesData: state.user.walletTrackerFuturesData,
    theme: state.user.theme
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletTrackerPage);