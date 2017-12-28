import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as layoutActions from '../actions/LayoutActions'
import * as cabinetActions from '../actions/CabinetActions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#00a1c2',
        primary2Color: '#17a0c4',
        accent1Color: '#17a0c4',
        pickerHeaderColor: '#e4e4e4'
    },
    raisedButton: {
        primaryColor: '#00a1c2',
        primaryTextColor: '#ffffff',
        secondaryColor: '#4b7a9a',
        secondaryTextColor: '#ffffff'
    },
    menuItem: {
        hoverColor: 'rgba(203,230,237,0.3)'
    },
    listItem: {
        hoverColor: 'rgba(203,230,237,0.3)'
    },
    datePicker: {
        headerColor: '#283741'
    },
    textField: {
        placeHolderColor: '#9aa1a7'
    }
})

injectTapEventPlugin()

import Top from '../components/Common/Top'
import Sidebar from '../components/Common/Sidebar'
import Cabinet from '../components/Cabinet'
import Trips from '../components/Trips'
import Vno from '../components/Trips/Vno'

import './App.css'

class App extends Component {

    componentWillMount() {
        const { getNavigatorInfo } = this.props.layoutActions

        getNavigatorInfo()

        let loadedUrl = this.props.route.path === '/cabinet/:area' ? '/' : this.props.location.pathname
        this.setState({
            curTripsUrl: loadedUrl,
            appTitle: 'Юридическая компания "АТИС"'
        })
    }



    render() {
        const { layout, layoutActions } = this.props
        let cabinetDrawer = this.props.route.path === '/cabinet/:area'


        return  <MuiThemeProvider muiTheme={muiTheme}>
                    <div className={(layout.drawer) ? 'app-root' : 'app-root app-root_drawer-collapsed'}>
                        <Top
                            toggleLayout={layoutActions.toggleLayout}
                            appTitle={this.state.appTitle}
                        />
                        <Sidebar
                            status={layout.drawer}
                            errors={layout.errors}
                            isCabinet={cabinetDrawer}
                        />
                        <Cabinet
                            status={cabinetDrawer}
                            area={cabinetDrawer ? this.props.params.area : false}
                            cabinetActions = {this.props.cabinetActions}
                            layoutActions={this.props.layoutActions}
                            curTripsUrl = {this.state.curTripsUrl}
                            routePath={this.props.route.path}
                        />
                            <Vno />
                            
                             <Trips
                                 cacheActions={this.props.cacheActions}
                                 onTitleChanged={(title) => this.setState({...this.state, appTitle: title})}
                                 dimensions={this.props.layout.dimensions}
                              />
                    </div>
                </MuiThemeProvider>
    }
}

function mapStateToProps(state) {
    return {
        layout: state.layout,
        data: state.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        layoutActions: bindActionCreators(layoutActions, dispatch),
        cabinetActions: bindActionCreators(cabinetActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
