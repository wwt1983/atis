const initialState = {
    drawer: false,
    errors: {
        authError: false
    },
    dimensions: false
}

export default function layout(state = initialState, action) {
    switch (action.type) {
        case 'GOT_DIMENSIONS':
            return {...state, dimensions: action.payload}
        case 'WRONG_AUTH_DATA':
            return {...state, errors: {...state.errors, authError: true}}
        case 'TOGGLED_LAYOUT':
            return {...state, [action.payload]: (state[action.payload]) ? false : true}
        case 'LAYOUT_PROPERTY':
            var chain = action.payload.key.split('>')
            switch (chain.length) {
                case 1:
                    return {...state, [action.payload.key]: action.payload.value}
                case 2:
                    return {...state, [chain[0]]: {...state[chain[0]], [chain[1]]: action.payload.value}}
                default:
                    return state
            }
            break
        default:
            return state
    }
}
