export function toggleLayout(key) {
    return (dispatch) => {
        dispatch({
            type: 'TOGGLED_LAYOUT',
            payload: key
        })
    }
}

export function layoutProperty(k, v) {
    return (dispatch) => {
        dispatch({
            type: 'LAYOUT_PROPERTY',
            payload: {key: k, value: v}
        })
    }
}

export function bulkDataProperty(obj) {
    return (dispatch) => {
        dispatch({
            type: 'BULK_DATA_PROPERTY',
            payload: obj
        })
    }
}

export function dataProperty(k, v) {
    return (dispatch) => {
        dispatch({
            type: 'DATA_PROPERTY',
            payload: {key: k, value: v}
        })
    }
}

export function pushLocation(url) {
    return (dispatch) => {
        dispatch({
            type: 'PUSHED_LOCATION',
            payload: url
        })
    }
}

export function getNavigatorInfo() {
    return (dispatch) => {
        dispatch({
            type: 'GOT_DIMENSIONS',
            payload: {width: window.outerWidth, height: window.outerHeight, ratio: window.devicePixelRatio, agent: window.navigator.userAgent}
        })
    }
}
