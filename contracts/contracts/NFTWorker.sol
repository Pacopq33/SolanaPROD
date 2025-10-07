// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract NFTWorker is ERC721URIStorage, AccessControl {
    using Strings for uint256;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 public nextId = 1;

    struct WorkerMetadata {
        uint8 tier;
        uint16 stamina;
        string faction;
        string roleName;
    }

    mapping(uint256 => WorkerMetadata) public workerMetadata;

    constructor() ERC721("Neon Drifters Worker", "NDWORK") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mint(address to, WorkerMetadata calldata metadata) external onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tokenId = nextId++;
        _safeMint(to, tokenId);
        workerMetadata[tokenId] = metadata;
        _setTokenURI(tokenId, _generateURI(tokenId, metadata));
        return tokenId;
    }

    function _generateURI(uint256 tokenId, WorkerMetadata memory metadata) internal pure returns (string memory) {
        string memory json = string(
            abi.encodePacked(
                '{"name":"Neon Worker #',
                tokenId.toString(),
                '","description":"Trabajador cibernético Neon Drifters","attributes":[{"trait_type":"Tier","value":',
                Strings.toString(metadata.tier),
                '},{"trait_type":"Resistencia","value":',
                Strings.toString(metadata.stamina),
                '},{"trait_type":"Facción","value":"',
                metadata.faction,
                '"},{"trait_type":"Rol","value":"',
                metadata.roleName,
                '"}]}'
            )
        );
        return string(abi.encodePacked("data:application/json;utf8,", json));
    }
}
