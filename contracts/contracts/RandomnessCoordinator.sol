// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {VRFConsumerBaseV2} from "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import {VRFCoordinatorV2Interface} from "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

contract RandomnessCoordinator is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface public immutable coordinator;
    bytes32 public keyHash;
    uint64 public subscriptionId;

    event RandomnessRequested(uint256 indexed requestId);
    event RandomnessFulfilled(uint256 indexed requestId, uint256 result);

    mapping(uint256 => address) public requestToCaller;
    mapping(uint256 => uint256) public requestToResult;

    constructor(address _coordinator, bytes32 _keyHash, uint64 _subId) VRFConsumerBaseV2(_coordinator) {
        coordinator = VRFCoordinatorV2Interface(_coordinator);
        keyHash = _keyHash;
        subscriptionId = _subId;
    }

    function requestRandomness(uint32 callbackGasLimit) external returns (uint256) {
        uint256 requestId = coordinator.requestRandomWords(keyHash, subscriptionId, 3, callbackGasLimit, 1);
        requestToCaller[requestId] = msg.sender;
        emit RandomnessRequested(requestId);
        return requestId;
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        requestToResult[requestId] = randomWords[0];
        emit RandomnessFulfilled(requestId, randomWords[0]);
    }
}
