import React, { Component } from 'react'
import Icon from 'react-icons-kit';
import { userCircle } from 'react-icons-kit/fa/userCircle';

import '../styles.css'

export default class Passenger extends Component {
    render() {
        const { dataPassenger } = this.props
        return  <div className='passanger-item-content'>
                    <Icon size={64} icon={userCircle}/>
                    <p>{dataPassenger.fullName}</p>
                </div>
    }
}
