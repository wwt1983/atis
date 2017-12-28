import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

const swal = require('sweetalert2')


import './styles.css'
import './TripCard.css'

export default class Trip extends Component {
    getSwal = () => {
        swal.setDefaults({
            input: 'text',
            confirmButtonText: 'Дальше &rarr;',
            showCancelButton: true,
            cancelButtonText: 'Закрыть',
            confirmButtonColor: '#3ED076',
            cancelButtonColor: '#d33',
            progressSteps: ['1', '2', '3']
          })
          
          var steps = [
            {
              title: 'E-mail',
              text: 'Укажите почту, чтобы мы могли с вами связаться '
            },
            'Телефон',
            'Комментарий '
          ]
          
          swal.queue(steps).then((result) => {
            swal.resetDefaults()
          
            if (result.value) {
              swal({
                title: 'Спасибо, Ваша заявка принята.',
                html:
                  'Данные для обработки: <pre>' +
                    JSON.stringify(result.value) +
                  '</pre>',
                confirmButtonText: 'Закрыть!'
              })
            }
          })
    }
    render() {
        const { data } = this.props;

        return  <Paper zDepth={1} style={{borderRadius: '5px', marginLeft : '150'}}>
                    <div className='route-page__body-feed__card' >
                        <div className='card-main'>
                            <div className='card-main__inner trip-card'>
                                <div className='trip-card__body'>
                                 {data[0]} <br/> {data[1]}
                                </div>

                                <div className='trip-card__details'>
                                    <div className='trip-card__adult-price'>
                                       <span className='trip-card__adult-price-value'><b className='ruble'>{data[2]}  ₽</b></span>
                                    
                                    </div>
                                    <div className= { 'trip-card__action'}>
                                        <RaisedButton
                                            label='Заказать'
                                            style={{width: '100%'}}
                                            backgroundColor= {'#f3f6f7'}                
                                            onClick={this.getSwal}
                                        />
                                    </div>
                          
                                </div>
                            </div>
                        </div>
                    </div>
                </Paper>
    }
}
