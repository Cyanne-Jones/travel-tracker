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

  it('Should hold a traveler\'s name', () => {
    expect(traveler.name).to.equal('Ham Leadbeater');
  });

  it('Should be able to return traveler\'s first name', () => {
    expect(traveler.returnFirstName()).to.equal('Ham');
  });
});