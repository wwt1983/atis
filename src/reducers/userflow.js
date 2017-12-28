const initialState = {
    history: []
}

const mappers = require('../mappers/main')

export default function userflow(state = initialState, action) {
    switch (action.type) {
        case 'PUSHED_LOCATION':
            return {...state, history: mappers.mapPushedLocation(state.history, action.payload)}
        default:
            return state
    }
}
