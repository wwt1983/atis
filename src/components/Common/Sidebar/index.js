import React, { Component } from 'react'


import ClientSide from './ClientSide'

import Drawer from 'material-ui/Drawer'
import { List } from 'material-ui/List'

import './styles.css'



export default class Sidebar extends Component {
    toggleState(n) {
        this.setState({
            ...this.state,
            [n]: (this.state[n]) ? false : true
        })
    }
    onMouseEnterHandler  = () => {
        const { isCabinet} = this.props
        const { toggleLayout } = this.props.layoutActions
        if (!isCabinet){
            toggleLayout('drawer')
        }

    }
    onMouseLeaveHandler  = () => {
        const { isCabinet} = this.props
        const { toggleLayout } = this.props.layoutActions
        if (!isCabinet){
            toggleLayout('drawer')
        }
    }

    render() {
        const { status, client,  isCabinet,signOut } = this.props

        let clientInner =  (
            <ClientSide
                drawerStatus={status}
                client={client}

                isCabinet={isCabinet}
                signOut = {signOut}
            />
        ) 

        return  <div
                    onMouseEnter={this.onMouseEnterHandler}
                    onMouseLeave={this.onMouseLeaveHandler}
                >
                    <Drawer
                        open={status}
                        className={status ? 'drawer' : 'drawer drawer-collapsed'}
                        containerStyle={{top: '64px', overflow: 'visible'}}
                    >
                        <List style={{padding: 0}}>
                            { clientInner }
                        </List>
                    </Drawer>
                </div>
    }
}
