import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userFutureUpload } from '../../../redux/user/user.actions';
import { replaceComma, checkNumberField } from '../../../utils/formFuntions';
import { ReactComponent as Close} from '../../../svg/close-outline.svg';
import Button from '../../button/button.component';


const FuturesAddRecordForm = ({ theme, setWalletTrackerLabel, id, hideForm, userFutureUpload, setFuturesTableLoading }) => {
    
    const [data, setData] = useState({
        id, 
        typeOfFuture: '',
        contract: '',
        profit: null,
        entry: null,
        laverage: null,
        date: ''
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

        if (data.profit) data.profit = replaceComma(data.profit);
        if (data.entry) data.entry = replaceComma(data.entry);

            data.typeOfFuture = data.typeOfFuture.toLowerCase();
        if (data.typeOfFuture !== 'short' && data.typeOfFuture !== 'long') {
            return setWalletTrackerLabel({
                status: true,
                message: 'Provide only Long or Short type.'
            })
        }

        if (checkNumberField(data.profit, data.entry)) {
            return setWalletTrackerLabel({
                status: true,
                message: 'Provide only numbers in profit and entry fields. '
            })
        }


        setFuturesTableLoading();
        userFutureUpload(data);
        hideForm();
    }
    
    return (
    <div className={`walletTrackerFuturesForm-${theme} walletTrackerFuturesForm`}>
        <div className='walletTrackerFuturesForm__container'>
            <form onSubmit={handleSubmit} >
            <div className='close'>
                <Close className='close--icon' onClick={hideForm} />
            </div>
            <h1 className='walletTrackerFuturesForm__header'>Add new record</h1>
            <div className='walletTrackerFuturesForm__box'>
                <div className='walletTrackerFuturesForm__inputBox'>
                    <label htmlFor='walletTrackerFuturesForm__type'>TYPE: </label>
                    <input onChange={handleChange} list='shortAndLong' required name='typeOfFuture' type='text' placeholder='type' id='walletTrackerFuturesForm__type' />
                <datalist id="shortAndLong">
                    <option value="Short" />
                    <option value="Long" />
                </datalist>
                </div>
                <div className='walletTrackerFuturesForm__inputBox'>
                    <label htmlFor='walletTrackerFuturesForm__contract'>CONTRACT: </label>
                    <input onChange={handleChange} type='text' name='contract' placeholder='contract' id='walletTrackerFuturesForm__contract' />
                </div>
                <div className='walletTrackerFuturesForm__inputBox'>
                    <label htmlFor='walletTrackerFuturesForm__entry'>ENTRY: </label>
                    <input onChange={handleChange} name='entry' type='text' placeholder='entry' id='walletTrackerFuturesForm__entry' />
                </div>
                <div className='walletTrackerFuturesForm__inputBox'>
                    <label htmlFor='walletTrackerFuturesForm__laverage'>LAVERAGE: </label>
                    <input onChange={handleChange} name='laverage' type='text' placeholder='laverage' id='walletTrackerFuturesForm__laverage' />
                </div>
                <div className='walletTrackerFuturesForm__inputBox'>
                    <label htmlFor='walletTrackerFuturesForm__profit'>PROFIT: </label>
                    <input onChange={handleChange} name='profit' type='text' placeholder='profit' id='walletTrackerFuturesForm__profit' />
                </div>
                <div className='walletTrackerFuturesForm__inputBox'>
                    <label htmlFor='walletTrackerFuturesForm__date'>DATE: </label>
                    <input onChange={handleChange} required name='date' type='date' placeholder='date' id='walletTrackerFuturesForm__date' />
                </div>
                <Button type='submit' styles={{marginTop: 0}} text='APPLY' />
            </div>
            
            </form>
        </div>
    </div>
)};

const mapDispatchToProps = dispatch => ({
    userFutureUpload: data => dispatch(userFutureUpload(data))
});

export default connect(null, mapDispatchToProps)(FuturesAddRecordForm);