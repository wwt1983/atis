import React, { Component } from 'react'

const moment = require('moment')
require('moment-precise-range-plugin')
import './TripCard_v2.css'
export default class TripHead extends Component {


    render() {
        const { data } = this.props;

        let totaltime = moment.preciseDiff(data.arrival.dateTime, data.departure.dateTime).replace('hours', 'часов').replace('minutes', 'минут').replace('hour','час').replace('minute', 'минута')

        return  <div className='trip-card__body__triphead triphead_v2'>
                    <div className='card-main__inner-city'>
                        <p>Из <span className='city-name'>{data.departure.cityName}</span> - <span className='station-name'>{(data.departure.stationName !== '') ? data.departure.stationName : data.departure.name}</span></p>
                    </div>
                    <div className='card-main__inner-city'>
                        <p>в <span className='city-name'>{data.arrival.cityName}</span> - <span className='station-name'>{(data.arrival.stationName !== '') ? data.arrival.stationName : data.arrival.name}</span></p>
                    </div>
                    <div className='card-main__inner-points'>
                        <div className='trip-card__time-cell-wrap'>
                            <span className='trip-card__time-cell-time'>{moment(data.departure.dateTime).format('HH:mm')}</span>
                            <span className='trip-card__time-cell-date'>{moment(data.departure.dateTime).format('D MMMM')}</span>
                        </div>

                        <div className='trip-card__duration-cell'>
                            <div className='trip-card_time-wrap'>
                                <span className='trip-card__duration-cell-label'>в пути</span>
                                <span className='trip-card__duration-cell-value'>{totaltime}</span>
                            </div>
                            <div className='trip-card_line'></div>
                        </div>

                        <div className='trip-card__time-cell-wrap'>
                            <span className='trip-card__time-cell-time'>{moment(data.arrival.dateTime).format('HH:mm')}</span>
                            <span className='trip-card__time-cell-date'>{moment(data.arrival.dateTime).format('D MMMM')}</span>
                        </div>
                    </div>
                </div>
    }
}
