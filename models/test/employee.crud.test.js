const Employee = require('../employee.model');
const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {

    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.error(err);
    }
  });


  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const department = new Department({ name: 'Department #1' });
      await department.save();

      const emploee = new Employee({ firstName: 'John', lastName: 'Smith', department: department._id });
      await emploee.save();
  
      expect(emploee.isNew).to.be.false;
    });
  
    after(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });
  });


  describe('Reading data', () => {

    before(async () => {
      const dep = new Department({ name: 'Department #1' });
      await dep.save();

      const empOne = new Employee({ firstName: 'John', lastName: 'Smith', department: dep._id });
      await empOne.save();
  
      const empTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: dep._id });
      await empTwo.save();
    });
  
    
    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by various params with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John', lastName: 'Smith' });
      expect(employee.firstName + employee.lastName).to.be.equal('JohnSmith');
    });

    it('should return a proper documents with populated data', async () => {
      const employees = await Employee.find().populate('department');
      expect(employees[0].department.name).to.be.equal('Department #1');
    });
  

    after(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });
  });


  describe('Updating data', () => {
    beforeEach(async () => {
      const dep = new Department({ name: 'Department #1' });
      await dep.save();

      const empOne = new Employee({ firstName: 'John', lastName: 'Smith', department: dep._id });
      await empOne.save();
  
      const empTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: dep._id });
      await empTwo.save();
    });


    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'John', lastName: 'Smith' }, { $set: { firstName: 'Johnny', lastName: 'Smithy' }});
      const updatedEmployee = await Employee.findOne({ firstName: 'Johnny', lastName: 'Smithy' });
      expect(updatedEmployee).to.not.be.null;
    });
  
    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John', lastName: 'Smith' });
      employee.firstName = 'Johnny';
      employee.lastName = 'Smithy';
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: 'Johnny', lastName: 'Smithy' });
      expect(updatedEmployee).to.not.be.null;
    });
  
    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Johnny', lastName: 'Smithy' }});
      const employee = await Employee.find({ firstName: 'Johnny', lastName: 'Smithy' });
      expect(employee.length).to.be.equal(2);
    });


    afterEach(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });
  });


  describe('Removing data', () => {
    beforeEach(async () => {
      const dep = new Department({ name: 'Department #1' });
      await dep.save();

      const empOne = new Employee({ firstName: 'John', lastName: 'Smith', department: dep._id });
      await empOne.save();
  
      const empTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: dep._id });
      await empTwo.save();
    });


    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'John', lastName: 'Smith' });
      const removedEmployee = await Employee.findOne({ firstName: 'John', lastName: 'Smith' });
      expect(removedEmployee).to.be.null;
    });
  
    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John', lastName: 'Smith' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ firstName: 'John', lastName: 'Smith' });
      expect(removedEmployee).to.be.null;
    });
  
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employee = await Employee.find();
      expect(employee.length).to.be.equal(0);
    });


    afterEach(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });
  });


  after(() => {
    mongoose.models = {};
  });
});