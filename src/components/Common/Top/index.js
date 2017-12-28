import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import Icon from 'react-icons-kit'
import { androidMenu } from 'react-icons-kit/ionicons/androidMenu'
const swal = require('sweetalert2')

const styles = {
    bar: {
        zIndex: '1301',
        position:'fixed',
        backgroundColor: '#229ac8',
        backgroundImage: 'linear-gradient(to right, #f90015, #179fc2)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0
    },
    menuIcon: {
        color: '#fff'
    },
    logo: {
        width: 50,
        height: 30,
        marginRight: 20,
        marginLeft: 11,
        position: 'absolute',
        left: 60,
        cursor: 'pointer'
    }
}

import './styles.css'

export default class Top extends Component {
    toggleDrawer = () => {
        const { toggleLayout } = this.props
        toggleLayout('drawer')
    }

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

        return  <div>
                    <AppBar
                        title= 'Юридическая компания "АТИС"'
                        titleStyle={{paddingLeft: '80px'}}
                        iconStyleRight={{marginTop: 0}}
                        children={(
                            <img
                                style={styles.logo}
                                src={require('../../../assets/img/logo_atis.jpg')}
                                onClick={() => browserHistory.push('/')}
                            />
                        )}
                        style={styles.bar}
                        iconElementLeft={
                            <FlatButton onClick={() => this.toggleDrawer()} style={{minWidth: '44px', borderRadius: '50%', height: '44px', lineHeight: '44px', paddingTop: '7px', marginTop: '-4px'}}>
                                <Icon style={styles.menuIcon} icon={androidMenu} size={28} />
                            </FlatButton>
                        }
                        iconElementRight={(
                            <div className='top__right-block'>
                                      <span style = {{fontSize : 14}}> 8 (351) 248-81-50, 8-900-092-8965, 8-904-302-2395, Россия, г. Челябинск, ул. Курчатова 19к2, оф 233, 454092</span>
                                      <RaisedButton
                                      label = 'Оставить заявку'
                                          backgroundColor='yellow'
                                          onClick = {this.getSwal}
                                          style={{margin: 5, width : 300, fontSize : '10', color : 'white'}}
          />
                            </div>
                        )}
                    />
                </div>
    }
}
