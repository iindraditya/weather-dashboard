// OpenWeatherMap API key - Get free one at https://openweathermap.org/api
const API_KEY = '935365957435c9afc254728b3eeb1e6a';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
// getElementById()dalam JavaScript memungkinkan kita untuk mengakses dan memanipulasi elemen individual dalam dokumen HTML secara langsung berdasarkan ID uniknya id.
// Sumber : https://www.educative.io/answers/what-is-the-getelementbyid-method-in-javascript
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherContainer = document.getElementById('weatherContainer');
const forecastContainer = document.getElementById('forecastContainer');
const errorMessage = document.getElementById('error');
const suggestionsDiv = document.getElementById('suggestions');

// Event Listeners
// addEventListener() adalah cara yang direkomendasikan untuk mendaftarkan pendengar acara.
// Sumber : https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

// Fetch current weather
// function adalah sub-program yang bisa digunakan kembali baik di dalam program itu sendiri, maupun di program yang lain.
// sumber : https://www.petanikode.com/javascript-fungsi/
async function fetchCurrentWeather(city) {
    try { 
        // try adalah blok kode yang akan dijalankan dan jika terjadi error, maka akan dilempar ke catch untuk ditangani
        // sumber : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
        const response = await fetch(
            `${API_BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            // if (!response.ok) adalah kondisi yang akan terpenuhi jika response dari API tidak berhasil (misalnya karena kota tidak ditemukan atau masalah jaringan)
            // sumber : https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
            throw new Error('City not found');
        }
        
        return await response.json();
    } catch (error) {
        // catch adalah blok kode yang akan menangani error yang terjadi di dalam try
        // sumber : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
        showError('Unable to fetch weather data. Please check your API key and city name.');
        console.error(error);
        return null;
    }
}


// Fetch weather forecast
async function fetchForecast(lat, lon) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('Unable to fetch forecast');
        }
        
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Handle search
async function handleSearch() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
        showError('Please add your OpenWeatherMap API key in script.js');
        return;
    }
    
    clearError();
    weatherContainer.innerHTML = '<div class="loading">Loading weather data...</div>';
    forecastContainer.innerHTML = '';
    suggestionsDiv.innerHTML = '';
    
    const currentWeather = await fetchCurrentWeather(city);
    
    if (currentWeather) {
        displayCurrentWeather(currentWeather);
        
        const forecast = await fetchForecast(
            currentWeather.coord.lat,
            currentWeather.coord.lon
        );
        
        if (forecast) {
            displayForecast(forecast);
        }
        
        cityInput.value = '';
    }
}

// Display current weather
function displayCurrentWeather(data) {
    const { main, weather, wind, clouds, sys, name, dt } = data;
    const weatherIcon = getWeatherIcon(weather[0].main);
    const date = new Date(dt * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    // toLocaleDateString()instance Datemengembalikan string dengan representasi peka bahasa dari bagian tanggal ini dalam zona waktu lokal.
    // sumber : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    
    weatherContainer.innerHTML = `
        <div class="location-header">
            <h2>${name}, ${sys.country}</h2>
            <p>${date}</p>
        </div>
        
        <div class="weather-info">
            <div class="weather-main">
                <div class="weather-icon">${weatherIcon}</div>
                <div>
                    <div class="weather-temp">${Math.round(main.temp)}°C</div>
                    <div style="font-size: 1.1em; color: #666; text-transform: capitalize;">
                        ${weather[0].description}
                    </div>
                </div>
            </div>
            
            <div class="weather-details">
                <div class="detail-item">
                    <div class="detail-label">Feels Like</div>
                    <div class="detail-value">${Math.round(main.feels_like)}°C</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Humidity</div>
                    <div class="detail-value">${main.humidity}%</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Pressure</div>
                    <div class="detail-value">${main.pressure} hPa</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Wind Speed</div>
                    <div class="detail-value">${wind.speed} m/s</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Cloudiness</div>
                    <div class="detail-value">${clouds.all}%</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">UV Index</div>
                    <div class="detail-value">-</div>
                </div>
            </div>
        </div>
    `;
}

// Display 5-day forecast
function displayForecast(data) {
    const forecasts = {};
    
    // Group forecasts by day
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-US');
        
        if (!forecasts[date]) {
            forecasts[date] = [];
        }
        forecasts[date].push(item);
    });
    
    // Get one forecast per day (midday)
    let forecastHTML = '';
    let dayCount = 0;
    
    Object.keys(forecasts).forEach(date => {
        if (dayCount >= 5) return;
        
        const dayForecasts = forecasts[date];
        const midday = dayForecasts[Math.floor(dayForecasts.length / 2)];
        
        const dateObj = new Date(midday.dt * 1000);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const weatherIcon = getWeatherIcon(midday.weather[0].main);
        
        forecastHTML += `
            <div class="forecast-item">
                <div class="forecast-day">${dayName}</div>
                <div class="forecast-icon">${weatherIcon}</div>
                <div class="forecast-temp">${Math.round(midday.main.max_temp)}°</div>
                <div style="color: #aaa; font-size: 0.9em;">${Math.round(midday.main.min_temp)}°</div>
                <div class="forecast-desc">${midday.weather[0].main}</div>
            </div>
        `;
        
        dayCount++;
    });
    
    forecastContainer.innerHTML = forecastHTML;
}

// Get weather icon emoji
function getWeatherIcon(weatherMain) {
    const icons = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '💨',
        'Haze': '🌫️',
        'Dust': '🌪️',
        'Fog': '🌫️',
        'Sand': '🌪️',
        'Ash': '💨',
        'Squall': '🌪️',
        'Tornado': '🌪️'
    };
    
    return icons[weatherMain] || '🌤️';
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

// Clear error message
function clearError() {
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
}

// Initialize with popular cities
function initSuggestions() {
    const popularCities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Dubai'];
    suggestionsDiv.innerHTML = '';
    
    popularCities.forEach(city => {
        const btn = document.createElement('button');
        btn.className = 'suggestion-btn';
        btn.textContent = city;
        btn.addEventListener('click', () => {
            cityInput.value = city;
            handleSearch();
        });
        suggestionsDiv.appendChild(btn);
    });
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initSuggestions);
