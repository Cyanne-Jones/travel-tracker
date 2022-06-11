//IMPORTS
import './css/styles.css';
import DestinationRepository from './DestinationRepository';
import TripsRepository from './TripsRepository';
import Traveler from './Traveler';
import {fetchApiData, postNewTrip} from './apiCalls.js';
import dayjs from 'dayjs';

//GLOBAL VARIABLES
var destinationRepo;
var tripsRepo;
var traveler;
let travelerId;

//FETCH CALLS
const tripsPromise = fetchApiData('http://localhost:3001/api/v1/trips');
const destinationPromise = fetchApiData('http://localhost:3001/api/v1/destinations');

Promise.all([tripsPromise, destinationPromise])
  .then((value) => {
    setTripsData(value[0].trips);
    setDestinationData(value[1].destinations);
  })
  .catch(error => {
    return errorMessage.innerText = error.message;
});

function getLoginFormData(e) {
  const loginFormData = new FormData(e.target);
  if (checkUserNameValidity(loginFormData.get('username-input')) && checkPasswordValidity(loginFormData.get('password-input'))) {
    fetchApiData(`http://localhost:3001/api/v1/travelers/${checkUserNameValidity(loginFormData.get('username-input'))}`)
    .then(response => {
      setTraveler(response);
      travelerId = response.id;
      showTravelerInfo(traveler);
      main.classList.remove('hidden');
      loginForm.classList.add('hidden');
    })
    .catch(error => {
      errorMessage.innerText = error.message;
    });
  } else {
    errorMessage.innerText = `invalid login information, please try again.`;
  }
};

function fetchNewTrip(e) {
  const newTrip = getFormData(e);
  const postPromise = postNewTrip(newTrip);
  const newFetchPromise = fetchApiData('http://localhost:3001/api/v1/trips');
  Promise.all([postPromise, newFetchPromise]).then(value => {
    tripsRepo = new TripsRepository(value[1].trips);
    showPostedTrip(value[0].newTrip);
    totalCostUserTrip.innerText = calculateInputtedTripCost(value[0].newTrip);
  });
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
var totalCostUserTrip = document.querySelector('.total-cost-in-dollars');
var loginForm = document.querySelector('.login-form');
var main = document.querySelector('main');

//EVENT LISTENERS
form.addEventListener('submit', fetchNewTrip);
loginForm.addEventListener('submit', loginTraveler);

//FUNCTIONS TO INSTANTIATE CLASSES 
function setTripsData(data) {
  tripsRepo = new TripsRepository(data);
};

function setDestinationData(data) {
  destinationRepo = new DestinationRepository(data);
};

function setTraveler(user) {
  traveler = new Traveler(user);
};

//DOM MANIPULATION
function getTravelerTrips(time) {
  const timeTravelersTrips = tripsRepo.getTravelerTripsInTime(travelerId, time);
  if (!timeTravelersTrips[0]) {
    return [`No trips? Why don't you book one!`]
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
    </div>`;
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

function showTravelerTrips(time) {
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
  };
};

function getTravelerCostOverYear() {
  const travelerPastTrips = tripsRepo.getTravelerTripsInTime(travelerId, 'past');
  const travelerPresentTrip = tripsRepo.getTravelerTripsInTime(travelerId, 'present');
  if (travelerPresentTrip[0]) {
    travelerPastTrips.push(travelerPresentTrip[0]);
  };
  const travelerTripsThisYear = travelerPastTrips.filter(trip => dayjs(trip.date).isAfter('2021', 'year'));
  const travelerCostOverYear = travelerTripsThisYear.reduce((totalCost, currentTrip) => {
    const destination = destinationRepo.getDestinationById(currentTrip.destinationID);
    totalCost += ((destination.estimatedFlightCostPerPerson * currentTrip.travelers) + (destination.estimatedLodgingCostPerDay * currentTrip.duration * currentTrip.travelers));
    return totalCost;
  }, 0);
  return (travelerCostOverYear * 1.1).toFixed(2);
};

function showTravelerCostOverYear() {
  totalCostForYear.innerText = `$${getTravelerCostOverYear()} spent this year* (not including upcoming trips)`;
};

function showTravelerInfo(traveler) {
  userGreetingText.innerText = `hello, ${traveler.returnFirstName()}!`;
  todaysDateText.innerText = `today's date is ${dayjs(Date.now()).format('ddd MMM D YYYY')}`;
  showTravelerTrips('past');
  showTravelerTrips('future');
  showTravelerTrips('present');
  showTravelerCostOverYear();
};

function getFormData(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  if (checkDestinationInputValidity(formData.get('destination-datalist')) && checkDateInputValidity(formData.get('departure-date-input'))) {
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
    e.target.reset();
    checkTripsDisplay();
    return newTrip;
  };
};

function checkTripsDisplay() {
  if (futureTripsDisplay.innerText === `No trips? Why don't you book one!`) {
    futureTripsDisplay.innerHTML = '';
  };
};

function checkDestinationInputValidity(destinationParam) {
  const tripNames = destinationRepo.destinations.map(destination => destination.destination);
  if(tripNames.includes(destinationParam)) {
    return true;
  };
};

function checkDateInputValidity(dateParam) {
  const splitDate = dateParam.split('/');
  if (!splitDate.length === 3 || !splitDate[0].length === 4 || splitDate[1] > 12 || splitDate[2] > 31) {
    return false;
  } else if (dayjs(dateParam) < Date.now()) {
    return false;
  } else {
    return true;
  };
};

function formatPostedTrip (trip) {
  const destination = destinationRepo.getDestinationById(trip.destinationID);
  const personPeople = formatNumTravelersGrammar(trip.travelers);
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
  </div>`;
};

function showPostedTrip(trip) {
  const formattedTrip = formatPostedTrip(trip);
  futureTripsDisplay.innerHTML += formattedTrip;
  totalCostUserTrip.innerText = calculateInputtedTripCost(trip);
};

function calculateInputtedTripCost(trip) {
  const destination = destinationRepo.getDestinationById(trip.destinationID)
  const tripCost = ((destination.estimatedFlightCostPerPerson * trip.travelers) + (destination.estimatedLodgingCostPerDay * trip.duration * trip.travelers))
  return `$${(tripCost * 1.1).toFixed(2)}*`;
};

function loginTraveler(e) {
  e.preventDefault();
  getLoginFormData(e);
}

function checkUserNameValidity(userName) {
  const firstEight = userName.substring(0, 7);
  const userNameNumber = userName.substring(8);

  if(!firstEight === 'traveler'|| parseInt(userNameNumber) > 50) {
    return false;
  } else {
    return parseInt(userNameNumber);
  };
};

function checkPasswordValidity(password) {
  if (password === 'traveler') {
    return true;
  };
};

export { errorMessage };