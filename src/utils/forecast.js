const axios = require('axios');

const forecast = (lat, long, callback) => {
    const url = `https://api.weatherstack.com/current?access_key=20282c86cfa60aa2c78d5efadd88b649&query=${lat},${long}&units=m`;

    axios.get(url)
        .then(response => {
            const body = response.data;

            if (body.error) {
                callback('Unable to find location!', undefined);
            } else {
                const desc = body.current.weather_descriptions[0];
                const temp = body.current.temperature;
                const feels = body.current.feelslike;
                const humidity = body.current.humidity;

                callback(undefined, `${desc}. It is currently ${temp} degrees out. It feels like ${feels} degrees out. and the humidity is ${humidity} `);
            }
        })
        .catch(error => {
            callback('Unable to connect to weather service!', undefined);
        });
};

module.exports = forecast;