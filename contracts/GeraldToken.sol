pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GeraldToken is ERC721, Ownable {
    
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Optional mapping for token URIs
    mapping (uint256 => string) private _tokenURIs;

    // Optional mapping for token value
    mapping (uint256 => uint256) private _tokenValues;

    // mapping for payments
    mapping (address => uint256) private _payments;

    // Base URI
    string private _baseURIextended;

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    fallback() external payable {}
    
    function setBaseURI(string memory baseURI_) external onlyOwner() {
        _baseURIextended = baseURI_;
    }
    
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function _setTokenValue(uint256 tokenId, uint256 _tokenValue) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenValues[tokenId] = _tokenValue;
    }
    
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }
    
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();
        
        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return string(abi.encodePacked(base, tokenId.toString()));
    }

    function tokenValue(uint256 tokenId) external view returns (uint256) {
        require(_exists(tokenId), "ERC721Metadata: Value query for nonexistent token");

        return _tokenValues[tokenId];
    }

    function buy(uint256 tokenId) external payable {
        require(_exists(tokenId), "ERC721Metadata: Trying to buy nonexistent token");

        // get value of token check if enough money has been sent
        uint256 tokenValue = _tokenValues[tokenId];

        require(msg.value >= tokenValue, "message value too low");

        // get address of token holder
        address tokenHolder = ownerOf(tokenId);

        // map value to address of token holder
        uint256 currentBalance = _payments[tokenHolder];
        _payments[tokenHolder] = currentBalance + msg.value;

        // transfer token to new owner (sender)
        _safeTransfer(tokenHolder, msg.sender, tokenId, "");
    }
    

    function mint(
        address _to,
        string memory _tokenURI,
        uint256 _value
    ) external onlyOwner() {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();

        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        _setTokenValue(tokenId, _value);
    }
}