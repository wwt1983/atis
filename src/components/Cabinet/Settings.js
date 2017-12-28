import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import TextField from 'material-ui/TextField'
import Phone, {isValidPhoneNumber} from 'react-phone-number-input'
import RaisedButton from 'material-ui/RaisedButton'
// import FacebookLogin from 'react-facebook-login'

import { ValidationUserSettings } from '../../utils/validation'

import VkLogin from './UI/VkLoginNew'
import FbLogin from './UI/FbLogin'

import 'react-phone-number-input/rrui.css'
import 'react-phone-number-input/style.css'

import './styles.css'

export default class Settings extends Component {
    componentWillMount(){
        const {dataUser} = this.props

        this.setState ({
            name: dataUser.name ? dataUser.name : '',
            email: dataUser.login ? dataUser.login : '',
            phone: dataUser.phone ? dataUser.phone : '',
            vkId: dataUser.vkId ? dataUser.vkId.toString() : false,
            vkName: dataUser.vkName ? dataUser.vkName : '',
            fbId: dataUser.fbId ? dataUser.fbId : false,
            fbName: dataUser.fbName ? dataUser.fbName : '',
            changePassword: false,
            password:'',
            newPassword:'',
            checkSocialId: false,
            checkSocialIdFb: false,
            nameError: false,
            phoneError: false,
            loadedAccount: dataUser ? true : false
        })

    }
    componentWillUpdate(nextProps, nextState) {
        if(nextProps.dataUser && this.props.dataUser.id !== nextProps.dataUser.id) {
            this.setState({
                ...nextState,
                name: nextProps.dataUser.name,
                email: nextProps.dataUser.login,
                phone: nextProps.dataUser.phone,
                vkId: nextProps.dataUser.vkId.toString(),
                vkName: nextProps.dataUser.vkName,
                fbId: nextProps.dataUser.fbId,
                fbName: nextProps.dataUser.fbName,
                phoneError: (!isValidPhoneNumber(nextProps.dataUser.phone)) ? 'Неверный номер телефона' : false,
                nameError: (nextProps.dataUser.name.length == 0) ? 'Заполните поле Имя' : '',
                loadedAccount: true
            })
        }

        if (nextProps.vkData && this.state.vkId != nextProps.vkData.uid.toString() && nextState.vkId != nextProps.vkData.uid.toString() && !this.state.checkSocialId){
            this.setState({
                ...nextState,
                vkId: nextProps.vkData.uid.toString(),
                vkName: nextProps.vkData.first_name,
                checkSocialId: true
            })
        }

        if (nextState.checkSocialId && this.state.checkSocialId != nextState.checkSocialId && this.state.vkId != nextProps.vkData.uid.toString()){
            const saveAccountSettings = this.props.saveAccountSettings
            saveAccountSettings(nextState)
        }

        if (nextProps.fbData && this.state.fbId != nextProps.fbData.id.toString() && nextState.fbId != nextProps.fbData.id.toString() && !this.state.checkSocialIdFb){
            this.setState({
                ...nextState,
                fbId: nextProps.fbData.id.toString(),
                fbName: nextProps.fbData.name,
                checkSocialIdFb: true
            })
        }
        if (nextState.checkSocialIdFb && this.state.checkSocialIdFb != nextState.checkSocialIdFb && this.state.fbId != nextProps.fbData.id.toString()){
            const saveAccountSettings = this.props.saveAccountSettings
            saveAccountSettings(nextState)
        }
    }
    changeName = (event) => {
        let errorNameResult = false
        if (event.target.value.length == 0){
            errorNameResult = 'Слишком мало букав'
        }
        this.setState ({
            ...this.state,
            name: event.target.value,
            nameError: errorNameResult
        })
    }
    changeEmail = (event) => {
        this.setState ({
            ...this.state,
            email: event.target.value
        })
    }
    changePassword = (event) => {
        this.setState ({
            ...this.state,
            password: event.target.value
        })
    }
    changePasswordNew = (event) => {
        this.setState ({
            ...this.state,
            newPassword: event.target.value
        })
    }
    changePhone  = (value) => {
        let errorPhoneResult = false
        if (!isValidPhoneNumber(value)){
            errorPhoneResult = 'Неверный номер телефона'
        }
        this.setState ({
            ...this.state,
            phone: value,
            phoneError: errorPhoneResult
        })
    }
    showPasswordForm  = () => {
        this.setState ({
            ...this.state,
            changePassword: true
        })
    }
    saveUserSettings  = () => {
        let errors = ValidationUserSettings('cabinet', this.state)
        console.log(errors)
        let goToSaveAccount = false
        if (errors.length > 0){
            if (!this.state.changePassword && errors.length == 2){
                goToSaveAccount = true
            }
        }else{
            goToSaveAccount = true
        }

        if (goToSaveAccount){
            const saveAccountSettings = this.props.saveAccountSettings
            saveAccountSettings(this.state)
            this.setState ({
                ...this.state,
                changePassword: false
            })
        }

    }

    render() {
        const {CoverPage} = this.props
        let changePasswordForm

        if (this.state.changePassword){
            changePasswordForm = (
                <div className='account-password-wrap'>
                    <div className='account-input-wrap'>
                        <TextField
                            hintText='Старый пароль'
                            onChange={this.changePassword}
                            className='input-passenger'
                            value={this.state.password}
                            floatingLabelText='Старый пароль'
                            style={{width:'100%'}}
                        />
                    </div>
                    <div className='account-input-wrap'>
                        <TextField
                            hintText='Новый пароль'
                            onChange={this.changePasswordNew}
                            className='input-passenger'
                            value={this.state.newPassword}
                            floatingLabelText='Новый пароль'
                            style={{width:'100%'}}
                        />
                    </div>
                </div>
            )
        }
        let vkForm
        if (this.state.loadedAccount){
            vkForm = <VkLogin apiId='6213921' vkId={this.state.vkId} vkData={this.props.vkData} socialAutorization={this.props.socialAutorization} />
        }
        let fbForm
        if (this.state.loadedAccount){
            fbForm = <FbLogin apiId='1963174840631197' fbId={this.state.fbId} fbData={this.props.fbData} socialAutorization={this.props.socialAutorization} />
        }

        return  <div className='cabinet-wrap'>
            <Scrollbars
                autoHeightMax={'calc(100vh - 103px)'}
                autoHeightMin={'calc(100vh - 103px)'}
                autoHeight={true}
            >
                <h2>Настройка аккаунта</h2>
                <div className='account-settings'>
                    <div className='account-input-wrap'>
                        <TextField
                            hintText='Имя Фамилия'
                            onChange={this.changeName}
                            className='input-passenger'
                            value={this.state.name}
                            floatingLabelText='Имя Фамилия'
                            style={{width:'100%'}}
                            errorText={this.state.nameError}
                        />
                    </div>
                    <div className='account-input-wrap'>
                        <TextField
                            hintText='Адрес электронной почты (login)'
                            onChange={this.changeEmail}
                            className='input-passenger'
                            value={this.state.email}
                            disabled={true}
                            floatingLabelText='Адрес электронной почты (login)'
                            style={{width:'100%'}}
                        />
                    </div>
                    <div className='account-input-wrap'>
                        <label className='account-input-label'>Номер мобильного телефона</label>
                        <Phone
                            placeholder='Номер мобильного телефона'
                            value={this.state.phone}
                            onChange={this.changePhone}
                            className='input-passenger'
                            error={this.state.phoneError}
                            indicateInvalid
                        />

                    </div>
                    {changePasswordForm}
                    <div className='passanger-add'>
                        <RaisedButton
                            label='Изменить пароль'
                            primary={true}
                            onClick={this.showPasswordForm}
                            style={{marginRight:'20px'}}
                            disabled={(this.state.changePassword) ? true :false}
                        />
                        <RaisedButton
                            label='Сохранить'
                            primary={true}
                            onClick={this.saveUserSettings}
                        />
                    </div>
                    <h3>Социальные сети</h3>
                    <div className='social-form'>
                        {vkForm}
                        {fbForm}
                    </div>
                </div>
                {CoverPage}
            </Scrollbars>

        </div>
    }
}
