import { errorMessage } from './scripts.js';

function fetchApiData(url) {
  return fetch(url)
      .then(promise => promise.json())
};

function postNewTrip(newTrip) {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTrip)
  })
  .then(promise => promise.json())
  .catch(error => {
    console.log('ERROR', error)
    if (error.message === 'Failed to fetch') {
      errorMessage.innerText = 'Failed to fetch new data, pleasae start server.';
    } else {
      errorMessage.innerText = error.message;
    }
  })
};

const checkForError = (response) => {
  if (response.status === 422) {
    throw new Error(`You haven't entered all the information, please try again.`)
  } else {
    return response.json()
  }
};

export {fetchApiData, postNewTrip, checkForError};