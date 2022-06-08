class Traveler {
  constructor(traveler) {
    this.name = traveler.name;
  }

  returnFirstName() {
    return this.name.split(' ')[0];
  };
};

export default Traveler;