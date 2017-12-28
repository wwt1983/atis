const axios = require('axios')
const Mustache = require('mustache')

const tplSrc = [
    '<!DOCTYPE>',
    '<html>',
    '<head><title>{{title}}</title></head>',
    '<body>',
    '<div>Взрослая цена: {{adultPrice}}</div>',
    '</body>',
    '</html>'
]

export function fetchCache() {
    return async (dispatch) => {
        try {
            var fetch = await axios.get('http://www.takebus.ml/export/json_out_cache')
            if(fetch.data) {
                dispatch({
                    type: 'LOADED_CACHE',
                    payload: fetch.data
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export function writeStatic(source) {
    return async (dispatch) => {
        try{
            var points = source.route.split('/')
            var row = source.content.routes[0]

            var obj = {
                title: row.departure.cityName+' - '+row.arrival.cityName,
                adultPrice: source.content.routes[0].adultPrice
            }

            var out = Mustache.render(tplSrc.join(''), obj)

            var write = await axios.post('/utils/pushstatic', {
                from: points[0],
                to: points[1],
                content: out
            })

            if(write.data) {
                dispatch({
                    type: 'WRITTEN_STATIC',
                    payload: out
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}
