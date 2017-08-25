var Test = artifacts.require("./Test.sol")
var _ = require('lodash')
var ethUtil = require('ethereumjs-util')
const BigNumber = web3.BigNumber
const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

contract('Multi-client Test', function(accounts) {

  beforeEach(async function() {
    this.contract = await Test.new()

    var version = web3.version.node
    console.log('Ethereum Client: ' + version)

    //client
    if (_.includes(version, 'TestRPC')) 
      this.nodeVersion = 'testrpc'
    else if (_.includes(version, 'Geth')) 
      this.nodeVersion = 'geth'
    else if (_.includes(version, 'Parity')) 
      this.nodeVersion = 'parity'    

  })

  it("ecrecover1: Signed messages should return signing address", async function() {

    const messagetoSign = web3.sha3('Message to sign here.')
    let messagetoSend = messagetoSign

    const unlockedAccount = accounts[0]                    
    var signature = await web3.eth.sign(unlockedAccount, messagetoSign)

    console.log(this.nodeVersion)
    console.log(this.nodeVersion + ' sig: ' + signature)
    console.log(this.nodeVersion + ' msg2sign: ' + messagetoSign)        
    console.log(this.nodeVersion + ' msg2send: ' + messagetoSend)    
    console.log()
    console.log()   

    signatureData = ethUtil.fromRpcSig(signature)
    let v = ethUtil.bufferToHex(signatureData.v)
    let r = ethUtil.bufferToHex(signatureData.r) 
    let s = ethUtil.bufferToHex(signatureData.s)
    
    const recoveredAddress = await this.contract.ecrecover1(messagetoSend, v, r, s)
    recoveredAddress.should.be.equal(unlockedAccount,'The recovered address should match the signing address')
  })

  it("ecrecover2: Signed messages should return signing address", async function() {

    const message = 'Message to sign here.'
    let messagetoSign = ethUtil.bufferToHex(new Buffer(message))
    let messagetoSend
    let hashBuff
    let msgHashBuff    

    switch (this.nodeVersion) {
      default: 
        hashBuff = ethUtil.toBuffer(message)
        msgHashBuff = ethUtil.hashPersonalMessage(hashBuff)
        messagetoSend = ethUtil.bufferToHex(msgHashBuff) 
        break
    }

    const unlockedAccount = accounts[0]
    var signature = await web3.eth.sign(unlockedAccount, messagetoSign)
    
    console.log(this.nodeVersion)
    console.log(this.nodeVersion + ' sig: ' + signature)
    console.log(this.nodeVersion + ' msg2sign: ' + messagetoSign)        
    console.log(this.nodeVersion + ' msg2send: ' + messagetoSend)    
    console.log()
    console.log()    

    signatureData = ethUtil.fromRpcSig(signature)
    let v = ethUtil.bufferToHex(signatureData.v)
    let r = ethUtil.bufferToHex(signatureData.r) 
    let s = ethUtil.bufferToHex(signatureData.s)

    const recoveredAddress = await this.contract.ecrecover2(messagetoSend, v, r, s)
    recoveredAddress.should.be.equal(unlockedAccount,'The recovered address should match the signing address')
 })

 it("ecrecover3: Signed messages should return signing address", async function() {
      
      const message = 'Message to sign here.'
      let messagetoSign = ethUtil.bufferToHex(new Buffer(message))
      let messagetoSend
      let hashBuff
      let msgHashBuff    

      switch (this.nodeVersion) {
        default: 
          hashBuff = ethUtil.toBuffer(message)
          msgHashBuff = ethUtil.hashPersonalMessage(hashBuff)
          messagetoSend = ethUtil.bufferToHex(msgHashBuff) 
          break
      }

      const unlockedAccount = accounts[0]
      var signature = await web3.eth.sign(unlockedAccount, messagetoSign)
      
      console.log(this.nodeVersion)
      console.log(this.nodeVersion + ' sig: ' + signature)
      console.log(this.nodeVersion + ' msg2sign: ' + messagetoSign)        
      console.log(this.nodeVersion + ' msg2send: ' + messagetoSend)    
      console.log()
      console.log()    

      signatureData = ethUtil.fromRpcSig(signature)
      let v = ethUtil.bufferToHex(signatureData.v)
      let r = ethUtil.bufferToHex(signatureData.r) 
      let s = ethUtil.bufferToHex(signatureData.s)

      const recoveredAddress = await this.contract.ecrecover3(messagetoSend, v, r, s)
      recoveredAddress.should.be.equal(unlockedAccount,'The recovered address should match the signing address')
   })


   it("ecrecover1: Presigned message should verify address", async function() {

    // Signed using geth 
    const message = web3.sha3('IT People test of ecrecover.')
    const signingAccount = '0xbc6d23fd444aa9f40fb22adad3afe702716dc62a'
    const signature = '0xc46cdc50a66f4d07c6e9a127a7277e882fb21bcfb5b068f2b58c7f7283993b790bdb5f0ac79d1a7efdc255f399a045038c1b433e9d06c1b1abd58a5fcaab33f11c'

    r = signature.substr(0, 66)
    s = '0x' + signature.substr(66, 64)
    v = '0x' + signature.substr(130, 2)
    
    const recoveredAddress = await this.contract.ecrecover1(message, v, r, s)
    recoveredAddress.should.be.equal(signingAccount,'The recovered address should match the signing address')
 })


/**
 *    
 //Geth/v1.6.7-stable-ab5646c5/linux-amd64/go1.8.1
 console.log('Geth: ')
 console.log('geth sig: 0x6d92853acc4f2def3dd11ff36989ece14caa0dc6cc669673a7d97eb29b087726630cb526aefbebbf91a8bf346585d6ac2a6a37eabbfd9a6a3ec70114a25a8cf81c')
 console.log('geth msg2sign: 0x4d65737361676520746f207369676e20686572652e')
 console.log('geth msg2send: 0x789203b09852fc3dcbb56bf1f954acae8d268690c0a138b9006d6b990f51ae59')
 console.log()
 console.log()
 
 //EthereumJS TestRPC/v1.1.2/ethereum-js
 console.log('TestRPC: ')
 console.log('testrpc sig: 0x6d92853acc4f2def3dd11ff36989ece14caa0dc6cc669673a7d97eb29b087726630cb526aefbebbf91a8bf346585d6ac2a6a37eabbfd9a6a3ec70114a25a8cf801')
 console.log('testrpc msg2sign: 0x4d65737361676520746f207369676e20686572652e')
 console.log('testrpc msg2send: 0x789203b09852fc3dcbb56bf1f954acae8d268690c0a138b9006d6b990f51ae59')
 console.log()
 console.log()

 //Parity//v1.7.0-beta-5f2cabd-20170727/x86_64-linux-gnu/rustc1.18.0
 console.log('Parity 1.7: ')
 console.log('parity sig: 0x0b7f08ec6ad55e9646702188f604dbedfc7c7c19f485ef2edbec2a412546fabe349d96feec7dd77b20b62d1d065944c0fb2e34322c731ca306259f6b193b26871c')
 console.log('parity msg2sign: 0x4d65737361676520746f207369676e20686572652e')
 console.log('parity msg2send: 0x789203b09852fc3dcbb56bf1f954acae8d268690c0a138b9006d6b990f51ae59')
 console.log()
 console.log()

 */

})
