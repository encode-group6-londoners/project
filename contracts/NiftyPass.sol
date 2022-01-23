// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NiftyPass is Context, AccessControl, ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _ticketIds;
    Counters.Counter private _saleTicketId;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    struct TicketDetails {
        uint256 purchasePrice;
    }

    address private _organiser;
    address[] private customers;
    uint256[] private ticketsForSale;
    uint256 private _ticketPrice;
    uint256 private _totalSupply;

    mapping(uint256 => TicketDetails) private _ticketDetails;
    mapping(address => uint256[]) private purchasedTickets;

	function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    constructor(
        string memory eventName,
        string memory EventSymbol,
        uint256 ticketPrice,
        uint256 totalSupply,
        address organiser
    ) ERC721(eventName, EventSymbol) {
        _setupRole(MINTER_ROLE, organiser);
        _ticketPrice = ticketPrice;
        _totalSupply = totalSupply;
        _organiser = organiser;
    }

    modifier isValidTicketCount {
        require(_ticketIds.current() < _totalSupply, "Maximum ticket limit exceeded!");
        _;
    }

    modifier isMinterRole {
        require(hasRole(MINTER_ROLE, _msgSender()), "User must have minter role to mint");
        _;
    }

    /*
     * Mint new tickets and assign it to operator
     * Access controlled by minter only
     * Returns new ticketId
     */
    function mint(address operator) internal virtual isMinterRole returns (uint256) {
        _ticketIds.increment();
        uint256 newTicketId = _ticketIds.current();
        _mint(operator, newTicketId);

        _ticketDetails[newTicketId] = TicketDetails({
            purchasePrice: _ticketPrice
        });

        return newTicketId;
    }

    /*
     * Bulk mint specified number of tickets to assign it to a operator
     * Modifier to check the ticket count is less than total supply
     */
    function bulkMintTickets(uint256 numOfTickets, address operator) public virtual isValidTicketCount {
        require(
            (ticketCounts() + numOfTickets) <= 1000,
            "Number of tickets exceeds maximum ticket count"
        );

        for (uint256 i = 0; i < numOfTickets; i++) {
            mint(operator);
        }
    }

    // Get ticket actual price
    function getTicketPrice() public view returns (uint256) {
        return _ticketPrice;
    }

    // Get organiser's address
    function getOrganiser() public view returns (address) {
        return _organiser;
    }

    // Get current ticketId
    function ticketCounts() public view returns (uint256) {
        return _ticketIds.current();
    }


    // Get ticket details
    function getTicketDetails(uint256 ticketId) public view returns (uint256 purchasePrice) {
        return (
            _ticketDetails[ticketId].purchasePrice
        );
    }

    // Get all tickets owned by a customer
    function getTicketsOfCustomer(address customer) public view returns (uint256[] memory) {
        return purchasedTickets[customer];
    }
}