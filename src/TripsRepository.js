class TripsRepository {
  constructor(trips) {
    this.trips = trips;
  }

  getTripsByTravelerId(idNum) {
    const travelersTrips = this.trips.filter(trip => trip.userID === idNum);
    return travelersTrips;
  };
};

export default TripsRepository;