import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { ListItem } from 'material-ui/List'

import Icon from 'react-icons-kit'
import { ticket } from 'react-icons-kit/entypo/ticket'
import { ic_credit_card } from 'react-icons-kit/md/ic_credit_card'
import { users } from 'react-icons-kit/icomoon/users'
import { address } from 'react-icons-kit/entypo/address'
import { cog } from 'react-icons-kit/iconic/cog'
import { androidChat } from 'react-icons-kit/ionicons/androidChat'
import { exit } from 'react-icons-kit/icomoon/exit';

const styles = {
    sideIcon: {
        color: '#87a6ae'
    },
    sideRightIcon: {
        color: '#87a6ae',
        right: '6px'
    },
    iconButton:{
        margin:0,
        right:30
    },
    iconStyle:{
        color: 'rgb(135, 166, 174)'
    },
    tooltipStyles:{

    }
}

export default class ClientSide extends Component {
    constructor(props) {
          super(props)
          this.state = {
              getUserId: false
          }
    }
    componentWillMount() {
        const { fetchAccount, client, getAccountTickets, getAccountPassenger} = this.props
        if(client && client.clientId && !client.account) {
            fetchAccount(client.clientId)
            getAccountTickets()
            getAccountPassenger()
        }
    }
    componentWillUpdate(nextProps, nextState){
        if (nextProps.client && nextProps.client.account && nextProps.client.account.id != nextState.getUserId){
            this.setState({
                ...this.state,
                getUserId: nextProps.client.account.id
            })
            const { getAccountBalance } = this.props
            getAccountBalance(nextProps.client.account.id)
        }

    }

    handleMenuClick(target) {
        if(target === 'exit') {
            const {signOut} = this.props;
            signOut();
            localStorage.removeItem('_ts_token');
            return;
        }

        const { toggleLayout, isCabinet, drawerStatus } = this.props

        browserHistory.push('/cabinet/' + target)

        if(!isCabinet) {
            toggleLayout('drawer')
        } else {
            if(drawerStatus) {
                toggleLayout('drawer')
            }
        }
    }
    showHint(action, type){
        if (this.props.isCabinet){
            if (action){
                this.refs[type].style.opacity = 1
                this.refs[type].style.visibility = 'visible'
            }else{
                this.refs[type].style.opacity = 0
                this.refs[type].style.visibility = 'hidden'
            }
        }
    }

    render() {
        const {  drawerStatus } = this.props
        return  <div className='client-side'>
                    <div className='sidebarActionButton'
                        onMouseEnter={() => this.showHint(true, 'zemlya')}
                        onMouseLeave={() => this.showHint(false, 'zemlya')}
                    >
                        <ListItem
                            onClick={() => this.handleMenuClick('zemlya')}
                            leftIcon={drawerStatus ? (<Icon icon={ticket} style={styles.sideIcon} size={32} />) : null}
                            rightIcon={drawerStatus ? null : (<Icon icon={ticket}  style={styles.sideRightIcon} size={24}/>)}
                            primaryText='Земля'
                            innerDivStyle={{paddingLeft: '64px',  paddingBottom: '14px', fontSize: '14px', lineHeight: '18px', color: '#283741', textTransform: 'uppercase'}}
                        />
                        <span className='sidebarHint' ref='zemlya'>Землевладельцам</span>
                    </div>
                    <div className='sidebarActionButton'
                        onMouseEnter={() => this.showHint(true, 'about')}
                        onMouseLeave={() => this.showHint(false, 'about')}
                    >
                        <ListItem
                            onClick={() => this.handleMenuClick('about')}
                            leftIcon={drawerStatus ? (<Icon icon={ic_credit_card} style={styles.sideIcon} size={32} />) : null}
                            rightIcon={drawerStatus ? null : (<Icon icon={ic_credit_card}  style={styles.sideRightIcon} size={32} />)}
                            primaryText='О компании'
                            innerDivStyle={{paddingLeft: '64px', paddingBottom: '14px', fontSize: '14px', lineHeight: '18px', color: '#283741', textTransform: 'uppercase'}}
                        />
                        <span className='sidebarHint' ref='about'>О компании</span>
                    </div>
                    <div className='sidebarActionButton'
                        onMouseEnter={() => this.showHint(true, 'clients')}
                        onMouseLeave={() => this.showHint(false, 'clients')}
                    >
                        <ListItem
                            onClick={() => this.handleMenuClick('clients')}
                            leftIcon={drawerStatus ? (<Icon icon={users} style={styles.sideIcon} size={32} />) : null}
                            rightIcon={drawerStatus ? null : (<Icon icon={users}  style={styles.sideRightIcon} size={32} />)}
                            primaryText='Клиенты'
                            innerDivStyle={{paddingLeft: '64px', paddingBottom: '14px', fontSize: '14px', lineHeight: '18px', color: '#283741', textTransform: 'uppercase'}}
                        />
                        <span className='sidebarHint' ref='clients'>Клиенты</span>
                    </div>
                    <div className='sidebarActionButton'
                        onMouseEnter={() => this.showHint(true, 'routes')}
                        onMouseLeave={() => this.showHint(false, 'routes')}
                    >
                        <ListItem
                            onClick={() => this.handleMenuClick('routes')}
                            leftIcon={drawerStatus ? (<Icon icon={address} style={styles.sideIcon} size={32} />) : null}
                            rightIcon={drawerStatus ? null : (<Icon icon={address}  style={styles.sideRightIcon} size={32} />)}
                            primaryText='Инфо'
                            innerDivStyle={{paddingLeft: '64px', paddingBottom: '14px', fontSize: '14px', lineHeight: '18px', color: '#283741', textTransform: 'uppercase'}}
                        />
                        <span className='sidebarHint' ref='routes'>Мои маршруты</span>
                    </div>
                    <div className='sidebarActionButton'
                        onMouseEnter={() => this.showHint(true, 'settings')}
                        onMouseLeave={() => this.showHint(false, 'settings')}
                    >
                        <ListItem
                            onClick={() => this.handleMenuClick('settings')}
                            leftIcon={drawerStatus ? (<Icon icon={cog} style={styles.sideIcon} size={32} />) : null}
                            rightIcon={drawerStatus ? null : (<Icon icon={cog}  style={styles.sideRightIcon} size={32} />)}
                            primaryText='Настройки'
                            innerDivStyle={{paddingLeft: '64px', paddingBottom: '14px', fontSize: '14px', lineHeight: '18px', color: '#283741', textTransform: 'uppercase'}}
                        />
                        <span className='sidebarHint' ref='settings'>Настройки</span>
                    </div>
                    <div className='sidebarActionButton'
                        onMouseEnter={() => this.showHint(true, 'support')}
                        onMouseLeave={() => this.showHint(false, 'support')}
                    >
                        <ListItem
                            onClick={() => this.handleMenuClick('support')}
                            leftIcon={drawerStatus ? (<Icon icon={androidChat} style={styles.sideIcon} size={32} />) : null}
                            rightIcon={drawerStatus ? null : (<Icon icon={androidChat}  style={styles.sideRightIcon} size={32} />)}
                            primaryText='Поддержка'
                            innerDivStyle={{paddingLeft: '64px', paddingBottom: '14px', fontSize: '14px', lineHeight: '18px', color: '#283741', textTransform: 'uppercase'}}
                        />
                        <span className='sidebarHint' ref='support'>Поддержка</span>
                    </div>
                    <div className='sidebarActionButton'
                        onMouseEnter={() => this.showHint(true, 'exit')}
                        onMouseLeave={() => this.showHint(false, 'exit')}
                    >
                        <ListItem
                            onClick={() => this.handleMenuClick('exit')}
                            leftIcon={drawerStatus ? (<Icon icon={exit} style={styles.sideIcon} size={32} />) : null}
                            rightIcon={drawerStatus ? null : (<Icon icon={exit}  style={styles.sideRightIcon} size={32} />)}
                            primaryText='Выход'
                            innerDivStyle={{paddingLeft: '64px', paddingBottom: '14px', fontSize: '14px', lineHeight: '18px', color: '#283741', textTransform: 'uppercase'}}
                        />
                        <span className='sidebarHint' ref='exit'>Выход</span>
                    </div>
                </div>
    }
}
