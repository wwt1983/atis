const Mustache = require('mustache')
const moment = require('moment')
require('moment-precise-range-plugin')
moment.locale('ru')
const staticBlocks = require('./staticBlocks')
const cardTpl = require('./cardTpl')

const template = {
    head: [
        '<!DOCTYPE html>',
        '<html>',
        '<head>',
        '<title>Расписание междугородних автобусов {{from}} - {{to}}</title>',
        '<link rel="stylesheet" type="text/css" href="/dist/bundle.css" />',
        staticBlocks.rollbar,
        '</head>'
    ],
    body: [
        '<body>',
        '<div id="root" class="container-fluid">',
        '<div class="app-root app-root_drawer-collapsed">',
        staticBlocks.appbar,
        staticBlocks.drawer,
        '<div class="app-viewport">',
        '<div class="route-page">',
        '<div class="route-page__body">',
        '<div class="container flex-container">',
        '<div class="route-page__body-main" id="routesNode" data-cache="true" data-qty="{{routesQty}}" data-stamp="{{stamp}}" data-target="{{target}}">',
        '<h2>Расписание автобусов по маршруту {{from}} - {{to}} на {{dateString}}</h2>',
        staticBlocks.loader
    ]
}

const afterroures = {
    body: [
        '</div></div></div></div></div></div></div>',
        '<script src="/dist/bundle.js"></script>',
        '</body>',
        '</html>'
    ]
}

module.exports = (data) => {
    data.routesQty = data.payload.length
    data.stamp = moment().unix()
    data.target = moment(data.payload[0].departure.dateTime).format('YYYY-MM-DD')

    let out = ''
    for(let i in template) {
        out += Mustache.render(template[i].join(''), data)
    }

    for(let i of data.payload) {
        i.totaltime = moment.preciseDiff(i.arrival.dateTime, i.departure.dateTime).replace('hours', 'часов').replace('minutes', 'минут').replace('hour','час').replace('minute', 'минута')
        i.departureDateString = moment(i.departure.dateTime).format('D MMMM')
        i.arrivalDateString = moment(i.arrival.dateTime).format('D MMMM')
        out += Mustache.render(cardTpl.join(''), i)
    }

    for(let i in afterroures) {
        out += Mustache.render(afterroures[i].join(''), data)
    }

    return out
}
