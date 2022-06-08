import { expect } from 'chai';
import TripsRepository from '../src/TripsRepository.js'
import tripsSampleData from '../data/trips.js';

describe('TripsRepository', () => {
  let tripsRepository;

  beforeEach(() => {
    tripsRepository = new TripsRepository(tripsSampleData)
  });

  it('Should be a function', () => {
    expect(TripsRepository).to.be.a('function');
  });

});