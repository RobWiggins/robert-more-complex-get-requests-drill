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

  for (let i = 0; i < responseJson.data.length; i++) {
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



// 'use strict';

// ---------------------------------------------------------------------------------------

// put your own value below!
// const apiKey = ''; 
// const searchURL = 'https://www.googleapis.com/youtube/v3/search';


// function formatQueryParams(params) {
//   const queryItems = Object.keys(params)
//     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//   return queryItems.join('&');
// }

// function displayResults(responseJson) {
//   // if there are previous results, remove them
//   console.log(responseJson);
//   $('#results-list').empty();
//   // iterate through the items array
//   for (let i = 0; i < responseJson.items.length; i++){
//     // for each video object in the items 
//     //array, add a list item to the results 
//     //list with the video title, description,
//     //and thumbnail
//     $('#results-list').append(
//       `<li><h3>${responseJson.items[i].snippet.title}</h3>
//       <p>${responseJson.items[i].snippet.description}</p>
//       <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>
//       </li>`
//     )};
//   //display the results section  
//   $('#results').removeClass('hidden');
// };

// function getYouTubeVideos(query, maxResults=10) {
//   const params = {
//     key: apiKey,
//     q: query,
//     part: 'snippet',
//     maxResults,
//     type: 'video'
//   };
//   const queryString = formatQueryParams(params)
//   const url = searchURL + '?' + queryString;

//   console.log(url);

//   fetch(url)
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error(response.statusText);
//     })
//     .then(responseJson => displayResults(responseJson))
//     .catch(err => {
//       $('#js-error-message').text(`Something went wrong: ${err.message}`);
//     });
// }

// function watchForm() {
//   $('form').submit(event => {
//     event.preventDefault();
//     const searchTerm = $('#js-search-term').val();
//     const maxResults = $('#js-max-results').val();
//     getYouTubeVideos(searchTerm, maxResults);
//   });
// }

// $(watchForm);




// HTML ------------------------------------------------

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>YouTube video finder</title>
//     <link rel="stylesheet" href="index.css">
//     <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
// </head>
// <body>
//     <div class="container">
//         <h1>YouTube video finder</h1>

        // <form id="js-form">
        //     <label for="search-term">Search term</label>
        //     <input type="text" name="search-term" id="js-search-term" required>

        //     <label for="max-results">Maximum results to return</label>
        //     <input type="number" name="max-results" id="js-max-results" value="10">

        //     <input type="submit" value="Go!">
        // </form>

//         <p id="js-error-message" class="error-message"></p>
//         <section id="results" class="hidden">
//           <h2>Search results</h2>
//           <ul id="results-list">
//           </ul>
//         </section>
//     </div>
//     <script src="index.js"></script>
// </body>
// </html>