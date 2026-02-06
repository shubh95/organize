// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DailyOrganizerLog {
    event SummaryLogged(address indexed user, uint256 indexed dayStamp, bytes32 summaryHash, string uri);

    struct Entry {
        bytes32 summaryHash;
        string uri;
        uint256 loggedAt;
    }

    mapping(address => mapping(uint256 => Entry)) public entries;

    function logDaySummary(uint256 dayStamp, bytes32 summaryHash, string calldata uri) external {
        entries[msg.sender][dayStamp] = Entry({
            summaryHash: summaryHash,
            uri: uri,
            loggedAt: block.timestamp
        });

        emit SummaryLogged(msg.sender, dayStamp, summaryHash, uri);
    }
}
