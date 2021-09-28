import UserActionTypes from './user.types';


// USER FUNCTIONS
export const signUpUser = userData => ({
    type: UserActionTypes.SIGN_UP_USER,
    payload: userData
});

export const signSuccess = data => ({
    type: UserActionTypes.SIGN_SUCCESS,
    payload: data
});

export const signFailure = () => ({
    type: UserActionTypes.SIGN_FAILURE
});

export const signInUser = data => ({
    type: UserActionTypes.SIGN_IN_USER,
    payload: data
});

export const isUserLogedIn = () => ({
    type: UserActionTypes.IS_USER_LOGED_IN
});

export const logout = () => ({
    type: UserActionTypes.USER_LOGOUT
});



// TRADES
export const userTradeUpload = data => ({
    type: UserActionTypes.USER_TRADE_UPLOAD,
    payload: data
});

export const userTradeDelete = data => ({
    type: UserActionTypes.USER_TRADE_DELETE,
    payload: data
});

export const userTradeUpdate = data => ({
    type: UserActionTypes.USER_TRADE_UPDATE,
    payload: data
});


export const updateUserWallet = data => ({
    type: UserActionTypes.UPDATE_USER_WALLET,
    payload: data
});




// TRANSACTIONS

export const userTransactionUpload = data => ({
    type: UserActionTypes.USER_TRANSACTION_UPLOAD,
    payload: data
});

export const userTransactionDelete = data => ({
    type: UserActionTypes.USER_TRANSACTION_DELETE,
    payload: data
});

export const userTransactionEdit = data => ({
    type: UserActionTypes.USER_TRANSACTION_EDIT,
    payload: data
});

export const updateUserTransaction = data => ({
    type: UserActionTypes.UPDATE_USER_TRANSACTION,
    payload: data
});


// FUTURES
export const userFutureUpload = data => ({
    type: UserActionTypes.USER_FUTURE_UPLOAD,
    payload: data
});

export const userFutureDelete = data => ({
    type: UserActionTypes.USER_FUTURE_DELETE,
    payload: data
}) ;

export const userFutureEdit = data => ({
    type: UserActionTypes.USER_FUTURE_EDIT,
    payload: data
});


export const updateUserFuture = data => ({
    type: UserActionTypes.UPDATE_USER_FUTURE,
    payload: data
});

// TABLES

export const setTransactionsTableLoading = () => ({
    type: UserActionTypes.SET_TRANSACTIONS_TABLE_LOADING
});

export const unsetTransactionsTableLoading = () => ({
    type: UserActionTypes.UNSET_TRANSACTIONS_TABLE_LOADING
});

export const setTableLoading = () => ({
    type: UserActionTypes.SET_TABLE_LOADING
    });
    
export const unsetTableLoading = () => ({
        type: UserActionTypes.UNSET_TABLE_LOADING
    });

export const setFuturesTableLoading = () => ({
    type: UserActionTypes.SET_FUTURES_TABLE_LOADING
});

export const unsetFuturesTableLoading = () => ({
    type: UserActionTypes.UNSET_FUTURES_TABLE_LOADING
});

// THEME

export const setTheme = data => ({
    type: UserActionTypes.SET_THEME,
    payload: data
});

export const changeTheme = data => ({
    type: UserActionTypes.CHANGE_THEME,
    payload: data
});

// SPINNER LOADER

export const activeSpinnerLoader = () => ({
    type: UserActionTypes.ACTIVE_SPINNERLOADER
});

export const disActiveSpinnerLoader = () => ({
    type: UserActionTypes.DISACTIVE_SPINNERLOADER
});