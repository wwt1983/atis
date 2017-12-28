const moment = require('moment')

module.exports = {
    getDemand: (pull) => {
        let total = 0
        let totalFree = 0
        for(let i of pull) {
            total += i.bus.capacity
            totalFree += (i.freeSeats < i.bus.capacity) ? i.freeSeats : i.bus.capacity
        }

        let freePerc = Math.round((totalFree/total)*100)

        let demands = {
            low: {type: 'low', label: 'направление свободно', text: 'На вашу дату занято всего '+(100 - freePerc)+'% мест на этом направлении'},
            medium: {type: 'medium', label: 'средний спрос', text: 'На вашу дату уже забронировано '+(100 - freePerc)+'% билетов'},
            high: {type: 'high', label: 'высокий спрос', text: 'Поторопитесь, На вашу дату осталось всего '+freePerc+'% свободных мест'}
        }

        return (freePerc < 25) ? demands.high : (freePerc > 70) ? demands.low : demands.medium
    },
    getExpressFilter: (pull) => {
        let data = {earliest: null, latest: null, cheapest: null, fastest: null}
        for(let i of pull) {
            if(!data.earliest || moment(i.departure.dateTime).isBefore(data.earliest.value)) { data.earliest = {id: i.id, value: moment(i.departure.dateTime)} }
            if(!data.latest || moment(i.departure.dateTime).isAfter(data.latest.value)) { data.latest = {id: i.id, value: moment(i.departure.dateTime)} }
            if(!data.cheapest || (i.adultPrice < data.cheapest.value)) { data.cheapest = {id: i.id, value: i.adultPrice} }
            if(!data.fastest || (moment(i.arrival.dateTime).diff(i.departure.dateTime) < data.fastest.diff)) { data.fastest = {diff: moment(i.arrival.dateTime).diff(i.departure.dateTime), id: i.id, depTime: i.departure.dateTime, arrTime: i.arrival.dateTime}}
        }

        return data
    }
}
