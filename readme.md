
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

### Findings

Ecrecover is one of three solidity functions that is implemented as precompiled contract that will not exist upon the initial creation of a developement blockchain. This may cause the first call to this function to fail under certain circumstances. This is not an issue on a test or public network. 

The third implementation (ecrecover3) demonstrates this by calling out to the contract code at address instead of invoking the function directly. 


## Authors

* **David Akers** - *Inital work* - [davidmichaelakers](https://github.com/davidmichaelakers)


## Acknowledgments

* This project was done for [IT People](http://itpeoplecorp.com/)
