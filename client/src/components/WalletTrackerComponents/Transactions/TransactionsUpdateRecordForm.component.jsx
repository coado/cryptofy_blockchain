import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as Close} from '../../../svg/close-outline.svg';
import Button from '../../button/button.component';

import { userTransactionEdit } from '../../../redux/user/user.actions';
import { replaceComma, checkNumberField, calculatePercentageCourseChange } from '../../../utils/formFuntions';

const TransactionsUpdateRecordForm  = ({ theme, setTransactionsTableLoading, setEditData, editData, setWalletTrackerLabel, hideForm, userTransactionEdit }) => {
   
    const { buyCurrency, buyAmount, buyCourse, buyDate, profit, sellCourse, sellDate} = editData;

    
    const onChange = e => {
        const { name, value } = e.target;
        setEditData(prevState => ({
            ...prevState,
            [name]: value
        }))
    };


     const handleSubmit = e => {
        e.preventDefault();

        if (editData.sellCourse) editData.sellCourse = replaceComma(editData.sellCourse);
        if (editData.profit)  editData.profit = replaceComma(editData.profit);

        editData.buyAmount = replaceComma(editData.buyAmount);
        editData.buyCourse = replaceComma(editData.buyCourse);

        if(checkNumberField(editData.buyAmount, editData.buyCourse, editData.sellAmount, editData.sellCourse, editData.profit)) {
            return setWalletTrackerLabel({
                status: true,
                message: 'Provide only numbers in amount, profit and course fields. '
            })
        }

        if (editData.buyCourse && editData.sellCourse) {
            editData.percentageCourseChange = calculatePercentageCourseChange(editData.buyCourse, editData.sellCourse);
        };

        setTransactionsTableLoading();
        userTransactionEdit(editData);
        hideForm();
    };

    return (
    <div className={`walletTrackerTransactionForm-${theme} walletTrackerTransactionForm`}>
        <div className='walletTrackerTransactionForm__container'>
            <form onSubmit={handleSubmit} >
                <div className='close'>
                    <Close className='close--icon' onClick={hideForm} />
                </div>
                    <h1 className='walletTrackerTransactionForm__header'> Update record </h1>
                <div className='walletTrackerTransactionForm__box'>
                    <div className='walletTrackerTransactionForm__buy'>
                        <p className='walletTrackerTransactionForm__paragraph'>Buying</p>
                        <div className='walletTrackerTransactionForm__inputBox'>
                            <label htmlFor='walletTrackerTransactionForm__input--1'> CURRENCY:  </label>
                            <input autoComplete='off' onChange={onChange} defaultValue={buyCurrency} required name='buyCurrency' type='text' placeholder='currency' id='walletTrackerTransactionForm__input--1' className='walletTrackerTransactionForm__input' />
                        </div>
                        <div className='walletTrackerTransactionForm__inputBox'>
                            <label htmlFor='walletTrackerTransactionForm__input--2'> AMOUNT:  </label>
                            <input autoComplete='off' onChange={onChange} defaultValue={buyAmount} required name='buyAmount' type='text' placeholder='amount' id='walletTrackerTransactionForm__input--2' className='walletTrackerTransactionForm__input' />
                        </div>
                        <div className='walletTrackerTransactionForm__inputBox'>
                            <label htmlFor='walletTrackerTransactionForm__input--3'> COURSE:  </label>
                            <input autoComplete='off' onChange={onChange} defaultValue={buyCourse} required name='buyCourse' type='text' placeholder='course' id='walletTrackerTransactionForm__input--3' className='walletTrackerTransactionForm__input' />
                        </div>
                        <div className='walletTrackerTransactionForm__inputBox'>
                            <label htmlFor='walletTrackerTransactionForm__input--4'> DATE:  </label>
                            <input autoComplete='off' onChange={onChange} defaultValue={buyDate} required name='buyDate' type='date' placeholder='date' id='walletTrackerTransactionForm__input--4' className='walletTrackerTransactionForm__input' />
                        </div>
                    </div>

                    <div className='walletTrackerTransactionForm__sell'>
                        <p className='walletTrackerTransactionForm__paragraph'>selling</p>
                        <div className='walletTrackerTransactionForm__inputBox'>
                            <label htmlFor='walletTrackerTransactionForm__input--6'> COURSE:  </label>
                            <input autoComplete='off' onChange={onChange} defaultValue={sellCourse} name='sellCourse' type='text' placeholder='course' id='walletTrackerTransactionForm__input--6' className='walletTrackerTransactionForm__input' />
                        </div>
                        <div className='walletTrackerTransactionForm__inputBox'>
                            <label htmlFor='walletTrackerTransactionForm__input--7'> PROFIT:  </label>
                            <input autoComplete='off' onChange={onChange} defaultValue={profit} name='profit' type='text' placeholder='profit' id='walletTrackerTransactionForm__input--7' className='walletTrackerTransactionForm__input' />
                        </div>
                        <div className='walletTrackerTransactionForm__inputBox'>
                            <label htmlFor='walletTrackerTransactionForm__input--8'> DATE:  </label>
                            <input autoComplete='off' onChange={onChange} defaultValue={sellDate} name='sellDate' type='date' placeholder='date' id='walletTrackerTransactionForm__input--8' className='walletTrackerTransactionForm__input' />
                        </div>
                    </div>
                </div>
                <Button text='APPLY' styles={{marginTop: '0rem', marginBottom: '2rem'}} />
                
            </form>
        </div>
    </div>
)};

const mapDispatchToProps = dispatch => ({
    userTransactionEdit: data => dispatch(userTransactionEdit(data))
});

export default connect(null, mapDispatchToProps)(TransactionsUpdateRecordForm);