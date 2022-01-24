// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./NiftyPass.sol";

contract NiftyPassFactory is Ownable {
    struct Event {
        string eventName;
        string eventSymbol;
        uint256 ticketPrice;
        uint256 totalSupply;
    }

    address[] private activeEvents;
    mapping(address => Event) private activeEventMapping;

    event Created(address nftAddress);

    // Creates new NFT for an event
    function createNewEvent(
        string memory eventName,
        string memory eventSymbol,
        uint256 ticketPrice,
        uint256 totalSupply
    ) public returns (address) {
        NiftyPass newEvent =
            new NiftyPass(
                eventName,
                eventSymbol,
                ticketPrice,
                totalSupply,
				msg.sender
            );

        address newEventAddress = address(newEvent);

        activeEvents.push(newEventAddress);
        activeEventMapping[newEventAddress] = Event({
            eventName: eventName,
            eventSymbol: eventSymbol,
            ticketPrice: ticketPrice,
            totalSupply: totalSupply
        });

        emit Created(newEventAddress);

        return newEventAddress;
    }

    // Get all active fests
    function getActiveEvents() public view returns (address[] memory) {
        return activeEvents;
    }

    // Get event details
    function getEventDetails(address eventAddress) public view
        returns (
            string memory,
            string memory,
            uint256,
            uint256
        )
    {
        return (
            activeEventMapping[eventAddress].eventName,
            activeEventMapping[eventAddress].eventSymbol,
            activeEventMapping[eventAddress].ticketPrice,
            activeEventMapping[eventAddress].totalSupply
        );
    }
}