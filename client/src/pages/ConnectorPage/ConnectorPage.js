import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useWeb3Context  } from 'web3-react';
import useGetAccess from '../../hooks/useGetAccess';
import getContract from '../../utils/getContract';

import { signInUser } from '../../redux/user/user.actions';
import { signUpUser } from '../../redux/user/user.actions';


const ConnectorPage = ({ signUpUser, signInUser }) => {
    const context = useWeb3Context()
    const { account, active, networkId, library } = context
    const access = useGetAccess(networkId, active, library, account, signInUser);

    useEffect(() => {
        connectMetamask()
    }, [])

    const connectMetamask = () => {
        context.setConnector('MetaMask')
    } 

    

    const pay = async () => {
        try {
            // getting contract interface
            const contract = getContract(networkId, library);
            // getting current timestamp + 30days in ms
            const timestamp = String(Date.now() + 60*60*24*30*1000);
            // calling payment function
            await contract.methods.payment(timestamp).send({from: account, value: library.utils.toWei('0.1', 'ether')})
            .on('confirmation', (confNumber, receipt, latestBlockHash) => {
                console.log(receipt);
                let userAddress = receipt.from
                signUpUser({
                    userAddress
                })
            })
        } catch(error) {
            console.error(error);
        }

    }
    return (
        <div className='ConnectorPage'>
            <div className='ConnectorPage__container'>
                <h1 className='ConnectorPage__addressText'> Address: </h1>
                <h2 className='ConnectorPage__userAddress'> {active ? account : '...'} </h2>
                {
                    active ?
                    <button onClick={pay} className='ConnectorPage__button'> {access ? 'Loading...' : 'Buy Subscription'} </button>
                    :
                    <button onClick={() => context.setConnector('MetaMask')} className='ConnectorPage__button'> Connect Wallet </button>
                }
            </div>
        </div>
)};

const mapDispatchToProps = dispatch => ({
    signUpUser: data => dispatch(signUpUser(data)),
    signInUser: data => dispatch(signInUser(data))

})

export default connect(null, mapDispatchToProps)(React.memo(ConnectorPage));