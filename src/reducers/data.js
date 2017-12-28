const suspendAttempts = 3
const suspendTimeout = 5000

const initialState = {
    routingData: {
        directRequest: false,
        fetchedExistance: false,
        existance: false,
        newRouteSuggestion: false
    },
    suspendSearch: false,
    cachedData: false,
    directStops: false,
    stopsFrom: [], //MOVE TO SEARCH REDUCER
    stopsTo: [], //MOVE TO SEARCH REDUCER
    searchStopEnd: false, //MOVE TO SEARCH REDUCER
    fetchingDeparture: false, //MOVE TO SEARCH REDUCER
    fetchingArrival: false, //MOVE TO SEARCH REDUCER
    fetchingTrips: false, //MOVE TO SEARCH REDUCER
    fetchingScheme: false,
    currentSheme: false,
    errorTrips: '',
    checkPromo: false,
    promoCodeCheckAwait: false,
    promoCodeVerifyAwait: false,
    bookTry: false,
    bookTryError: false,
    paylerForm: false,
    routes: false,
    cityData: false
}

const mappers = require('../mappers/main')

export default function data(state = initialState, action) {
    switch (action.type) {
        case 'FAILED_LOADING_TRIPS':
            return {...state, suspendSearch: mappers.mapSuspendSearch(state.suspendSearch, suspendAttempts, suspendTimeout)}
        case 'EXTRACTED_DEPARTURE':
            return {...state, cityData: action.payload}
        case 'LOADED_STOP_BYID':
            return {...state, directStops: {...state.directStops, [action.payload.type+'Name']: action.payload.data.cityName}}
        case 'CHECKED_DIRECT_STOPS':
            return {...state, routingData: {...state.routingData, directRequest: (action.payload.result.exist) ? state.routingData.directRequest : false}, directStops: (action.payload.result.exist) ? {departure: action.payload.result.departure, arrival: action.payload.result.arrival} : state.directStops}
        case 'FETCHING_SHEME':
            return {...state, currentSheme: false, fetchingScheme: true}
        case 'FETCHING_DEPARTURE_STOPS':
            return {...state, searchStopEnd: false, fetchingDeparture: true, stopsFrom: []}
        case 'FETCHED_DEPARTURE_STOPS':
            return {...state, stopsFrom: mappers.filterDepartureStops(action.payload.data), searchStopEnd: true, fetchingDeparture: false}
        case 'FETCHING_ARRIVAL_STOPS':
            return {...state, searchStopEnd: false, fetchingArrival: true, stopsTo: []}
        case 'FETCHED_ARRIVAL_STOPS':
            return {...state, stopsTo: mappers.filterDepartureStops(action.payload.data), fetchingArrival: false, searchStopEnd: true}
        case 'CHECKED_EXISTANCE':
            return {...state, routingData: {...state.routingData, existance: action.payload.result}}
        case 'FETCHING_EXISTANCE':
            return {...state, routingData: {...state.routingData, fetchedExistance: true}}
        case 'FETCHING_TRIPS':
            return {...state, fetchingTrips: true, routingData: {directRequest: false, fetchedExistance: false, existance: false, newRouteSuggestion: false}}
        case 'FETCHED_TRIPS':
            return {...state, fetchingTrips: false, routes: action.payload.data, errorTrips: (action.payload.errors.length > 0) ? action.payload.errors[0].description : ''}
        case 'FETCHED_SHEME':
            return {...state, currentSheme: action.payload.data, fetchingScheme: false}
        case 'FETCHING_PROMO_CODES':
            return {...state, promoCodeCheckAwait: true}
        case 'FETCHED_PROMO_CODES':
            return {...state, checkPromo: action.payload, promoCodeCheckAwait: false}
        case 'FETCHED_PROMO_CODES_FALSE':
            return {...state, checkPromo: false, promoCodeCheckAwait: false}
        case 'FETCHING_BOOK_TRY':
            return {...state, paylerForm: false, bookTry: true, bookTryError: false}
        case 'FETCHED_BOOK_TRY':
            return {...state, paylerForm: action.payload.data, bookTryError: false, bookTry: false}
        case 'FETCHED_BOOK_TRY_FALSE':
            console.log(action.payload);
            return {...state, paylerForm: false, bookTryError: action.payload.errors, bookTry: false}
        case 'BULK_DATA_PROPERTY':
            return mappers.mapBulkData(state, action.payload)
        case 'DATA_PROPERTY':
            return {...state, [action.payload.key]: action.payload.value}
        case 'VERIFING_PROMO_CODE':
            return {...state,  promoCodeVerifyAwait: false}
        case 'VERIFIED_PROMO_CODE_FALSE':
            return {...state,  promoCodeVerifyAwait: action.payload}
        default:
            return state
    }
}
