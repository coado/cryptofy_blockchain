import * as PaymentsContractABI from '../abis/PaymentsContract.json';


const getContract = (networkId, library) => {
    if (!networkId) return null
    const { address } = PaymentsContractABI.default.networks[networkId];
    const { abi } = PaymentsContractABI.default;
    return new library.eth.Contract(abi, address);
}

export default getContract;