const axios = require('axios')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoiZWFybHZ5biIsImEiOiJjbWNibjQwenYwaHN2MmxxM2Z3amQwd2ZtIn0.O0LXZDijNlPCc5BHiKk1-g'

    axios.get(url)
        .then(response => {
            const body = response.data;

            if (!body.features || body.features.length === 0) {
                callback('Unable to find location. Try another search.', undefined);
            } else {
                callback(undefined, {
                    latitude: body.features[0].geometry.coordinates[1],
                    longitude: body.features[0].geometry.coordinates[0],
                    location: body.features[0].properties.full_address
                });
            }
        })
        .catch(error => {
            callback('Unable to connect to location services!', undefined);
        });
};

module.exports = geocode;