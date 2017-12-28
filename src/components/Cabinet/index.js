import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import Tickets from './Tickets'
import About from './About'
import Passengers from './Passengers'
// import Routes from './Routes'
// import Settings from './Settings'
// import Support from './Support'
import { browserHistory } from 'react-router'

export default class Cabinet extends Component {
    componentWillMount() {

        this.setState({
            progress: true
        })
    }

    closeCabinet(){
        const { curTripsUrl } = this.props
        browserHistory.push(curTripsUrl)
    }

    render() {
        const { status, area } = this.props
 
        const inners = {
            'zemlya': (<Tickets />),
            'about': (<About/>),
            'clients': (<Passengers  />)
            // 'routes': (<Routes />),
            // 'settings': (<Settings/>),
            // 'support':(<Support />)
        }

        return  <Drawer
                    open={status}
                    containerStyle={{zIndex: 1299, overflow: 'visible'}}
                    width={800}
                >
                    <div className={status ? 'closeDrawer' : 'closeDrawer hideDrawer'} onClick={() => this.closeCabinet()}>
                        <span> Закрыть</span>
                    </div>
                    {inners[area]}

                </Drawer>
    }
}
