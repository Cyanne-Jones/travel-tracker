class TravelersRepository {
  constructor(travelersData) {
    this.travelers = travelersData;
  }

  getTravelerByIdNum(idNum) {
    const correctTraveler = this.travelers.find(traveler => traveler.id === idNum);
    return correctTraveler;
  };
};

export default TravelersRepository;