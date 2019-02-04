# Info
- chaincode.js
- package.json
- package-lock.json

# Structure
chaincode.js
- examples/SimpleToken
  - tokens/ERC20Detailed
    - tokens/BurnableToken
      - tokens/MintableToken
        - tokens/OwnableToken
          - tokens/ERC20
            - tokens/ERC20Basic

# Token test
Environment variable
- export ORDERER=-o\ orderer.techracers.com:7050\ --tls\ true\ --cafile\ /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/techracers.com/orderers/orderer.techracers.com/msp/tlscacerts/tlsca.techracers.com-cert.pem
export EXTRA=-o\ orderer.techracers.com:7050\ --tls\ true\ --cafile\ /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/techracers.com/orderers/orderer.techracers.com/msp/tlscacerts/tlsca.techracers.com-cert.pem\ --peerAddresses\ peer0.org1.techracers.com:7051\ --tlsRootCertFiles\ /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.techracers.com/peers/peer0.org1.techracers.com/tls/ca.crt\ --peerAddresses\ peer0.org2.techracers.com:7051\ --tlsRootCertFiles\ /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.techracers.com/peers/peer0.org2.techracers.com/tls/ca.crt

Chaincode install
- peer chaincode install -l <language> -n <name> -v <version> -p </path/to/chaincode_directory>
- peer chaincode install -l node -n btoken -v 1.0 -p /opt/gopath/src/github.com/chaincode/token_chaincode/node/

Chaincode instantiate
- peer chaincode instantiate -C <channel_name> -n <name> -l <language> -v <version> -c <arguments> $ORDERER
- peer chaincode instantiate -C mychannel -n btoken -l node -v 1.0 -c '{"Args":["init","{\"name\": \"Bebi Token\", \"symbol\": \"BBT\", \"totalSupply\": \"100000\"}"]}' $ORDERER

Chaincode query
- peer chaincode query -C <channel_name> -n <name> -c <arguments>
- peer chaincode query -C mychannel -n btoken -c '{"Args":["getOwner"]}'
- peer chaincode query -C mychannel -n btoken -c '{"Args":["getName"]}'
- peer chaincode query -C mychannel -n btoken -c '{"Args":["getSymbol"]}'
- peer chaincode query -C mychannel -n btoken -c '{"Args":["getTotalSupply"]}'

Chaincode invoke
- peer chaincode invoke -C <channel_name> -n <name> -c <arguments> $EXTRA
- peer chaincode invoke -C mychannel -n btoken -c '{"Args":["updateTokenSymbol","AAA"]}' $EXTRA
