import React, { useState } from 'react';
import Button from '../../components/button/button.component';
import Table from '../../components/EnterCoinsComponents/Table.component';
import EnterCoinsForm from '../../components/EnterCoinsComponents/EnterCoinsForm.component';
import EnterCoinsEdit from '../../components/EnterCoinsComponents/EnterCoinsEdit.component';
import AlertWindow from '../../components/AlertWindow/AlertWindow.component'
import Label from '../../components/Label/Label.component';
import { connect } from 'react-redux';
import { userTradeDelete, setTableLoading } from '../../redux/user/user.actions';
import { setTradeLabel } from '../../redux/error/error.actions';


const EnterCoinsPage = ({ theme, userTradeDelete, id, label, setTradeLabel, setTableLoading }) => {
    const [hiddenUploadForm, setHiddenUploadForm] = useState(true);
    const [hiddenUploadEdit, setHiddenUploadEdit] = useState(true);
    const [hiddenAlertWindow, setHiddenAlertWindow] = useState(true);
    const [nodeArr, setNodeArr] = useState([]);
    const [editData, setEditData] = useState({
        objectID: null,
        typeOfTrade: '',
        buyCurrency: '',
        buyAmount: null,
        sellCurrency: '',
        sellAmount: null,
        comment: '',
        date: null
    })


    const deleteRecords = () => {
        const deleteArr = nodeArr.filter(el => el.checked === true).map(el => el.dataset.id);
        if (deleteArr.length === 0) return;
        setTableLoading();
        userTradeDelete({
            id,
            records: deleteArr
        });
        nodeArr.forEach(el => el.checked = false)
    }
    
    return (
    <div className={`enterCoinsPage-${theme} enterCoinsPage`}>
        {
            label.status ? <Label status='error' message={label.message} hideLabel={() => setTradeLabel({status: false, message: ''})} /> : null
        }
        {
            hiddenUploadForm ? null : <EnterCoinsForm setTableLoading={setTableLoading} setTradeLabel={setTradeLabel} setHiddenUploadForm={setHiddenUploadForm} /> 
        }
        {
            hiddenUploadEdit ? null :  <EnterCoinsEdit setTableLoading={setTableLoading} setTradeLabel={setTradeLabel} setHiddenUploadEdit={setHiddenUploadEdit} editData={editData} setEditData={setEditData} />
        }
        {
            hiddenAlertWindow ? null :  <AlertWindow onClick={deleteRecords} hideWindow={setHiddenAlertWindow} text={'Are you sure, that you want to delete this records? '} />
        }

        <div className='button-container'>
            <Button onClick={() => setHiddenUploadForm(false)} text='Add new record' />    
            <Button onClick={() => setHiddenAlertWindow(false)} text='Delete records' /> 
        </div>
            <Table theme={theme} setNodeArr={setNodeArr} setHiddenUploadEdit={setHiddenUploadEdit} setEditData={setEditData} id={id}/>
             
            </div>    
)};

const mapDispatchToProps = dispatch => ({
    userTradeDelete: data => dispatch(userTradeDelete(data)),
    setTradeLabel: data => dispatch(setTradeLabel(data)),
    setTableLoading: () => dispatch(setTableLoading()) 
});

const mapStateToProps = state => ({
    id: state.user.currentUser._id,
    theme: state.user.theme,
    label: state.error.tradeLabel
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterCoinsPage);