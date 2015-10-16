
# Setup
Add your openweathermap API key to the config.json file
```
npm install
```

# API
### Current weather data
```
GET /weather
```
Example:
```
GET /weather?q=Boone&units=imperial
```

### Query Parameters
**q** 
City name 

**zip** 
Zip code

**units**
imperial, metric, or kelvin units
