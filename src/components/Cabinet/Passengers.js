import React, { Component } from 'react'


import { Scrollbars } from 'react-custom-scrollbars'
import './styles.css'

export default class Passenger extends Component {
  
    render() {
       

        return  <div className='cabinet-wrap'>
                    <Scrollbars
                        autoHeightMax={'calc(100vh - 103px)'}
                        autoHeightMin={'calc(100vh - 103px)'}
                        autoHeight={true}
                    >
                        <h2>Клиенты</h2>
                        <div className='passenger-wrap'>
                
                        </div>
                    
                    </Scrollbars>
                
                </div>
    }
}
