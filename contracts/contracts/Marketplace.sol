// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Marketplace {
    struct Listing {
        address seller;
        address nft;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    IERC20 public immutable gasToken;
    uint256 public nextListingId = 1;
    mapping(uint256 => Listing) public listings;

    event Listed(uint256 indexed listingId, address indexed seller, address indexed nft, uint256 tokenId, uint256 price);
    event Sale(uint256 indexed listingId, address indexed buyer);
    event Cancelled(uint256 indexed listingId);

    constructor(IERC20 _gasToken) {
        gasToken = _gasToken;
    }

    function list(address nft, uint256 tokenId, uint256 price) external returns (uint256) {
        IERC721(nft).transferFrom(msg.sender, address(this), tokenId);
        uint256 listingId = nextListingId++;
        listings[listingId] = Listing({seller: msg.sender, nft: nft, tokenId: tokenId, price: price, active: true});
        emit Listed(listingId, msg.sender, nft, tokenId, price);
        return listingId;
    }

    function buy(uint256 listingId) external {
        Listing storage listing = listings[listingId];
        require(listing.active, "listing inactive");
        listing.active = false;
        gasToken.transferFrom(msg.sender, listing.seller, listing.price);
        IERC721(listing.nft).transferFrom(address(this), msg.sender, listing.tokenId);
        emit Sale(listingId, msg.sender);
    }

    function cancel(uint256 listingId) external {
        Listing storage listing = listings[listingId];
        require(listing.active, "listing inactive");
        require(listing.seller == msg.sender, "no owner");
        listing.active = false;
        IERC721(listing.nft).transferFrom(address(this), msg.sender, listing.tokenId);
        emit Cancelled(listingId);
    }
}
