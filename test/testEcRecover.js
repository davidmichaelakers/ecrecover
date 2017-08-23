var Test = artifacts.require("./Test.sol");
const BigNumber = web3.BigNumber
const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

contract('Test', function(accounts) {

  beforeEach(async function() {
    this.contract = await Test.new()

  })

  it("ecrecover1: Signed messages should return signing address", async function() {
    const message = web3.sha3('Message to sign here.')
    const unlockedAccount = accounts[0]                    
    const signature = await web3.eth.sign(unlockedAccount, message)   

    r = signature.substr(0, 66)
    s = '0x' + signature.substr(66, 64)
    v = '0x' + signature.substr(130, 2)
    
    const recoveredAddress = await this.contract.ecrecover1(message, v, r, s)
    recoveredAddress.should.be.equal(unlockedAccount,'The recovered address should match the signing address')
  })

  it("ecrecover2: Signed messages should return signing address", async function() {
    const message = 'Message to sign here.'
    const hexMessage = '0x' + Buffer.from(message).toString('hex');                    
    const unlockedAccount = accounts[0]                    
    const hashedMessage = web3.sha3('\x19Ethereum Signed Message:\n' + message.length + message)

    var signature = await web3.eth.sign(unlockedAccount, hexMessage)
    r = signature.substr(0, 66)
    s = '0x' + signature.substr(66, 64)
    v = '0x' + signature.substr(130, 2)
    const recoveredAddress = await this.contract.ecrecover2(hashedMessage, v, r, s)
    recoveredAddress.should.be.equal(unlockedAccount,'The recovered address should match the signing address')
 })

 it("ecrecover3: Signed messages should return signing address", async function() {
      const message = 'Message to sign here.'
      const hexMessage = '0x' + Buffer.from(message).toString('hex');                    
      const unlockedAccount = accounts[0]                    
      const hashedMessage = web3.sha3('\x19Ethereum Signed Message:\n' + message.length + message)
  
      var signature = await web3.eth.sign(unlockedAccount, hexMessage)
      r = signature.substr(0, 66)
      s = '0x' + signature.substr(66, 64)
      v = '0x' + signature.substr(130, 2)
      const recoveredAddress = await this.contract.ecrecover3(hashedMessage, v, r, s)
      recoveredAddress.should.be.equal(unlockedAccount,'The recovered address should match the signing address')
   })


   it("ecrecover1: Presigned message should verify address", async function() {

    const message = web3.sha3('IT People test of ecrecover.')
    const signingAccount = '0xbc6d23fd444aa9f40fb22adad3afe702716dc62a'
    const signature = '0xc46cdc50a66f4d07c6e9a127a7277e882fb21bcfb5b068f2b58c7f7283993b790bdb5f0ac79d1a7efdc255f399a045038c1b433e9d06c1b1abd58a5fcaab33f11c'

    r = signature.substr(0, 66)
    s = '0x' + signature.substr(66, 64)
    v = '0x' + signature.substr(130, 2)
    
    const recoveredAddress = await this.contract.ecrecover1(message, v, r, s)
    recoveredAddress.should.be.equal(signingAccount,'The recovered address should match the signing address')
 })


})
