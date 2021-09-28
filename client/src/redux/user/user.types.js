const UserActionTypes = {
    SIGN_UP_USER: 'SIGN_UP_USER',
    SIGN_IN_USER: 'SIGN_IN_USER',
    SIGN_SUCCESS: 'SIGN_SUCCESS',
    SIGN_FAILURE: 'SIGN_FAILURE',
    USER_LOGOUT: ' USER_LOGOUT',
    IS_USER_LOGED_IN: 'IS_USER_LOGED_IN',
    USER_TRADE_UPLOAD: ' USER_TRADE_UPLOAD',
    USER_TRADE_DELETE: 'USER_TRADE_DELETE',
    USER_TRADE_UPDATE: 'USER_TRADE_UPDATE',

    // crud types

    //TRANSACTION
    USER_TRANSACTION_DELETE: 'USER_TRANSACTION_DELETE',
    USER_TRANSACTION_UPLOAD: 'USER_TRANSACTION_UPLOAD',
    USER_TRANSACTION_EDIT: 'USER_TRANSACTION_EDIT',
    // FUTURE
    USER_FUTURE_UPLOAD: 'USER_FUTURE_UPLOAD',
    USER_FUTURE_DELETE: 'USER_FUTURE_DELETE',
    USER_FUTURE_EDIT: 'USER_FUTURE_EDIT',

    // to reducer
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_USER_WALLET: 'UPDATE_USER_WALLET',
    UPDATE_USER_TRANSACTION: 'UPDATE_USER_TRANSACTION',
    UPDATE_USER_FUTURE: 'UPDATE_USER_FUTURE',

    // SETTING TABLE LOADING
    SET_TABLE_LOADING: 'SET_TABLE_LOADING',
    UNSET_TABLE_LOADING: 'UNSET_TABLE_LOADING',
    SET_TRANSACTIONS_TABLE_LOADING: 'SET_TRANSACTIONS_TABLE_LOADING',
    UNSET_TRANSACTIONS_TABLE_LOADING: 'UNSET_TRANSACTIONS_TABLE_LOADING',
    SET_FUTURES_TABLE_LOADING: 'SET_FUTURES_TABLE_LOADING',
    UNSET_FUTURES_TABLE_LOADING: 'UNSET_FUTURES_TABLE_LOADING',

    // THEME
    SET_THEME: 'SET_THEME',
    CHANGE_THEME: 'CHANGE_THEME',

    // SPINNER
    ACTIVE_SPINNERLOADER: 'ACTIVE_SPINNERLOADER',
    DISACTIVE_SPINNERLOADER: 'DISACTIVE_SPINNERLOADER'
};

export default UserActionTypes