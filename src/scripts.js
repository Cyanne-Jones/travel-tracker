import './css/styles.css';
import TravelersRepository from './TravelersRepository';
import DestinationRepository from './DestinationRepository';
import TripsRepository from './TripsRepository';
import Traveler from './Traveler';
import {fetchApiData, postNewTrip} from './apiCalls.js';
import dayjs from 'dayjs';
dayjs().format();

//GLOBAL VARIABLES

var travelersRepo;
var destinationRepo;
var tripsRepo;
var traveler;

const getRandomID = () => {
  return Math.floor(Math.random() * 49) + 1;
};

const travelerId = getRandomID();

//FETCH CALLS

const travelersPromise = fetchApiData('http://localhost:3001/api/v1/travelers');
const tripsPromise = fetchApiData('http://localhost:3001/api/v1/trips');
const destinationPromise = fetchApiData('http://localhost:3001/api/v1/destinations');

Promise.all([travelersPromise, tripsPromise, destinationPromise])
  .then((value) => {
    setTravelerData(value[0].travelers);
    const correctTraveler = getTravelerData();
    setTraveler(correctTraveler);
    setTripsData(value[1].trips);
    setDestinationData(value[2].destinations);
    showTravelerInfo(traveler);
  })
  .catch(error => {
    return errorMessage.innerText = error.message;
});

function setTravelerData(data) {
  travelersRepo = new TravelersRepository(data);
};

function setTripsData(data) {
  tripsRepo = new TripsRepository(data);
};

function setDestinationData(data) {
  destinationRepo = new DestinationRepository(data);
};

function getTravelerData() {
  var correctTraveler = travelersRepo.getTravelerByIdNum(travelerId);
  return correctTraveler;
};

function setTraveler(user) {
  traveler = new Traveler(user);
};

//QUERY SELECTORS
var errorMessage = document.querySelector('.error-message');
var userGreetingText = document.querySelector('#userGreetingText');
var todaysDateText = document.querySelector('#todaysDateText');
var pastTripsDisplay = document.querySelector('.past-trips-display');
var futureTripsDisplay = document.querySelector('.upcoming-trips-display');
var presentTripsDisplay = document.querySelector('.present-trip-display');
var totalCostForYear = document.querySelector('.total-cost-for-year');
var form = document.querySelector('.plan-trip-form');

//DOM MANIPULATION

function getTravelerTrips(time) {
  const timeTravelersTrips = tripsRepo.getTravelerTripsInTime(travelerId, time);
  if (!timeTravelersTrips[0]) {
    return [`<p>No trips? Why don't you book one!</p>`]
  } else{
  const formattedTrips = timeTravelersTrips.map(trip => {
    const destination = destinationRepo.getDestinationById(trip.destinationID);
    const personPeople = formatNumTravelersGrammar(trip.travelers)
    return `<div class="trip-card">
      <div class="trip-info-container">
        <img class= "trip-photo" src="${destination.image}" alt="${destination.alt}">
        <div class="trip-info-text">
          <p class="trip-destination-text">${destination.destination}</p>
          <p class="trip-date-text">${dayjs(trip.date).format('MMM D YYYY')}</p>
          <p class="trip-people-text">${trip.travelers} ${personPeople}</p>
        </div>
      </div>
     <p class="trip-status">${trip.status}</p>
    </div>`
  });
  return formattedTrips;
 }
};

function formatNumTravelersGrammar(num) {
  if (num === 1) {
    return 'person';
  } else {
    return 'people';
  };
};

function setTravelerTrips(time) {
  const userTrips = getTravelerTrips(time);
  if(time === 'past') {
    userTrips.forEach(trip => {
      pastTripsDisplay.innerHTML += trip;
    });
  } else if (time === 'future') {
    userTrips.forEach(trip => {
      futureTripsDisplay.innerHTML += trip;
    });
  } else if (time === 'present') {
    userTrips.forEach(trip => {
      presentTripsDisplay.innerHTML += trip;
    });
  }
};

function getTravelerCostOverYear() {
  const travelerPastTrips = tripsRepo.getTravelerTripsInTime(travelerId, 'past');
  const travelerPresentTrip = tripsRepo.getTravelerTripsInTime(travelerId, 'present')
  if (travelerPresentTrip[0]) {
    travelerPastTrips.push(travelerPresentTrip[0])
  };
  const travelerTripsThisYear = travelerPastTrips.filter(trip => dayjs(trip.date).isAfter('2021', 'year'))
  const travelerCostOverYear = travelerTripsThisYear.reduce((totalCost, currentTrip) => {
    const destination = destinationRepo.destinations.find(destination => destination.id === currentTrip.destinationID);
    totalCost += ((destination.estimatedFlightCostPerPerson * currentTrip.travelers) + (destination.estimatedLodgingCostPerDay * currentTrip.duration));
    return totalCost;
  }, 0);
  return (travelerCostOverYear * 1.1).toFixed(2);
};

function setTravelerCostOverYear() {
  totalCostForYear.innerText = `$${getTravelerCostOverYear()} spent this year* (not including upcoming trips)`
}

function showTravelerInfo(traveler) {
  userGreetingText.innerText = `hello, ${traveler.returnFirstName()}!`;
  todaysDateText.innerText = `today's date is ${dayjs(Date.now()).format('ddd MMM D YYYY')}`;
  setTravelerTrips('past');
  setTravelerTrips('future');
  setTravelerTrips('present');
  setTravelerCostOverYear();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newTrip = {
    id: tripsRepo.trips.length + 1,
    userID: travelerId,
    destinationID: (destinationRepo.destinations.find(destination => destination.destination === formData.get('destination-datalist'))).id,
    travelers: formData.get('number-people-input'),
    date: formData.get('departure-date-input'),
    duration: formData.get('trip-length-input'),
    status: 'pending',
    suggestedActivities: []
  };
  postNewTrip(newTrip);
  e.target.reset();
});

function addTripToPage(trip) {
  console.log(tripsRepo.trips);
};

export { errorMessage, addTripToPage };