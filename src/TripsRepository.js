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

  getTravelerTripsInTime(idNum, time) {
    const userTrips = this.getTripsByTravelerId(idNum);
    let userTripsInTime;
    if(time === 'past') {
      userTripsInTime = userTrips.filter(trip => dayjs(trip.date).isBefore(Date.now()));
    } else if (time === 'future') {
      userTripsInTime =  userTrips.filter(trip => dayjs(trip.date) > Date.now())
    } else if (time === 'present') {
      userTripsInTime =  userTrips.find(trip => {
        const durationDate = dayjs(trip.date).add([trip.duration], 'day')
        return (Date.now() <= durationDate) && (Date.now() >= dayjs(trip.date))
      });
    };
    return userTripsInTime;
  };
  
};

export default TripsRepository;