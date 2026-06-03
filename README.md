# Weather Dashboard

A simple, modern weather dashboard application that displays current weather and 5-day forecast for any city in the world.

## Features

- 🌍 Search weather for any city worldwide
- 📊 Current weather display with detailed information
- 📅 5-day weather forecast
- 🎨 Beautiful gradient UI with responsive design
- 🔄 Real-time data from OpenWeatherMap API
- 📱 Mobile-friendly interface

## Technologies Used

- HTML5
- CSS3 (with Flexbox & Grid)
- Vanilla JavaScript (ES6+)
- OpenWeatherMap API

## Setup Instructions

### 1. Get API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate your free API key
4. Copy your API key

### 2. Configure the Project

1. Open `assets/script.js`
2. Find the line: `const API_KEY = 'YOUR_API_KEY_HERE';`
3. Replace `'YOUR_API_KEY_HERE'` with your actual API key
4. Save the file

### 3. Run the Application

Since this is a frontend-only app, simply:

1. Open `index.html` in your browser, OR
2. Use a local server (optional but recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (if you have http-server installed)
   http-server
   ```
3. Navigate to `http://localhost:8000` in your browser

## Project Structure

```
weather-dashboard/
├── index.html           # Main HTML file
├── assets/
│   ├── style.css        # Styling
│   └── script.js        # JavaScript functionality
└── README.md            # This file
```

## Features Explained

### Current Weather Display
- City name and country code
- Temperature in Celsius
- Weather condition with emoji icon
- Additional details: feels like, humidity, pressure, wind speed, cloudiness

### 5-Day Forecast
- Daily weather forecast
- Max/min temperatures
- Weather condition description
- Weather icons

### User Interface
- Search bar for entering city names
- Quick suggestions for popular cities
- Error handling for invalid inputs
- Responsive design for mobile devices

## Customization

### Change Temperature Unit
In `assets/script.js`, change `units=metric` to `units=imperial` for Fahrenheit.

### Modify Popular Cities
Edit the `popularCities` array in the `initSuggestions()` function in `assets/script.js`.

### Customize Colors
Edit the CSS variables and colors in `assets/style.css`, particularly the gradient in the `body` selector.

## Deployment to GitHub Pages

1. Create a GitHub repository named `weather-dashboard`
2. Push your project files to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/weather-dashboard.git
   git push -u origin main
   ```
3. Go to repository Settings → Pages
4. Under "Source", select "Deploy from a branch" and choose `main` branch
5. Your app will be live at: `https://YOUR_USERNAME.github.io/weather-dashboard`

## API Limitations

- Free tier: 60 calls/minute, 1,000,000 calls/month
- For production use, consider upgrading to a paid plan

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Troubleshooting

**"City not found" error:**
- Make sure you've entered a valid city name
- Check your internet connection
- Verify your API key is correct

**Weather data not loading:**
- Check your API key in `script.js`
- Verify you have internet connectivity
- Open browser console (F12) to check for errors

**API quota exceeded:**
- Wait for the rate limit to reset
- Upgrade your OpenWeatherMap plan
- Consider caching responses

## Future Enhancements

- [ ] Add favorite cities functionality
- [ ] Implement temperature unit toggle
- [ ] Add weather alerts
- [ ] Store search history in localStorage
- [ ] Add animated weather backgrounds
- [ ] Multi-language support
- [ ] Dark mode toggle

## Contact & Support

For issues or suggestions, please open an issue on GitHub or contact the developer.
