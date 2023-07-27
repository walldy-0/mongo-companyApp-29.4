const Employee = require('../employee.model.js');
const expect = require('chai').expect;

describe('Employee', () => {

  it('should throw an error if no "firstName" or "lastName" or "department" arg', () => {

    const cases = [
      {},
      { firstName: 'firstName', lastName: 'lastName' },
      { firstName: 'firstName', department: 'department' },
      { lastName: 'lastName', department: 'department' }
    ];

    for (let data of cases) {
      const emp = new Employee(data);

      emp.validate(err => {
        expect(err.errors.firstName || err.errors.lastName || err.errors.department).to.exist;
      });
    }
  });

  it('should throw an error if "firstName" or "lastName" or "department" arg is not a string', () => {

    const cases = [
      { firstName: 'string', lastName: 'string', department: [] },
      { firstName: 'string', lastName: 'string', department: {} },
      { firstName: 'string', lastName: [], department: 'string' },
      { firstName: 'string', lastName: {}, department: 'string' },
      { firstName: [], lastName: 'string', department: 'string' },
      { firstName: {}, lastName: 'string', department: 'string' }
    ];

    for (let data of cases) {
      const emp = new Employee(data);

      emp.validate(err => {
        expect(err.errors.firstName || err.errors.lastName || err.errors.department).to.exist;
      });
    }
  });

  it('should throw an error if "firstName" or "lastName" or "department" arg is an empty string', () => {
    const cases = [
      { firstName: 'string', lastName: 'string', department: '' },
      { firstName: 'string', lastName: '', department: 'string' },
      { firstName: '', lastName: 'string', department: 'string' }
    ];

    for (let data of cases) {
      const emp = new Employee(data);

      emp.validate(err => {
        expect(err.errors.firstName || err.errors.lastName || err.errors.department).to.exist;
      });
    }    
  });

  it('should not throw an error if "firstName" and "lastName" and "department" args are okay', () => {
    const emp = new Employee({ firstName: 'string', lastName: 'string', department: 'string' });

    emp.validate(err => {
      expect(err).to.not.exist;
    });
  });
});