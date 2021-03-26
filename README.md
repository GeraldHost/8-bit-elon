# 8-bit-elon
NFT Website for selling 8 bit elons

Once there was a man who really was a Musk. He liked to build robots and rocket ships and such.

<img src="https://im2.ezgif.com/tmp/ezgif-2-dcbf3c62a9b0.gif" width="800px" />

This project was a bit of fun to play around with implementing and deploying an ERC-721 contract (NFTs).

The 8BitElon token contract is a self serviced NFT platform. The owner of the contract (me) can mint new tokens give them a URI and a value in cETH.

Any user can send cETH to the "buy" method and as long as the amount of cETH they send is greater than or equal to the stored value of the token, the token will be transfered to the purchaser.

The owner of any token can set the value of it by sending a transaction to the "setValue" method

Contract address: `0x86377283E18e3155221EAB138ee74469D96202aA`
