// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MintNft is ERC721Enumerable, Ownable {

    uint256 public constant TICKET_PRICE = 0.001 ether;
    uint256 public constant MAX_TICKETS = 100;
    uint256 private ticketCounter;
    string private baseURI;
    mapping(uint256 => bool) private assignedTickets;
    mapping(address => bool) private hasMinted; 

    constructor(string memory _name, string memory _symbol, string memory _baseURI) ERC721(_name, _symbol) Ownable(msg.sender) {
        baseURI = _baseURI;
    }

    function mintTicket() public payable {
        require(msg.value == TICKET_PRICE, "Incorrect amount of ETH sent");
        require(ticketCounter < MAX_TICKETS, "Sold Out");
        require(!hasMinted[msg.sender], "You have already bought a ticket"); 

        uint256 ticketId = _getRandomTicketId();
        assignedTickets[ticketId] = true;
        ticketCounter++;
        hasMinted[msg.sender] = true;
        
        _safeMint(msg.sender, ticketId);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json")); 
    }

    function _getRandomTicketId() private view returns (uint256) {
        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, ticketCounter, msg.sender))) % MAX_TICKETS;
        while (assignedTickets[random]) {
            random = (random + 1) % MAX_TICKETS;
        }
        return random;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Transfer failed");
    }

    function myTickets() public view returns (uint256[] memory) {
        uint256 ticketCount = balanceOf(msg.sender);
        uint256[] memory ticketIds = new uint256[](ticketCount);
        for (uint256 i = 0; i < ticketCount; i++) {
            ticketIds[i] = tokenOfOwnerByIndex(msg.sender, i);
        }
        return ticketIds;
    }


}