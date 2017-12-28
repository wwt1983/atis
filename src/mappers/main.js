module.exports = {
    filterDepartureStops: (payload) => {
        return payload.filter((item) => {
            if(item.type !== 'BusStop') {
                return item
            }
        })
    },
    mapPushedLocation: (history, url) => {
        let h = history.map((item) => {
            return item
        })
        h.push(url)
        return h
    },
    mapBulkData: (state, obj) => {
        let s = Object.assign({}, state)
        for(let k in s) {
            if(obj[k]) { s[k] = obj[k] }
        }

        return s
    },
    mapSuspendSearch: (obj, attempts, timeout) => {
        if(!obj) {
            return {exceeded: false, attempts: 0, timeout: timeout}
        } else {
            let nobj = Object.assign({}, obj)
            return {exceeded: ((nobj.attempts + 1) === attempts), attempts: (nobj.attempts + 1), timeout: timeout}
        }
    }
}
