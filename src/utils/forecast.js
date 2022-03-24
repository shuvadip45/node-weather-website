const request = require('request')

const forecast = (latitude, longitude, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=93a95a06725c7202cb1630d221a383b1&query='+ latitude + "," + longitude

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }
        else if(body.error){
            callback("Unable to find location!", undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees. It feels like "+body.current.feelslike+" degrees. Last updated: "+body.current.observation_time)
        }
    })
}

module.exports = forecast