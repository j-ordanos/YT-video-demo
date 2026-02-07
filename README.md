# YT vid - YouTube Video Search Application

A simple and elegant web application that allows users to search for YouTube videos using the YouTube Data API v3. The application features a clean interface with video search, result caching, and modal video playback.

## Features

- 🔍 **Video Search**: Search for YouTube videos with a user-friendly search interface
- ⚡ **Result Caching**: Uses localStorage to cache search results for faster subsequent searches
- 🎬 **Modal Video Player**: Watch videos directly in a modal overlay without leaving the page
- 🔑 **Custom API Key Support**: Use your own YouTube Data API key or the default provided key
- ✨ **Loading Animation**: Animated loading indicator using Lottie animations
- 📱 **Responsive Design**: Mobile-friendly layout that adapts to different screen sizes
- ⌨️ **Keyboard Support**: Press Enter to search, tab navigation for accessibility

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Modern styling with flexbox, custom properties, and responsive design
- **JavaScript (ES6+)**: Async/await, fetch API, DOM manipulation, localStorage
- **YouTube Data API v3**: Video search and metadata retrieval
- **Font Awesome 6.7.2**: Icons for UI elements
- **Lottie Animation**: Loading animation via DotLottie Player
- **Google Fonts**: Exo 2 font family

## File Structure

```
YT-video-demo/
├── README.md
└── YT vid/
    ├── index.html          # Main HTML structure
    ├── script.js           # JavaScript functionality
    ├── style.css           # Styling and responsive design
    └── assets/
        └── fav-icon.png    # Favicon
```

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/j-ordanos/YT-video-demo.git
   cd YT-video-demo
   ```

2. **Open the application**:
   - Navigate to the `YT vid` folder
   - Open `index.html` in your web browser
   - Or use a local server for better performance:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js http-server
     npx http-server
     ```

3. **Access the application**:
   - Open your browser and navigate to the local server URL (e.g., `http://localhost:8000/YT vid/`)

## Usage Guide

### Searching for Videos

1. Enter your search query in the search bar
2. Click the "Find" button or press Enter
3. Browse through the search results displayed with thumbnails, titles, and channel names
4. Click on any video to watch it in the modal player

### Using a Custom API Key

The application comes with a default YouTube Data API key, but you can use your own:

1. Scroll to the footer section
2. Enter your YouTube Data API v3 key in the "Your API key" field
3. Click the "Use" button
4. The application will validate your key and use it for subsequent searches

**Note**: To get your own API key:
- Visit [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select an existing one
- Enable the YouTube Data API v3
- Create credentials (API Key)
- Copy the API key and paste it in the application

### Modal Video Player

- Click on any search result to open the video in a modal overlay
- Click the close button (X) or outside the modal to close it
- The video will stop playing when the modal is closed

## Key Features in Detail

### Result Caching
The application uses browser localStorage to cache search results:
- First search for a query fetches data from YouTube API
- Subsequent searches for the same query load instantly from cache
- Reduces API quota usage and improves performance

### API Key Validation
Before using a custom API key, the application:
- Tests the key with a sample API request
- Validates that the key has proper permissions
- Falls back to the default key if validation fails

### Responsive Design
The application adapts to different screen sizes:
- Desktop: Wide layout with side-by-side thumbnails and descriptions
- Mobile: Stacked layout with full-width elements
- Optimized font sizes and spacing for each breakpoint

## API Documentation

### Main Functions

#### `fetchSearchResults(query)`
- Fetches video search results from YouTube Data API
- Parameters: `query` (string) - search term
- Returns: Array of video items or empty array on error

#### `getCachedResults(query)`
- Retrieves cached search results from localStorage
- Parameters: `query` (string) - search term
- Returns: Cached results or null

#### `cacheResults(query, results)`
- Stores search results in localStorage
- Parameters: `query` (string), `results` (array)

#### `testApiKey(apiKey)`
- Validates a YouTube Data API key
- Parameters: `apiKey` (string)
- Returns: Boolean indicating validity

#### `displayResults(results)`
- Renders search results to the DOM
- Parameters: `results` (array) - video items

#### `openModal(videoId)`
- Opens the video player modal
- Parameters: `videoId` (string) - YouTube video ID

## Color Scheme

- **Primary Background**: `#202020e5` (Dark gray)
- **Header/Footer**: `#1A1A1A` (Darker gray)
- **Accent Color**: `#FFDF01` (Yellow)
- **Text**: White
- **Hover/Focus**: Semi-transparent yellow

## Browser Compatibility

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (latest versions)
- Requires localStorage support
- Requires fetch API support

## License

This project is open source and available for educational purposes.

## Contributing

Feel free to fork this repository and submit pull requests for any improvements.

## Author

j-ordanos