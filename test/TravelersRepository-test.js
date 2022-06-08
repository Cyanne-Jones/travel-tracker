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

  it('should be an instance of UserRepository', () => {
    expect(travelersRepository).to.be.an.instanceof(TravelersRepository)
  });

  it('Should hold travelers\' information', function() {
    expect(travelersRepository.travelers).to.equal(travelersSampleData);
  });
  
  it('Should return a user based on their id number', function() {
    expect(travelersRepository.getTravelerByidNum(3)).to.deep. equal(
      {
        "id": 3,
        "name": "Sibby Dawidowitsch",
        "travelerType": "shopper",
      }
    );
  });

});