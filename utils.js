const Finder = require('fs-finder')
const baseDir = __dirname + '/static/pages/routes/'
var fs = require('fs')
const moment = require('moment')

const chars = {'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch','ш': 'sh','щ': 'sch','ь': '','ы': 'y','ъ': '','э': 'e','ю': 'yu','я': 'ya', '-': '-', ' ': '-'}

module.exports = {
    extractDeparture: (alias, cb) => {
        let mask = alias + '_<[0-9a-zA-Z/.-_- ]+>'+'_'+'<[0-9]+>'+'_'+'<[0-9]+>.json'
        Finder.from(baseDir).findFiles(mask, (files) => {
            if(files) {
                let data = []
                for(let f of files) {
                    let obj = JSON.parse(fs.readFileSync(f, 'utf8'))
                    data.push(obj)
                }
                cb(null, data)
            } else {
                cb('error reading FS')
            }
        })
    },
    pushStatic: (alias, content, data) => {
        var target = __dirname + '/static/pages/routes/'+alias+'.html'
        var jtarget = __dirname + '/static/pages/routes/'+alias+'.json'
        var stream = fs.createWriteStream(target)

        let meta = {
            departure: data.payload[0].departure.cityName,
            arrival: data.payload[0].arrival.cityName,
            cacheQty: data.payload.length,
            minPrice: parseMinPrice(data.payload),
            cachedDate: moment(data.payload[0].departure.dateTime).format('YYYY-MM-DD'),
            target: '/'+alias.split('_')[0]+'/'+alias.split('_')[1]
        }

        fs.writeFile(jtarget, JSON.stringify(meta), 'utf8')

        stream.once('open', () => {
            stream.end(content)
            return true
        })
    },
    checkStatic: (body, cb) => {
            //сюда передаются id городов =>
        let mask = '*_' + body.departure + '_' + body.arrival + '.html'
        Finder.from(baseDir).findFiles(mask, (files) => {
            if(files ) {
                if(files[0]) {
                    var path = files[0].split('/')
                    var filename = path[(path.length - 1)]
                        cb(null, {exist: true, departure: filename.split('_')[0], arrival: filename.split('_')[1]})
                    } else {
                        cb(null, {exist: false})
                    }
                } else {
                    cb('error reading FS')
                }
            })
    },
    checkDirectRequest: (body, cb) => {
        let mask = body.departure+'_'+body.arrival+'_*'
        Finder.from(baseDir).findFiles(mask, (files) => {
            if(files) {
                if(files[0]) {
                    var path = files[0].split('/')
                    var filename = path[(path.length - 1)]
                    cb(null, {exist: true, departure: filename.split('_')[2], arrival: filename.split('_')[3].replace('.html', '')})
                } else {
                    cb(null, {exist: false})
                }
            } else {
                cb('error reading FS')
            }
        })
    },
    checkAlias: (body, cb) => {
        let mask = makeAlias([body.departure.cityName, body.arrival.cityName])
        Finder.from(baseDir).findFiles(mask+'*', (files) => {
            if(files) {
                if(files.length === 0) {
                    cb(null, {exist: false, alias: mask})
                } else {
                    let suggestions = [
                        [body.departure.cityName, body.arrival.cityName+'-'+body.arrival.stateName],
                        [body.departure.cityName, body.arrival.cityName+'-'+body.arrival.districtName+'-'+body.arrival.stateName],
                        [body.departure.cityName+'-'+body.departure.stateName, body.arrival.cityName],
                        [body.departure.cityName+'-'+body.departure.districtName+'-'+body.departure.stateName, body.arrival.cityName],
                        [body.departure.cityName+'-'+body.departure.stateName, body.arrival.cityName+'-'+body.arrival.stateName],
                        [body.departure.cityName+'-'+body.departure.stateName, body.arrival.cityName+'-'+body.arrival.districtName+'-'+body.arrival.stateName],
                        [body.departure.cityName+'-'+body.departure.districtName+'-'+body.departure.stateName, body.arrival.cityName+'-'+body.arrival.stateName],
                        [body.departure.cityName+'-'+body.departure.districtName+'-'+body.departure.stateName, body.arrival.cityName+'-'+body.arrival.districtName+'-'+body.arrival.stateName]
                    ]

                    let available = false
                    for(let sug of suggestions) {
                        if(!available) {
                            var sugMask = makeAlias(sug)
                            var found = Finder.from(baseDir).findFiles(sugMask+'*')
                            if(found.length === 0) {
                                available = sugMask
                            }
                        }
                    }

                    if(available) {
                        cb(null, {exist: true, available: available, alias: mask})
                    } else {
                        cb(null, {exist: true, error: 'suggesting error', available: false, alias: mask})
                    }
                }
            } else {
                cb('error reading FS')
            }
        })
    }
}

function makeAlias(segments) {
    let aliasSrc = []
    for(let i of segments) {
        if(i && i !== '' && isNaN(parseInt(i))) {
            aliasSrc.push(str2url(i))
        } else {
            aliasSrc.push(i)
        }
    }

    return aliasSrc.join('_')
}

function str2url(str) {
    let source = str.toLowerCase()
    let out = ''
    for(let i=0; i < source.length; i++) {
        out += chars[source[i]]
    }

    return out
}

function parseMinPrice(routes) {
    let min = 9999
    for(let i of routes) {
        if(i.adultPrice < min) {
            min = i.adultPrice
        }
    }

    return (min === 9999) ? 100 : min
}
