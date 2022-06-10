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

  it('Should hold an array of trips', () => {
    expect(tripsRepository.trips).to.deep.equal(
      [
        {
          "id": 1,
          "userID": 1,
          "destinationID": 3,
          "travelers": 1,
          "date": "2022/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 2,
          "userID": 1,
          "destinationID": 2,
          "travelers": 2,
          "date": "2020/09/16",
          "duration": 6,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 3,
          "userID": 1,
          "destinationID": 3,
          "travelers": 1,
          "date": "2022/11/08",
          "duration": 7,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 4,
          "userID": 2,
          "destinationID": 4,
          "travelers": 1,
          "date": "2022/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 5,
          "userID": 2,
          "destinationID": 5,
          "travelers": 1,
          "date": "2020/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 6,
          "userID": 2,
          "destinationID": 6,
          "travelers": 1,
          "date": "2022/06/08",
          "duration": 7,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 7,
          "userID": 3,
          "destinationID": 7,
          "travelers": 1,
          "date": "2022/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 8,
          "userID": 3,
          "destinationID": 8,
          "travelers": 1,
          "date": "2020/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 9,
          "userID": 3,
          "destinationID": 9,
          "travelers": 1,
          "date": "2022/07/08",
          "duration": 7,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 10,
          "userID": 1,
          "destinationID": 10,
          "travelers": 1,
          "date": "2022/06/05",
          "duration": 40,
          "status": "approved",
          "suggestedActivities": []
        }
      ]
    );
  });

  it('Should be able to get a particular user\'s trip data', () => {
    expect(tripsRepository.getTripsByTravelerId(1)).to.deep.equal(
      [
        {
          "id": 1,
          "userID": 1,
          "destinationID": 3,
          "travelers": 1,
          "date": "2022/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 2,
          "userID": 1,
          "destinationID": 2,
          "travelers": 2,
          "date": "2020/09/16",
          "duration": 6,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 3,
          "userID": 1,
          "destinationID": 3,
          "travelers": 1,
          "date": "2022/11/08",
          "duration": 7,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 10,
          "userID": 1,
          "destinationID": 10,
          "travelers": 1,
          "date": "2022/06/05",
          "duration": 40,
          "status": "approved",
          "suggestedActivities": []
        }
      ]);
  });

  it('Should be able to return a traveler\'s past trips', () => {
    expect(tripsRepository.getTravelerTripsInTime(3, 'past')).to.deep.equal(
      [{
        "id": 8,
        "userID": 3,
        "destinationID": 8,
        "travelers": 1,
        "date": "2020/09/16",
        "duration": 8,
        "status": "approved",
        "suggestedActivities": []
      }]
    );
  });

  it('Should be able to return a traveler\'s future trips', () => {
    expect(tripsRepository.getTravelerTripsInTime(2, 'future')).to.deep.equal([
      {
        "id": 4,
        "userID": 2,
        "destinationID": 4,
        "travelers": 1,
        "date": "2022/09/16",
        "duration": 8,
        "status": "approved",
        "suggestedActivities": []
      }
    ]);
  });

  it('Should get traveler\'s present trips', () => {
    expect(tripsRepository.getTravelerTripsInTime(1, 'present')).to.deep.equal([{
      "id": 10,
      "userID": 1,
      "destinationID": 10,
      "travelers": 1,
      "date": "2022/06/05",
      "duration": 40,
      "status": "approved",
      "suggestedActivities": []
    }]);
  });

});