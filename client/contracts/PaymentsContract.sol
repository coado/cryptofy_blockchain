// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PaymentsContract {
    uint256 public price = 10**17;
    address payable public owner;

    struct UserSubscriptionSchema {
        bool excludedAccount;
        string timestamp;
    }

    mapping(address => UserSubscriptionSchema) private userSubscriptionList; // gettind data via getUserSubscriptionData

    modifier onlyOwner() {
        require(owner == msg.sender, "Access denied. Only for owner.");
        _;
    }

    event Payment(string _timestamp, address _from, uint256 _value);

    constructor() public {
        owner = payable(msg.sender);
        UserSubscriptionSchema storage schema = getSchema(owner);
        schema.excludedAccount = true;
    }

    function getUserSubscriptionData()
        public
        view
        returns (bool, string memory)
    {
        // gas optymalization
        UserSubscriptionSchema memory schema = userSubscriptionList[msg.sender];
        return (schema.excludedAccount, schema.timestamp);
    }

    function checkBalance() external view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function withdrawFunds() external onlyOwner {
        owner.transfer(address(this).balance);
    }

    function payment(string calldata _timestamp) external payable {
        require(msg.value >= price, "unpermitted payment value");
        UserSubscriptionSchema storage schema = getSchema(msg.sender);
        schema.timestamp = _timestamp;
        emit Payment(_timestamp, msg.sender, msg.value);
    }

    function changePrice(uint256 _newPrice) external onlyOwner {
        price = _newPrice;
    }

    function addToExcluded(address _address) external onlyOwner {
        require(_address != address(0), "Address 0, permision denied");
        UserSubscriptionSchema storage schema = getSchema(_address);
        schema.excludedAccount = true;
    }

    function removeFromExcluded(address _address) external onlyOwner {
        require(_address != address(0), "Address 0, permission denied");
        UserSubscriptionSchema storage schema = getSchema(_address);
        schema.excludedAccount = false;
    }

    function getSchema(address _address)
        private
        view
        returns (UserSubscriptionSchema storage)
    {
        return userSubscriptionList[_address];
    }
}
