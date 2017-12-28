import React, { Component } from 'react'
import Trip  from './Trip'


import './styles.css'

const moment = require('moment')
moment.locale('ru')

export default class Trips extends Component {
    render() {
        let data = [
            ['Консультация', 'Первичная консультация', 'бесплатно'],
            ['Поиск и оформление мест под торговые павильоны', 'Оформление размещения нестационарных объектов', 'от 30 000'],

            ['Сопровождение на торгах и аукционах', 'Представление интересов на торгах и аукционах', 'договорная '],

            ['Перераспределение земельного участка', 'Увеличение земельного участка', 'от 30 000'],

            ['Уточнение границ земельного участка с необходимостью согласования с ГУАиГ', 'Увеличение земельного участка', 'от 15 000'],

            ['Межевание земельного участка', 'Постановка на кадастровый учет', 'от 10 000']

    ]
        const maxLength = Math.floor(Math.random() * (80 - 69 + 1)) + 69
        let prices = []

            for(let i of data) {
                prices.push(
                    <Trip
                        data={i}
                        maxLengthSheme={maxLength}
                    />
                )
            }

        return  <div className='route-page'>
                    <div className='route-page__body'>
                        <div className='container flex-container'>
                            <div className='route-page__body-main'>
                                {prices}
                            </div>
                        </div>
                    </div>
                </div>
    }
}
