import './css/styles.css';
import TravelersRepository from './TravelersRepository';
import DestinationRepository from './DestinationRepository';
import TripsRepository from './TripsRepository';
import Traveler from './Traveler';
import {fetchApiData} from './apiCalls.js';

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
    showTravelerInfo(traveler)
    setTripsData(value[1].trips);
    setDestinationData(value[2].destinations);
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

//DOM MANIPULATION

function showTravelerInfo(traveler) {
  userGreetingText.innerText = `hello, ${traveler.returnFirstName()}!`
}
