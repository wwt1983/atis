import React, { Component } from 'react'

export default class CoverPage extends Component {
    render() {
        const { visible } = this.props
        return  <div className={(!visible) ? 'side-auth-wrap__cover cabinet_cover side-auth-wrap__cover_active' : 'side-auth-wrap__cover cabinet_cover'}>
                    <img src={require('../../../assets/img/ring.svg')} />
                </div>
    }
}
