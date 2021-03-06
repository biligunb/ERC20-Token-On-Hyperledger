# Info
- tokenChaincode.js
- package.json
- package-lock.json

# Structure
tokenChaincode.js
- examples/SimpleToken
  - tokens/ERC20Detailed
    - tokens/BurnableToken
      - tokens/MintableToken
        - tokens/OwnableToken
          - tokens/ERC20
            - tokens/ERC20Basic

# Token test
Environment variable
- export ORDERER=-o\ orderer.yourdomainname.com:7050\ --tls\ true\ --cafile\ /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/yourdomainname.com/orderers/orderer.yourdomainname.com/msp/tlscacerts/tlsca.yourdomainname.com-cert.pem
- export EXTRA=-o\ orderer.yourdomainname.com:7050\ --tls\ true\ --cafile\ /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/yourdomainname.com/orderers/orderer.yourdomainname.com/msp/tlscacerts/tlsca.yourdomainname.com-cert.pem\ --peerAddresses\ peer0.org1.yourdomainname.com:7051\ --tlsRootCertFiles\ /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.yourdomainname.com/peers/peer0.org1.yourdomainname.com/tls/ca.crt\ --peerAddresses\ peer0.org2.yourdomainname.com:7051\ --tlsRootCertFiles\ /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.yourdomainname.com/peers/peer0.org2.yourdomainname.com/tls/ca.crt

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
- peer chaincode query -C mychannel -n btoken -c '{"Args":["getBalanceOf", "Org1MSP"]}'

Chaincode invoke
- peer chaincode invoke -C <channel_name> -n <name> -c <arguments> $EXTRA
- peer chaincode invoke -C mychannel -n btoken -c '{"Args":["updateTokenSymbol","AAA"]}' $EXTRA
- peer chaincode invoke -C mychannel -n btoken -c '{"Args":["transfer","Org2MSP","512"]}' $EXTRA
- peer chaincode invoke -C mychannel -n btoken -c '{"Args":["updateMintingState","true"]}' $EXTRA
- peer chaincode invoke -C mychannel -n btoken -c '{"Args":["mint","Org1MSP", "2017"]}' $EXTRA
