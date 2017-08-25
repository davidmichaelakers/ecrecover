
## ECRecover in Solidity

This is a working example of implementing ECRecover in Solidity using Web3.js, and the Truffle framework. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

To run this locally you will need the [Truffle framework](http://truffleframework.com/), node.js, npm, and a local development ethereum node

### Installing

Install truffle

```

$ npm install -g truffle

```

Once you have cloned the project from inside the root you'll need to run npm install to get the 
testing libraries. 

```

$ npm install

```

Start up your ethereum node then compile and deploy your contracts. 

```

$ truffle compile
$ truffle migrate

```


## Running the tests

Once the contracts are deployed to your development ethereum node you can run the test like this. 

```

$ truffle test

```

### Test Overview

There are three different implementations of ecrecover in the contract and a corresponding web3.js integration test for each. The forth test 
test against a presigned message in case there are issues signing the requests in the first three. 

Update: The inital tests pass on Geth/v1.6.7 and Parity/v1.7.0 but fail on TestRPC/v1.1.2. A new set of [tests](https://github.com/davidmichaelakers/ecrecover/blob/master/test/testEcRecoverMultiClient.js) was created to resolve that and passes on all of those clients. 

### Findings

Ecrecover is one of three solidity functions that is implemented as precompiled contract that will not exist upon the initial creation of a developement blockchain. This may cause the first call to this function to fail under certain circumstances. This is not an issue on a test or public network. 

The third implementation (ecrecover3) demonstrates this by calling out to the contract code at address instead of invoking the function directly. 

Update: If you are looking at implementing ecrecover for a real-world application keep in mind:

 * Web3.js [web3.eth.sign](https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethsign) method is not suitable for raw use as many ethereum clients implement eth_sign differently.
    *  TestRPC depending on version may return signature data of a different length than Geth or Parity
    *  TestRPC and Parity in previous versions added the prefix message themselves
    *  Parity in version before 1.6.6 returned signature data as vrs instead of rsv like Geth and TestRPC
 * The eth_sign function has been the subject of [breaking changes](https://github.com/ethereum/go-ethereum/pull/2940)
 * New functions personal_sign and personal_ecRecover [are available](https://github.com/ethereum/go-ethereum/wiki/Management-APIs#personal_sign).
 * The included tests will likely fail for client versions compatible with eth_sign prior to the breaking change.
 * Some work has been done in creating utility methods that solve these cross-client issues namely [ethereumjs-util](https://github.com/ethereumjs/ethereumjs-util) however this only partially addresses the problem.   

If you are interested in building real-world applications that implement ecrecover a cross-client wrapper for web3.eth.sign is required, and creating one means potentially supporting multiple implementations of eth_sign across different version of each client.   


## Authors

* **David Akers** - *Inital work* - [davidmichaelakers](https://github.com/davidmichaelakers)


## Acknowledgments

* This project was done for [IT People](http://itpeoplecorp.com/)

