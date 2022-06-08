import chai from 'chai';
import { expect } from 'chai';
import Traveler from '../src/Traveler.js'
import travelersSampleData from '../data/travelers.js';

describe('Traveler', () => {

  let traveler;

  beforeEach(() => {
    traveler = new Traveler(travelersSampleData[0])
  });

  it('Should be a function', () => {
    expect(Traveler).to.be.a('function')
  });
});