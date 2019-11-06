const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/602772d2bd4e929fa4b5103de63f496b/' + latitude + ',' + longitude
   
    request({ url, json: true }, (error,  { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            var currentTemp = body.currently.temperature
            var currentPrecip = body.currently.precipProbability
            callback(undefined, body.daily.data[0].summary + "It is currently " + currentTemp + " degrees out. There is a " + currentPrecip + "% chance of percipitation." )
        }
    })
}
    
module.exports = forecast