const Product = require('../product.model.js');
const expect = require('chai').expect;

describe('Product', () => {

  it('should throw an error if no "name" or "client" arg', () => {

    const cases = [
      {},
      { name: 'name' },
      { client: 'client' },
      { name: 'name', clien: 'client'},
      { nam: 'name', client: 'client'}
    ];

    for (let data of cases) {
      const prod = new Product(data);

      prod.validate(err => {
        expect(err.errors.name || err.errors.client).to.exist;
      });
    }
  });

  it('should throw an error if "name" or "client" arg is not a string', () => {

    const cases = [
      { name: {}, client: 'client' },
      { name: [], client: 'client' },
      { name: 'name', client: {} },
      { name: 'name', client: [] },
      { name: {}, client: function() {}}
    ];

    for (let data of cases) {
      const prod = new Product(data);

      prod.validate(err => {
        expect(err.errors.name || err.errors.client).to.exist;
      });
    }
  });

  it('should throw an error if "name" or "client" arg is empty string', () => {
    const cases = [
      { name: 'name', client: '' },
      { name: '', client: 'client' }
    ];

    for (let data of cases) {
      const prod = new Product(data);

      prod.validate(err => {
        expect(err.errors.name || err.errors.client).to.exist;
      });
    }    
  });

  it('should not throw an error if "name" and "client" args are okay', () => {
    const prod = new Product({ name: 'name', client: 'client' });

    prod.validate(err => {
      expect(err).to.not.exist;
    });
  });
});