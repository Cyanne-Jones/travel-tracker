import chai from 'chai';
const expect = chai.expect;
import TravelersRepository from '../src/TravelersRepository.js';
import travelersSampleData from '../data/travelers.js';

describe('TravelersRepository', function() {

  let travelersRepository;

  beforeEach(() => {
    travelersRepository = new TravelersRepository(travelersSampleData);
  })

  it('Should be a function', function() {
    expect(TravelersRepository).to.be.a('function');
  });

  it('Should hold travelers\' information', function() {
    expect(TravelersRepository.travelers).to.equal(travelersSampleData);
  });
  
  
});
