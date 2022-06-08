class DestinationRepository {
  constructor(destinations) {
    this.destinations = destinations;
  }

  getDestinationById(idNum) {
    const correctDestination = this.destinations.find(destination => destination.id === idNum);
    return correctDestination;
  };
};

export default DestinationRepository;