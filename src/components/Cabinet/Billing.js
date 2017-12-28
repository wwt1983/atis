import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import './styles.css'

export default class Billing extends Component {

    render() {
        const { dataBalance, CoverPage } = this.props
        return  <div className='cabinet-wrap'>
                    <Scrollbars
                        autoHeightMax={'calc(100vh - 103px)'}
                        autoHeightMin={'calc(100vh - 103px)'}
                        autoHeight={true}
                    >
                        <h2>Лицевой счёт</h2>
                        <p>На вашем счету {dataBalance} км</p>
                        {CoverPage}
                    </Scrollbars>
                </div>
    }
}
