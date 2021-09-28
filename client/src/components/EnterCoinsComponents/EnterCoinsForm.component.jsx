import React, { useState } from 'react';
import { ReactComponent as Close} from '../../svg/close-outline.svg'
import { connect } from 'react-redux';
import { userTradeUpload } from '../../redux/user/user.actions';
import { checkTradeType, sliceComment, replaceComma, checkNumberField } from '../../utils/formFuntions';
import Button from '../button/button.component';
import CurrenciesList from '../List/CurrenciesList.component';

const EnterCoinsForm = ({ userTradeUpload, id, setHiddenUploadForm, setTradeLabel, setTableLoading }) => {
   
    const [data, setData] = useState({
        id,
        typeOfTrade: '',
        buyCurrency: '',
        buyAmount: null,
        sellCurrency: '',
        sellAmount: null,
        comment: '',
        date: null
    });

    const onChangeHandle = e => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Checking if trade type is correct
        if(!checkTradeType(data.typeOfTrade)) {
            setHiddenUploadForm(true);
            return setTradeLabel({
                status: true,
                message: 'Type of trade is not correct. Please try again.'
            })
        };

        if (data.typeOfTrade === 'Deposit') {
            data.sellAmount = "0";
            data.sellCurrency = "-";
        };

        if (data.typeOfTrade === 'Withdrawal') {
            data.buyAmount = "0";
            data.buyCurrency = '-';
        }


        // Slice comment every 20 characters
        data.comment = sliceComment(data.comment);

        // replacing , with . 
        data.buyAmount = replaceComma(data.buyAmount);
        data.sellAmount = replaceComma(data.sellAmount);

        // checking if in amount fields is number
        if(checkNumberField(data.buyAmount, data.sellAmount)) {
            setHiddenUploadForm(true);
            return setTradeLabel({
                status: true,
                message: 'Please provide only numbers in amount fields.'
            })
        }
       
        data.buyAmount = data.buyAmount*1;
        data.sellAmount = data.sellAmount*1;
        data.buyCurrency = data.buyCurrency.toLowerCase();
        data.sellCurrency = data.sellCurrency.toLowerCase();
        
        setTableLoading();
        userTradeUpload(data);
        document.getElementById('enterCoins-form').reset();
        setHiddenUploadForm(true);
        
    }

return (
        <div className='enterCoinsForm'>
            <div className='enterCoinsForm__container'>
                <form onSubmit={handleSubmit} className='enterCoinsForm__form' id='enterCoins-form'> 
                <div className='close'>
                    <Close onClick={() => setHiddenUploadForm(true)} className='close--icon'/>
                </div>
            <h1 className='enterCoinsForm__text'> Add new record </h1>
            <div className='enterCoinsForm__type'>
                <label htmlFor='enterCoinsForm__type'> TYPE: </label>
                <input required onChange={onChangeHandle} name='typeOfTrade' id='enterCoinsForm__type' list='types' className='enterCoinsForm__input' type="text" placeholder="type" />
            </div>
                <datalist id="types">
                    <option value="Trade" />
                    <option value="Deposit" />
                    <option value="Withdrawal" />
                    <option value="Mining" />
                </datalist>
            <CurrenciesList />
                
            <p className='enterCoinsForm__paragraph' style={data.typeOfTrade === 'Deposit' ?  null : {opacity: "0"}}> Use deposit if you just want provide crypto to system.  </p>

            <div className='enterCoinsForm__buysell'>
                <div className='enterCoinsForm__buy'>
                    <label htmlFor='enterCoinsForm__input--buy'> {
                        data.typeOfTrade === 'Deposit' ? "CURRENCY: " : "BUY: " 
                    } </label>
                    <input disabled={data.typeOfTrade === 'Withdrawal' ? 'disabled' : ''} list='currencies' required onChange={onChangeHandle} name='buyCurrency' id='enterCoinsForm__input--buy' className='enterCoinsForm__input' type="text" placeholder="currency" />
                    <input disabled={data.typeOfTrade === 'Withdrawal' ? 'disabled' : ''} required onChange={onChangeHandle} name='buyAmount' className='enterCoinsForm__input' type="text" placeholder="amount" />
                </div>
                <div className='enterCoinsForm__sell'>
                    <label htmlFor='enterCoinsForm__input--sell'> {
                        data.typeOfTrade === 'Deposit' ? "USD: " : "SELL: " 
                    } </label>
                    <input  disabled={data.typeOfTrade === 'Deposit' ? 'disabled' : ''} list='currencies' required onChange={onChangeHandle} name='sellCurrency' id='enterCoinsForm__input--sell' className='enterCoinsForm__input' type="text" placeholder="currency" />
                    <input  disabled={data.typeOfTrade === 'Deposit' ? 'disabled' : ''}   required onChange={onChangeHandle} name='sellAmount' className='enterCoinsForm__input' type="text" placeholder="amount" />
                </div>
            </div>
            <div className='enterCoinsForm__comment--container'>
                <label className='enterCoinsForm__comment--label' htmlFor='enterCoinsForm__comment'>COMMENT: </label>
                <input onChange={onChangeHandle} name='comment' id='enterCoinsForm__comment'  className='enterCoinsForm__comment' /> 
            </div>
            <div className='enterCoinsForm__footer'>
                <div className='enterCoinsForm__date'>
                    <label htmlFor='enterCoinsForm__date'>DATE: </label>
                    <input required onChange={onChangeHandle} name='date' id='enterCoinsForm__date' className='enterCoinsForm__input' type="date" placeholder="date" />
                </div>
                <Button text='APPLY' styles={{
                    fontSize: "1.5rem",
                    padding: "1rem 2.5rem",
                    marginRight: "3.5rem"
                }}/> 
               
            </div>
        </form>
    </div>
</div>    

)};

const mapDispatchToProps = dispatch => ({
    userTradeUpload: data => dispatch(userTradeUpload(data))
});

const mapStateToProps = state => ({
    id: state.user.currentUser._id
})
export default connect(mapStateToProps, mapDispatchToProps)(EnterCoinsForm);
