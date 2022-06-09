import './css/styles.css';
import TravelersRepository from './TravelersRepository';
import DestinationRepository from './DestinationRepository';
import TripsRepository from './TripsRepository';
import Traveler from './Traveler';
import {fetchApiData} from './apiCalls.js';
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
    //console.log(value);
    setTravelerData(value[0].travelers);
    const correctTraveler = getTravelerData();
    setTraveler(correctTraveler);
    setTripsData(value[1].trips);
    setDestinationData(value[2].destinations);
    showTravelerInfo(traveler);
  })
  .catch(error => {
    console.log(error)
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

//DOM MANIPULATION

function getTravelerTrips(time) {
  const timeTravelersTrips = tripsRepo.getTravelerTripsInTime(travelerId, time);
  const formattedTrips = timeTravelersTrips.map(trip => {
    const destination = destinationRepo.getDestinationById(trip.destinationID);
    return `<div class="trip-card">
      <div class="trip-info-container">
        <img class= "trip-photo" src="${destination.image}" alt="${destination.alt}">
        <div class="trip-info-text">
          <p class="trip-destination-text">${destination.destination}</p>
          <p class="trip-date-text">${dayjs(trip.date).format('MMM D YYYY')}</p>
          <p class="trip-people-text">${trip.travelers} people</p>
        </div>
      </div>
     <p class="trip-status">${trip.status}</p>
    </div>`
  });
  return formattedTrips;
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
    
  }
};

function showTravelerInfo(traveler) {
  userGreetingText.innerText = `hello, ${traveler.returnFirstName()}!`;
  todaysDateText.innerText = `today's date is ${dayjs(Date.now()).format('ddd MMM D YYYY')}`;
  setTravelerTrips('past');
  setTravelerTrips('future')
};
