const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    '',
    'https://rinkeby.infura.io/v3/9680829e333b4dfabf35b90cf7cc4077'
);

const web3 = new Web3(provider);

let lottery;

const deploy = async () => {
    const accounts = await  web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    lottery = await new web3.eth.Contract(JSON.parse(interface)).deploy({
        data: bytecode
    }).send({
        from: accounts[0],
        gas: '1000000'
    });

    console.log(interface);

    console.log('Contract deployed to', lottery.options.address);
}

deploy();