import { useEffect, useMemo, useState } from 'react'
import  getContract from '../utils/getContract';

const useGetAccess = (networkId, active, library, account, signInUser) => {
    const [access, setAccess] = useState(false);
    const contract = getContract(networkId, library)

    useEffect(() => {
        async function getSubscriptionData() {
            const data = await contract.methods.getUserSubscriptionData().call({from: account})
            const currentTimestamp = Date.now()
            console.log(data)
            console.log(currentTimestamp);
            if (parseInt(data[1]) > currentTimestamp) {
                setAccess(true)
                signInUser({
                    userAddress: account
                })
            } else {
                setAccess(false)
                console.log(access)
            }
        }

        if (active && contract) {
            getSubscriptionData()
        }
    }, [networkId, account])
    return useMemo(() => access, [access])
}

export default useGetAccess;