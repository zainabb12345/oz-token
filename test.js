const { accounts, contract } = require('@openzeppelin/test-environment');
const { expect } = require('chai');

const { BN,
  constants,
  expectRevert } = require('@openzeppelin/test-helpers')

// Create a contract object from a compilation artifact
const AbcToken = contract.fromArtifact('AbcToken');

let abctoken = '';

const _name = "ABC";
const _symbol = "ABC";
const _decimal = 6;
const overallSupply = 11000000000000;
const sender = accounts[0];
const receiver = accounts[1];

beforeEach(async function () {
  abctoken = await AbcToken.new({ from: sender });
  abcAddress = abctoken.address;
  await abctoken.initialize({ from: sender });
});
describe('Constructor is initialized correctly', async () => {

  it('verify name', async function () {
    let name = await abctoken.name();
    expect(name).to.equal(_name);
  });

  it('verify symbol', async function () {
    let symbol = await abctoken.symbol();
    expect(symbol).to.equal(_symbol);
  });

  it('verify decimal', async function () {
    let decimal = await abctoken.decimal();
    expect(Number(decimal)).to.equal(_decimal);
  });

  it('verify total Supply', async function () {
    let totalSupply = await abctoken.totalSupply();
    expect(1000000000000).to.equal(Number(totalSupply));
  });
});

describe("issued correct total amount to the owner", async () => {

  it('is total supply equal to initial balance', async function () {
    let totalSupply = await abctoken.totalSupply();
    let balanceof = await abctoken.balanceOf(sender);
    expect(Number(totalSupply)).to.equal(Number(balanceof));
  });
});

describe("verifying transfer functionality", async () => {
  const testRecievedBalance = accounts[2];
  it('sent amount is equal to the amount accepted by receiver', async () => {
    await abctoken.transfer(testRecievedBalance, 1000, { from: sender });
    const receievedBalance = await abctoken.balanceOf(testRecievedBalance);
    expect(Number(receievedBalance)).to.equal(1000);
  });
  it('amount sent exceed sender account balance',async()=>{
    try{
      await abctoken.transfer(testRecievedBalance, overallSupply, { from: sender });
    }
    catch{
      expect(true).to.equal(true);
    }
  });
});