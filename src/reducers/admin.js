const initialState = {
    importCache: [],
    writtenCache: []
}

export default function admin(state = initialState, action) {
    switch (action.type) {
        case 'WRITTEN_STATIC':
            if(state.importCache.length > 0) {
                var o = Object.assign([], state.importCache)
                var ow = Object.assign([], state.writtenCache)
                var move = o.shift()
                ow.push(move)

                return {...state, importCache: o, writtenCache: ow}
            } else {
                return state
            }
            break
        case 'LOADED_CACHE':
            return {...state, importCache: action.payload}
        default:
            return state
    }
}
