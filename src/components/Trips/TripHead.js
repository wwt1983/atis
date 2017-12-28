import React, { Component } from 'react'
import Schedule from 'material-ui/svg-icons/action/schedule'

const moment = require('moment')
require('moment-precise-range-plugin')

export default class TripHead extends Component {


    render() {
        const { data } = this.props;

        let totaltime = moment.preciseDiff(data.arrival.dateTime, data.departure.dateTime).replace('hours', 'часов').replace('minutes', 'минут').replace('hour','час').replace('minute', 'минута')

        return  <div className='trip-card__body__triphead'>
                    <div className='card-main__inner-city card-main__inner-city_departure'>
                        <span className='city-name'>{data.departure.cityName}</span>
                        <span className='station-name'>{(data.departure.stationName !== '') ? data.departure.stationName : data.departure.name}</span>
                    </div>
                    <div className='card-main__inner-city card-main__inner-city_arrival media-screen-arrival-after'>
                        <span className='city-name accent-color'>{data.arrival.cityName}</span>
                        <span className='station-name'>{(data.arrival.stationName !== '') ? data.arrival.stationName : data.arrival.name}</span>
                    </div>
                    <div className='card-main__inner-points'>
                        <div className='trip-card__time-cell-wrap'>
                            <span className='trip-card__time-cell-label'>отправление</span>
                            <div className='trip-card__time-cell'>
                                <span className='trip-card__time-cell-time'>{moment(data.departure.dateTime).format('HH:mm')}</span>
                                <span className='trip-card__time-cell-date'>{moment(data.departure.dateTime).format('D MMMM')}</span>
                            </div>
                        </div>

                        <div className='trip-card__duration-cell'>
                            <Schedule color={'#95a5a9'} />
                            <span className='trip-card__duration-cell-label'>в пути</span>
                            <span className='trip-card__duration-cell-value'>{totaltime}</span>
                        </div>

                        <div className='trip-card__time-cell-wrap'>
                            <span className='trip-card__time-cell-label'>прибытие</span>
                            <div className='trip-card__time-cell'>
                                <span className='trip-card__time-cell-time'>{moment(data.arrival.dateTime).format('HH:mm')}</span>
                                <span className='trip-card__time-cell-date'>{moment(data.arrival.dateTime).format('D MMMM')}</span>
                            </div>
                        </div>
                    </div>

                    <div className='card-main__inner-city card-main__inner-city_arrival media-screen-arrival-before'>
                        <span className='city-name accent-color'>{data.arrival.cityName}</span>
                        <span className='station-name'>{(data.arrival.stationName !== '') ? data.arrival.stationName : data.arrival.name}</span>
                    </div>


                </div>
    }
}
