var apiKeys = false
var apiKeysCheck = false

if (localStorage.__tb_api_key_time){
    var dateApiKeyCheck = new Date().getTime()
    var curTimeApiKey = parseInt(localStorage.__tb_api_key_time)
    var checkApiKey = Math.ceil(dateApiKeyCheck/1000) - 86300

    apiKeys = (checkApiKey < curTimeApiKey) ? (localStorage.__tb_api_key) ? localStorage.__tb_api_key : false : false
    apiKeysCheck = (apiKeys) ? true : false
} else {
    apiKeys = false
}

var clientKeys = false
var clientKeysCheck = false
if (localStorage.__tb_client_key_time){
    var dateClientKeyCheck = new Date().getTime()
    var curTimeClientKey = parseInt(localStorage.__tb_client_key_time)
    var checkClientKey = Math.ceil(dateClientKeyCheck/1000) - 86300

    clientKeys = (checkClientKey < curTimeClientKey) ? (localStorage.__tb_client_key) ? localStorage.__tb_client_key : false : false
    clientKeysCheck = (clientKeys) ? true : false
}else{
    clientKeys = false
}

const initialState = {
    apiKey: apiKeys,
    client: {clientId: clientKeys, vkData: false, fbData: false, paylerFormsPrivateCabinet : []},
    apiKeysCheck: apiKeysCheck,
    clientKeysCheck: clientKeysCheck,
    loadedContent: {tickets: false, billing: false, passengers: false, routes: false, settings: false, support: false},
    currentRoutes: false
}

const mappers = require('../mappers/auth')

export default function auth(state = initialState, action) {
    switch (action.type) {
        case 'FETCHED_TRIPS':
            return {...state, currentRoutes: action.payload.data.alias.split('/')}
        case 'LOADED_ACCOUNT':
            return {...state, client: {...state.client, account: action.payload}, loadedContent: {...state.loadedContent, settings:true}}
        case 'LOADED_SOCIAL_ACCOUNT':
            return {...state, client: {...state.client, [action.types]: action.payload}}
        case 'FETCHED_ACCOUNT_TICKETS':
            return {...state, client: {...state.client, tickets: action.payload}, loadedContent: {...state.loadedContent, tickets:true}}
        case 'FETCHED_PAYLER_FORM':
            return {...state, client: {...state.client, paylerFormsPrivateCabinet: action.payload}}
        case 'FETCHED_WRONG__PAYLER_FORM':
            return {...state.client, paylerFormsPrivateCabinet : []}
        case 'LOADED_ACCOUNT_PASSENGER':
            return {...state, client: {...state.client, persons: action.payload}, loadedContent: {...state.loadedContent, passengers:true}}
        case 'LOADED_ACCOUNT_BALANCE':
            return {...state, client: {...state.client, balance: action.payload}, loadedContent: {...state.loadedContent, billing:true}}
        case 'CREATED_ACCOUNT_PASSENGER':
            return {...state, client: {...state.client, persons: mappers.addAccountPassenger(state.client.persons, action.payload.data)}}
        case 'UPDATED_ACCOUNT_PASSENGER':
            return {...state, client: {...state.client, persons: mappers.updatedAccountPassenger(state.client.persons, action.payload.data)}}
        case 'DELETED_ACCOUNT_PASSENGER':
            return {...state, client: {...state.client, persons: mappers.deleteAccountPassenger(state.client.persons, action.payload)}}
        case 'AUTHORIZED_CLIENT':
            var dateClientKey = new Date().getTime()
            localStorage.setItem('__tb_client_key', action.payload)
            localStorage.setItem('__tb_client_key_time', Math.ceil(dateClientKey/1000))
            return {...state, client: {clientId: action.payload}, clientKeysCheck: true}
        case 'CLOSED_ACCOUNT_AUTHORIZATION' :
            localStorage.removeItem('__tb_client_key')
            localStorage.removeItem('__tb_client_key_time')
            localStorage.removeItem('__tb_api_up')
            return {...state, client: {clientId: ''}, clientKeysCheck: false}
        case 'FETCHED_AUTH_API':
            var dateApiKey = new Date().getTime()
            localStorage.setItem('__tb_api_key', action.payload.access_token)
            localStorage.setItem('__tb_api_key_time', Math.ceil(dateApiKey/1000))
            return {...state, apiKey: action.payload.access_token, apiKeysCheck: true}
        default:
            return state
    }
}
