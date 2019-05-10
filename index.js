'use strict';
// global $

// holds base data
const store = {
  apiKey: 'sHyL5aAnlhU17AWR5lPK0CNrehBji8hzMpv70F7H',
  parksURL: 'https://developer.nps.gov/api/v1/parks',
};


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function displayResults(responseJson) {
  // put park data into html
  console.log(responseJson.length);
  console.log(responseJson.message);
  console.log(responseJson.data.length);

  // returning 1 extra???? 0 based? subtract by 1 from length to ugly fix it?
  $('#js-park-ul').empty();

  for (let i = 0; i < responseJson.data.length - 1; i++) {
    $('#js-park-ul').append(`<li>${i + 1}.</li>`);
    $('#js-park-ul').append(`<li>${responseJson.data[i].fullName}</li>`);
    $('#js-park-ul').append(`<li>${responseJson.data[i].description}</li>`);
    $('#js-park-ul').append(`<li>${responseJson.data[i].url}</li>`);
  }

}


function getParkResults(states, maxResults=10) {
  
  // what to do to states string?? its NC,SC etc... also in array form?
  

  // create params object housing API key, max limit, and states 
  const params = {
    'stateCode': states,
    'limit': maxResults,
    'api_key': 'sHyL5aAnlhU17AWR5lPK0CNrehBji8hzMpv70F7H',
  };

  let parksURL = 'https://developer.nps.gov/api/v1/parks';

  // put params into browser readable string
  let paramString = formatQueryParams(params);
  console.log(paramString);
  const url = parksURL + '?' + paramString; // CHECK THAT I CAN REFERENCE OBJ FOR URL
  console.log(url);

  // Now fetch url json data
  fetch(url)
    .then( response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('server data not retrieved (failed fetch)');
      }
    })
    .then(jsonResponse => {
      console.log(jsonResponse);
      displayResults(jsonResponse);
    })
    .catch(response => console.log(response.message));

}

// HOW TO ACCOUNT FOR BAD CASE OF ENTERING >10 results??
function watchFormInput() {

  // Get user input
  $('#js-form').on('submit', function(event) {
    event.preventDefault();
    const searchStates = $('#js-search-states').val();
    const numResults = $('#js-max-results').val();
    getParkResults(searchStates, numResults);
  });

}


$(watchFormInput());

// Requirements:
// The user must be able to search for parks in one or more states.
// The user must be able to set the max number of results, with a default of 10.
// The search must trigger a call to NPS's API.
// The parks in the given state must be displayed on the page. Include at least:
// Full name
// Description
// Website URL
// The user must be able to make multiple searches and see only the results for the current search.

