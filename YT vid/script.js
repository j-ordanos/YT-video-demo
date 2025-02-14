const defaultApiKey = 'AIzaSyDqY70muC9DSUuJ1l0dUE2UlPSYS5VZzlg';
let currentApiKey = defaultApiKey;

//checking API key validity 
async function testApiKey(apiKey) {
  const testUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=test&key=${apiKey}`;

  try {
    const response = await fetch(testUrl);
    const data = await response.json();

    if (response.ok && data.items) {
      return true; 
    } else {
      return false; 
    }
  } catch (error) {
    console.error('API key validation failed:', error);
    return false;
  }
}

//check if the search results are cached
function getCachedResults(query) {
  const cachedResults = localStorage.getItem(query);
  if (cachedResults) {
    return JSON.parse(cachedResults); 
  }
  return null; 
}

//cache the search results
function cacheResults(query, results) {
  localStorage.setItem(query, JSON.stringify(results)); 
}

//fetch search results
async function fetchSearchResults(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=15&key=${currentApiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok && data.items) {
      cacheResults(query, data.items); // Cache the results
      return data.items; 
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
}

//add event listener 'Find' button 
document.getElementById('find-btn').addEventListener('click', handleSearch);

// handle search videos
async function handleSearch(){
  const query = document.getElementById('search').value.trim();
  
  if (!query) {
    alert('Please enter a search query!');
    return;
  }

  // Check if results for the query are cached
  let searchResults = getCachedResults(query);
  
  if (searchResults) {
    console.log('Using cached results');
    displayResults(searchResults);
  } else {
    console.log('Fetching new results');
    searchResults = await fetchSearchResults(query); // Fetch new results 
    displayResults(searchResults); 
  }
}

// on enterkey click after typing
function handleSearchKeydown(event){
  if(event.key === 'Enter'){
    handleSearch();
  }
}

// loading animation effect
function showLoadingAnimation(show) {
  const loadingAnimation = document.querySelector('.loading-animation');
  loadingAnimation.style.display = show ? 'block' : 'none';
}

//display the search results
function displayResults(results) {
  const resultsContainer = document.querySelector('.search-list-container');
  resultsContainer.innerHTML = ''; // Clear previous results
  
  if (results.length > 0) {
    const footer = document.getElementById('footer');
    showLoadingAnimation(false);
    footer.classList.add('sticky');

    
    results.forEach((item) => {
      const resultElement = document.createElement('div');
      resultElement.classList.add('search-list');
      resultElement.setAttribute('tabindex', '0');
      
      resultElement.innerHTML = `
        <img src="${item.snippet.thumbnails.medium.url}" alt="${item.snippet.title}" />
        <div class="vid-desc">
          <p class="vid-title">${item.snippet.title}</p>
          <p class="vid-chName">${item.snippet.channelTitle}</p>
          <p class="vid-views">${item.snippet.publishedAt}</p>
        </div>
      `;

      //click event to open the video
      resultElement.addEventListener('click', () => {
        openModal(item.id.videoId); // Pass videoId to open modal
      });
      
      resultsContainer.appendChild(resultElement);
    });
  } else {
    showLoadingAnimation(true);
    alert('No results found!');
  }
}

// open modal and display the video
function openModal(videoId) {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('modal-video');
  
  // Set iframe src to the selected video
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  modal.style.display = 'flex';
  document.body.classList.add('modal-active'); //blur background
}

// Handle closing the modal
document.getElementById('close-btn').addEventListener('click', () => {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('modal-video');

  iframe.src = ''; //stop video
  modal.style.display = 'none';
  document.body.classList.remove('modal-active'); //remove blur
});

// on 'Use' button click 
document.getElementById('useBtn').addEventListener('click', async () => {
  const userApiKey = document.getElementById('api-key').value.trim();

  if (userApiKey) {
    const isValid = await testApiKey(userApiKey);
    
    if (isValid) {
      currentApiKey = userApiKey;
      alert('API Key has been set successfully!');
    } else {
      alert('Invalid API Key!');
      currentApiKey = defaultApiKey; 
    }
  } else {
    currentApiKey = defaultApiKey; 
  }
});

