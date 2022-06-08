import { expect } from 'chai';
import DestinationRepository from '../src/DestinationRepository.js'
import destinationSampleData from '../data/destinations.js';

describe('Destination Repository', () => {

  let destinationRepository;

  beforeEach(() => {
    destinationRepository = new DestinationRepository(destinationSampleData);
  });

  it('Should be a function', () => {
    expect(DestinationRepository).to.be.a('function')
  });
});