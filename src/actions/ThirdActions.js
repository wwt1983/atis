const APIKEY = 'AIzaSyAkHUWxpCDNVVGjDe73ly3mKRmfwYbOk8I'

export function fetchOriginLocation(input) {
    return (dispatch) => {
        let GoogleMapsLoader = require('google-maps')
        GoogleMapsLoader.KEY = APIKEY
        GoogleMapsLoader.LIBRARIES = ['places']

        GoogleMapsLoader.load(function(google) {
            var cb = function(predictions, status) {
                dispatch({
                    type: 'LOADED_GP_PREDICTIONS',
                    payload: {data: predictions, status: status}
                })
            }

            var service = new google.maps.places.AutocompleteService()
            service.getQueryPredictions({input: input, types: ['(cities)']}, cb)
        })
    }
}
