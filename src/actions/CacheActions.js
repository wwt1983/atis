const axios = require('axios')
const moment = require('moment')
moment.locale('ru')

export function extractDeparture(alias) {
    return async (dispatch) => {
        dispatch({
            type: 'EXTRACTING_DEPARTURE',
            payload: alias
        })

        try {
            let city = await axios.post('/utils/extractdeparture', {
                alias: alias
            })

            if(city.data) {
                dispatch({
                    type: 'EXTRACTED_DEPARTURE',
                    payload: city.data
                })
            }
        } catch(err) {
            console.log(err)
        }
    }
}

export function pushStatic(from, to, payload, search, override) {
    return async (dispatch) => {
        dispatch({
            type: 'PUSHING_CACHE',
            payload: {routes: payload, search: search, override: override}
        })

        try {

            let cache = await axios.post('/utils/pushstatic', {
                payload: payload,
                override: override,
                from: search.fromStop,
                to: search.toStop,
                departure: from.toString(),
                arrival: to.toString(),
                dateString: moment(search.dateTrip).format('D MMMM YYYY')
            })

            if(cache.data) {
                dispatch({
                    type: override ? 'OVERWRITTEN_CACHE' : 'CREATED_CACHE',
                    payload: cache.data
                })
            }
        } catch (err) {
           console.log(err)
        }
    }
}
