import { errorMessage } from './scripts.js';

function fetchApiData(url) {
  return fetch(url)
      .then(promise => promise.json());
};

function postNewTrip(newTrip) {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTrip)
  })
  .then(promise => {
    errorMessage.innerText = '';
    return checkForError(promise);
  })
  .catch(error => {
    if (error.message === 'Failed to fetch') {
      errorMessage.innerText = 'Failed to fetch new data, please start server.';
    } else {
      errorMessage.innerText = error.message;
    };
  });
};

const checkForError = (response) => {
  if (response.status >= 400 && response.status < 500) {
    throw new Error(`oh no! something went wrong!`);
  } else {
    return response.json();
  };
};

export {fetchApiData, postNewTrip};