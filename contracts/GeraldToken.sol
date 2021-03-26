pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GeraldToken is ERC721, Ownable {
    
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // mapping for token URIs
    mapping (uint256 => string) private _tokenURIs;

    // mapping for token values
    mapping (uint256 => uint256) private _tokenValues;
    
    // mapping for token names
    mapping (uint256 => string) private _tokenNames;

    // mapping for balances
    mapping (address => uint256) private _balance;

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    fallback() external payable {}

    function _setTokenMeta(uint256 tokenId, string memory _URI, uint256 _value, string memory _name) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: Meta set of nonexistent token");

        _tokenURIs[tokenId] = _URI;
        _tokenValues[tokenId] = _value;
        _tokenNames[tokenId] = _name;
    }

    function setTokenValue(uint256 tokenId, uint256 _tokenValue) external onlyOwner() {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenValues[tokenId] = _tokenValue;
    }
    
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    function tokenValue(uint256 tokenId) external view returns (uint256) {
        require(_exists(tokenId), "ERC721Metadata: Value query for nonexistent token");
        return _tokenValues[tokenId];
    }

    function tokenName(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: Value query for nonexistent token");
        return _tokenNames[tokenId];
    }

    function buy(uint256 tokenId) external payable {
        require(_exists(tokenId), "ERC721Metadata: Trying to buy nonexistent token");

        // get value of token check if enough money has been sent
        uint256 tokenValue = _tokenValues[tokenId];

        require(msg.value >= tokenValue, "message value too low");

        // get address of token holder
        address tokenHolder = ownerOf(tokenId);

        // map value to address of token holder
        uint256 currentBalance = _balance[tokenHolder];
        _balance[tokenHolder] = currentBalance + msg.value;

        // transfer token to new owner (sender)
        _safeTransfer(tokenHolder, msg.sender, tokenId, "");
    }
    
    function withdraw() external {
        uint256 value = _balance[msg.sender];
        if(value > 0) {
            address payable payableAddr = payable(msg.sender);
            payableAddr.transfer(value);
            _balance[msg.sender] = 0;
        }
    }

    function mint(
        address _to,
        string memory _tokenURI,
        uint256 _value,
        string memory _name
    ) external onlyOwner() {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();

        _safeMint(_to, tokenId);
        _setTokenMeta(tokenId, _tokenURI, _value, _name);
    }
}