import dayjs from 'dayjs';
dayjs().format();

class TripsRepository {
  constructor(trips) {
    this.trips = trips;
  }

  getTripsByTravelerId(idNum) {
    const travelersTrips = this.trips.filter(trip => trip.userID === idNum);
    return travelersTrips;
  };

  getTravelerPastTrips(idNum) {
    const userTrips = this.getTripsByTravelerId(idNum);
    const userPastTrips = userTrips.filter(trip => dayjs(trip.date).isBefore(Date.now()));
    return userPastTrips
  };
};

export default TripsRepository;