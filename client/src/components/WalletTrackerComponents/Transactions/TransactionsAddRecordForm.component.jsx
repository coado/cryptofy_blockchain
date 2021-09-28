import React, { useState } from 'react';
import { connect } from 'react-redux';

import { ReactComponent as Close} from '../../../svg/close-outline.svg';
import Button from '../../button/button.component';
import { replaceComma, checkNumberField, calculatePercentageCourseChange } from '../../../utils/formFuntions';
import { userTransactionUpload } from '../../../redux/user/user.actions';
import CurrenciesList from '../../List/CurrenciesList.component';


const TransactionsAddRecordForm  = ({ theme, setTransactionsTableLoading, setWalletTrackerLabel, hideForm, userTransactionUpload, id }) => {
   
    const [data, setData] = useState({
        id,
        buyCurrency: '',
        buyAmount: null,
        buyCourse: null,
        buyDate: null,
        sellCourse: null,
        sellDate: null,
        profit: null,
        percentageCourseChange: null
    });



    const handleChange = e => {
        const { name, value } = e.target;

        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (data.sellCourse) data.sellCourse = replaceComma(data.sellCourse);
        if (data.profit)  data.profit = replaceComma(data.profit);

        if (data.buyAmount) data.buyAmount = replaceComma(data.buyAmount);
        if (data.buyCourse) data.buyCourse = replaceComma(data.buyCourse);

        if(checkNumberField(data.buyAmount, data.buyCourse, data.sellCourse, data.profit)) {
            return setWalletTrackerLabel({
                status: true,
                message: 'Provide only numbers in amount, profit and course fields. '
            })
        }

        if (data.buyCourse && data.sellCourse) {
            data.percentageCourseChange = calculatePercentageCourseChange(data.buyCourse, data.sellCourse);
        };

        setTransactionsTableLoading();
        userTransactionUpload(data);
        hideForm();


    };

    return (
    <div className={`walletTrackerTransactionForm-${theme} walletTrackerTransactionForm`}>
        <div className='walletTrackerTransactionForm__container'>
            <form onSubmit={handleSubmit} >
                <div className='close'>
                    <Close className='close--icon' onClick={hideForm} />
                </div>
                    <h1 className='walletTrackerTransactionForm__header'> Add new record </h1>
                <div className='walletTrackerTransactionForm__box'>
                    <div className='walletTrackerTransactionForm__buy'>
                        <p className='walletTrackerTransactionForm__paragraph'>Buying</p>
                        <div className='walletTrackerTransactionForm__inputBox'>
                            <label htmlFor='walletTrackerTransactionForm__input--1'> CURRENCY:  </label>
                            <input autoComplete='off' list='currencies' required onChange={handleChange} name='buyCurrency' type='text' placeholder='currency' id='walletTrackerTransactionForm__input--1' className='walletTrackerTransactionForm__input' />
                            <CurrenciesList />
                        </div>
                        <div className='walletTrackerTransactionForm__inputBox'>
                            <label htmlFor='walletTrackerTransactionForm__input--2'> AMOUNT:  </label>
                            <input autoComplete='off' required onChange={handleChange} name='buyAmount' type='text' placeholder='amount' id='walletTrackerTransactionForm__input--2' className='walletTrackerTransactionForm__input' />
                        </div>
                        <div className='walletTrackerTransactionForm__inputBox'>
                            <label htmlFor='walletTrackerTransactionForm__input--3'> COURSE:  </label>
                            <input autoComplete='off' required onChange={handleChange} name='buyCourse' type='text' placeholder='course' id='walletTrackerTransactionForm__input--3' className='walletTrackerTransactionForm__input' />
                        </div>
                        <div className='walletTrackerTransactionForm__inputBox'>
                            <label htmlFor='walletTrackerTransactionForm__input--4'> DATE:  </label>
                            <input autoComplete='off' required onChange={handleChange} name='buyDate' type='date' placeholder='date' id='walletTrackerTransactionForm__input--4' className='walletTrackerTransactionForm__input' />
                        </div>
                    </div>

                    <div className='walletTrackerTransactionForm__sell'>
                        <p className='walletTrackerTransactionForm__paragraph'> selling </p>
                        <div className='walletTrackerTransactionForm__inputBox'>
                            <label htmlFor='walletTrackerTransactionForm__input--6'> COURSE:  </label>
                            <input autoComplete='off' onChange={handleChange} name='sellCourse' type='text' placeholder='course' id='walletTrackerTransactionForm__input--6' className='walletTrackerTransactionForm__input' />
                        </div>
                        <div className='walletTrackerTransactionForm__inputBox'>
                            <label htmlFor='walletTrackerTransactionForm__input--7'> PROFIT:  </label>
                            <input autoComplete='off' onChange={handleChange} name='profit' type='text' placeholder='profit' id='walletTrackerTransactionForm__input--7' className='walletTrackerTransactionForm__input' />
                        </div>
                        <div className='walletTrackerTransactionForm__inputBox'>
                            <label htmlFor='walletTrackerTransactionForm__input--8'> DATE:  </label>
                            <input autoComplete='off' onChange={handleChange} name='sellDate' type='date' placeholder='date' id='walletTrackerTransactionForm__input--8' className='walletTrackerTransactionForm__input' />
                        </div>
                    </div>
                </div>
                <Button type='submit' text='APPLY' styles={{marginTop: '0rem', marginBottom: '2rem'}} />
                
            </form>
        </div>
    </div>
)};

const mapDispatchToProps = dispatch => ({
    userTransactionUpload: data => dispatch(userTransactionUpload(data))
});

export default connect(null, mapDispatchToProps)(TransactionsAddRecordForm);