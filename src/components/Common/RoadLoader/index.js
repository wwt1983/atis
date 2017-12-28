import React, { Component } from 'react'

import './styles.css'

export default class RoadLoader extends Component {
    render() {
        const { width } = this.props

        return  <div className='road-loader' style={{width: width+'px', height: (width/2)+'px'}}>
                    <img className='road-loader__bus' src={require('../../../assets/img/bus.svg')} />
                    <img className='road-loader__road' src={require('../../../assets/img/road.svg')} />
                </div>
    }
}
