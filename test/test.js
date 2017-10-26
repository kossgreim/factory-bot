const expect = require('chai').expect;
const factoryNode = require('../index');

describe('#define', () => {
  it('defines a new factory', () => {
    factoryNode.define('User', {
      name: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com'
    })
    expect(factoryNode.getAllFactories()).to.have.keys(['User'])
  });
});