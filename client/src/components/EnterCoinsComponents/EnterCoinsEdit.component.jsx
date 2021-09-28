import React from 'react';
import Button from '../button/button.component';
import { ReactComponent as Close} from '../../svg/close-outline.svg';
import { connect } from 'react-redux';
import { userTradeUpdate } from '../../redux/user/user.actions';
import { checkTradeType, sliceComment, replaceComma, checkNumberField } from '../../utils/formFuntions';
import CurrenciesList from '../List/CurrenciesList.component';

const EnterCoinsEdit = ({ setHiddenUploadEdit, editData, setEditData, userTradeUpdate, setTradeLabel, setTableLoading }) => {
    
    let { typeOfTrade, buyCurrency, buyAmount, sellCurrency, sellAmount, comment, date} = editData;

    const onChange = e => {
        const { name, value } = e.target;
        
        setEditData(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = e => {
       e.preventDefault();

          // Checking if trade type is correct
          if(!checkTradeType(editData.typeOfTrade)) {
            setHiddenUploadEdit(true);
            return setTradeLabel({
                status: true,
                message: 'Type of trade is not correct. Please try again.'
            })
        };

        if (typeOfTrade === 'Deposit') {
            editData.sellAmount = "0";
            editData.sellCurrency = "-";
        };

        if (typeOfTrade === 'Withdrawal') {
            editData.buyAmount = "0";
            editData.buyCurrency = '-';
        }

         // Slice comment every 20 characters
         editData.comment = sliceComment(editData.comment);

        // replacing , with . 
        editData.buyAmount = replaceComma(editData.buyAmount);
        editData.sellAmount = replaceComma(editData.sellAmount);

        // checking if in amount fields is number
        if(checkNumberField(editData.buyAmount, editData.sellAmount)) {
            setHiddenUploadEdit(true);
            return setTradeLabel({
                status: true,
                message: 'Please provide only numbers in amount fields.'
            })
        }

        editData.buyCurrency = editData.buyCurrency.toLowerCase();
        editData.sellCurrency = editData.sellCurrency.toLowerCase();
       
       setTableLoading()
       userTradeUpdate(editData);
       setHiddenUploadEdit(true);
    }

    return (
    <div className='enterCoinsEdit'>
        <div className='enterCoinsEdit__container'>
        <form onSubmit={handleSubmit} className='enterCoinsEdit__form' id='enterCoinsEdit-form'> 
        <div className='close'>
            <Close onClick={() => setHiddenUploadEdit(true)} className='close--icon'/>
        </div>
            <h1 className='enterCoinsEdit__header'>Edit Record</h1>
            <div className='enterCoinsEdit__type'>
                <label htmlFor='enterCoinsEdit__type'> TYPE: </label>
                <input onChange={onChange} defaultValue={typeOfTrade} required name='typeOfTrade' id='enterCoinsEdit__type' list='types__edit' className='enterCoinsEdit__input' type="text" placeholder="type" />
            </div>
            <datalist id="types__edit">
                <option value="Trade" />
                <option value="Deposit" />
                <option value="Withdrawal" />
                <option value="Mining" />
            </datalist>
            <CurrenciesList />

            <div className='enterCoinsEdit__buysell'>
            <div className='enterCoinsEdit__buy'>
                <label htmlFor='enterCoinsEdit__input--buy'>BUY: </label>
                <input disabled={typeOfTrade === 'Withdrawal' ? 'disabled' : ''} list='currencies' onChange={onChange} defaultValue={buyCurrency} required name='buyCurrency' id='enterCoinsEdit__input--buy' className='enterCoinsEdit__input' type="text" placeholder="currency" />
                <input disabled={typeOfTrade === 'Withdrawal' ? 'disabled' : ''} onChange={onChange} defaultValue={buyAmount} required name='buyAmount' className='enterCoinsEdit__input' type="text" placeholder="amount" />
            </div>
            <div className='enterCoinsEdit__sell'>
                <label htmlFor='enterCoinsEdit__input--sell'>SELL: </label>
                <input disabled={typeOfTrade === 'Deposit' ? 'disabled' : ''} list='currencies' onChange={onChange} defaultValue={sellCurrency} required name='sellCurrency' id='enterCoinsEdit__input--sell' className='enterCoinsEdit__input' type="text" placeholder="currency" />
                <input disabled={typeOfTrade === 'Deposit' ? 'disabled' : ''} onChange={onChange} defaultValue={sellAmount} required name='sellAmount' className='enterCoinsEdit__input' type="text" placeholder="amount" />
            </div>
        </div>
        <div className='enterCoinsEdit__comment'>
            <label className='enterCoinsEdit__comment--label' htmlFor='enterCoinsEdit__comment'>COMMENT: </label>
            <input onChange={onChange} defaultValue={comment} name='comment' id='enterCoinsEdit__comment'  className='enterCoinsEdit__comment--input enterCoinsEdit__input' /> 
        </div>
        <div className='enterCoinsEdit__footer'>
            <div className='enterCoinsEdit__date'>
                <label htmlFor='enterCoinsEdit__date'>DATE: </label>
                <input onChange={onChange} defaultValue={date} required name='date' id='enterCoinsEdit__date' className='enterCoinsEdit__input ' type="date" placeholder="date" />
            </div>
            <Button type='submit' text='APPLY' styles={{
                padding: '1rem 3rem',
                marginLeft: '10rem',
                marginTop: '2rem'
            }}/>
        </div>
        </form>
        </div>
    </div>
)};

const mapDispatchToProps = dispatch => ({
    userTradeUpdate: data => dispatch(userTradeUpdate(data))
});

export default connect(null, mapDispatchToProps)(EnterCoinsEdit);