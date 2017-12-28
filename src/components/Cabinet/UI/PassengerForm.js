import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import areIntlLocalesSupported from 'intl-locales-supported';
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { ValidationPasseengerSettingsReverse } from '../../../utils/validation'

var moment = require('moment')
var citizenship = require('../../Trips/citizenship.js')
import 'react-phone-number-input/rrui.css'
import 'react-phone-number-input/style.css'

let DateTimeFormat;

if (areIntlLocalesSupported(['ru', 'ru-RU'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
} else {
    const IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/ru');
    require('intl/locale-data/jsonp/ru-RU');
}

import '../styles.css'

export default class PassengerForm extends Component {
    componentWillMount(){
        var dataPassenger = this.props.dataPassenger

        //костыль для боя
        let documentTypePassenger = dataPassenger.documentType ? dataPassenger.documentType : 'Undefined'
        let sexPassenger = dataPassenger.sex ? dataPassenger.sex : '0'
        if (process.env.NODE_ENV == 'development'){

            var sexObject = {
                'Мужской': 'Male',
                'Женский': 'Female'
            }
            var documentTypeObject = {
                'Паспорт': 'Passport',
                'Заграничный паспорт': 'InternationalPassport',
                'Свидетельство о рождении':'CertificateOfBirth',
                'Военный билет':'MilitaryCard',
                'Паспорт иностранного гражданина': 'ForeignDocument',
                'Паспорт моряка': 'SailorPassport'
            }
            if (dataPassenger.documentType){
                documentTypePassenger = documentTypeObject[dataPassenger.documentType]
            }
            if (dataPassenger.sex){
                sexPassenger = sexObject[dataPassenger.sex]
            }

        }

        //костыль для боя


        this.setState ({
            id: dataPassenger.id ? dataPassenger.id : 0,
            birthDate: dataPassenger.birthDate ? new Date(dataPassenger.birthDate) : new Date(),
            birthPlace: dataPassenger.birthPlace ? dataPassenger.birthPlace : '',
            documentType: documentTypePassenger,
            documentSeries: dataPassenger.documentSeries ? dataPassenger.documentSeries : '',
            documentNumber: dataPassenger.documentNumber ? dataPassenger.documentNumber : '',
            sex: sexPassenger,
            citizenship: dataPassenger.citizenship ? dataPassenger.citizenship : '',
            ticketType: dataPassenger.ticketType ? dataPassenger.ticketType.toString() : '0',
            fullName: dataPassenger.fullName ? dataPassenger.fullName : '',
            validation: []
        })

    }
    componentWillReceiveProps(nextProps){
        this.setState({
            ...nextProps,
            dataPassenger: {
                ...nextProps.dataPassenger,
                birthDate: new Date(nextProps.dataPassenger.birthDate)
            }
        })

    }
    componentDidMount(){
        let errors = ValidationPasseengerSettingsReverse('cabinet', this.state)
        this.setState({
            ...this.state,
            validation: errors
        })
        if (errors.indexOf('documentNumberInvalidType') < 0){
            const {checkValidation} = this.props
            if (errors.length == 9){
                checkValidation(true)
            }else{
                checkValidation(false)
            }
        }else{
            const {checkValidation} = this.props
            checkValidation(false)
        }
    }
    componentWillUpdate(nextProps,nextState) {
        if(nextProps.actionForm && !nextProps.checkDelete && this.props.actionForm !== nextProps.actionForm) {
            if (this.props.checkUpdate && !this.props.checkDelete){
                const updatePassenger = this.props.updatePassenger
                updatePassenger(this.state)
                const closePassangerForm = this.props.closePassangerForm
                closePassangerForm()
            }
        }
        if (this.state != nextState){
            let errors = ValidationPasseengerSettingsReverse('cabinet', nextState)

            if (JSON.stringify(this.state.validation) !== JSON.stringify(errors)){
                this.setState({
                    ...nextState,
                    validation: errors
                })
                console.log(errors.length)
                if (errors.indexOf('documentNumberInvalidType') < 0){
                    const {checkValidation} = this.props
                    if (errors.length == 9){
                        checkValidation(true)
                    }else{
                        checkValidation(false)
                    }
                }else{
                    const {checkValidation} = this.props
                    checkValidation(false)
                }
            }
        }

        if(nextProps.actionForm && this.props.actionForm !== nextProps.actionForm) {
            if (!this.props.checkUpdate){
                const addPassenger = this.props.addPassenger
                addPassenger(this.state)
                const closePassangerForm = this.props.closePassangerForm
                closePassangerForm()

            }
        }

        if(nextProps.checkDelete && this.props.checkDelete !== nextProps.checkDelete) {
            const deletePassenger = this.props.deletePassenger
            deletePassenger(this.state)
            const closePassangerForm = this.props.closePassangerForm
            closePassangerForm()
        }
    }


    handleChange = (evt, val) => {
        this.setState({
            ...this.state,
            [evt.target.name]: val
        })
    }
    handleChangeSelect(evt, index, val, type){
        this.setState({
            ...this.state,
            [type]: val
        })
    }

    birthDate = (event, date) => {

        var current = moment(new Date());
        var birth = moment(date);
        var outCheckBirthDate = current.diff(birth, 'years')
        var ticketType = '2'
        if (outCheckBirthDate >= 12){
            ticketType = '1'
        }
        this.setState ({
            ...this.state,
            birthDate: date,
            ticketType: ticketType
        })
    }

    render() {
        var citizenshipOut = []
        var key = 0
        for(let c of citizenship.citizenship) {
            citizenshipOut.push(<MenuItem value={c} key={key} primaryText={c} />)
            key++
            //console.log(c);
        }
        let documentSeriesErrorText = ''
        let documentSeriesErrorStyle = {}
        let documentNumberErrorText = ''
        let documentNumberErrorStyle = {}

        const selectValidStyle = {color: 'green'}

        if (this.state.validation.indexOf('documentSeriesInvalidType') >= 0) {
            documentSeriesErrorText = 'Неверно указан тип документа'
        }else if (this.state.validation.indexOf('documentSeries') >= 0) {
            documentSeriesErrorText = ' '
            documentSeriesErrorStyle = {color: 'green'}
        }
        if (this.state.validation.indexOf('documentSeriesInvalidType') >= 0) {
            documentNumberErrorText = 'Неверно указан тип документа'
        }else if (this.state.validation.indexOf('documentNumber') >= 0) {
            documentNumberErrorText = ' '
            documentNumberErrorStyle = {color: 'green'}
        }



        return  <div className='passenger-form cabinet'>
            <div className='passenger-input-wrap'>
                <TextField
                    hintText='Фамилия Имя Отчество'
                    onChange={this.handleChange}
                    name='fullName'
                    className='input-passenger'
                    value={this.state.fullName}
                    errorText={(this.state.validation.indexOf('fullName') >= 0) ? ' ' : ''}
                    errorStyle={(this.state.validation.indexOf('fullName') >= 0) ? selectValidStyle : {}}
                    floatingLabelFocusStyle={(this.state.validation.indexOf('fullName') >= 0) ? selectValidStyle : {}}
                />
            </div>
            <div className='passenger-input-wrap'>
                <DatePicker
                    hintText='Дата рождения'
                    container='inline'
                    autoOk={true}
                    name={'birthDate'}
                    DateTimeFormat={DateTimeFormat}
                    locale='ru'
                    cancelLabel='Закрыть'
                    className='input-passenger-data'
                    textFieldStyle={{width:'100%'}}
                    onChange={this.birthDate}
                    value={this.state.birthDate}
                    errorText={(this.state.validation.indexOf('birthDate') >= 0) ? ' ' : ''}
                    errorStyle={(this.state.validation.indexOf('birthDate') >= 0) ? selectValidStyle : {}}
                    floatingLabelFocusStyle={(this.state.validation.indexOf('birthDate') >= 0) ? selectValidStyle : {}}
                />
            </div>
            <div className='passenger-input-wrap'>
                <TextField
                    name='birthPlace'
                    hintText='Место рождение'
                    onChange={this.handleChange}
                    className='input-passenger'
                    value={this.state.birthPlace}
                    errorText={(this.state.validation.indexOf('birthPlace') >= 0) ? ' ' : ''}
                    errorStyle={(this.state.validation.indexOf('birthPlace') >= 0) ? selectValidStyle : {}}
                    floatingLabelFocusStyle={(this.state.validation.indexOf('birthPlace') >= 0) ? selectValidStyle : {}}
                />
            </div>
            <div className='passenger-input-wrap'>
                <SelectField
                    floatingLabelText='Гражданство'
                    className='input-passenger'
                    name='citizenship'
                    onChange={(evt, index) =>this.handleChangeSelect(evt, index, citizenship.citizenship[index], 'citizenship')}
                    value={this.state.citizenship}
                    errorText={(this.state.validation.indexOf('citizenship') >= 0) ? ' ' : ''}
                    errorStyle={(this.state.validation.indexOf('citizenship') >= 0) ? selectValidStyle : {}}
                >
                    {citizenshipOut}
                </SelectField>
            </div>
            <div className='passenger-input-wrap'>
                <SelectField
                    floatingLabelText='Тип документа'
                    className='input-passenger'
                    name='documentType'
                    onChange={(evt, index, val) =>this.handleChangeSelect(evt, index, val, 'documentType')}
                    value={this.state.documentType}
                    errorText={(this.state.validation.indexOf('documentType') >= 0) ? ' ' : ''}
                    errorStyle={(this.state.validation.indexOf('documentType') >= 0) ? selectValidStyle : {}}
                >
                    <MenuItem value={'Undefined'} primaryText='не выбран' />
                    <MenuItem value={'Passport'} primaryText='Паспорт РФ' />
                    <MenuItem value={'InternationalPassport'} primaryText='Заграничный паспорт' />
                    <MenuItem value={'CertificateOfBirth'} primaryText='Свидетельство о рождении' />
                    <MenuItem value={'MilitaryCard'} primaryText='Военный билет' />
                    <MenuItem value={'ForeignDocument'} primaryText='Паспорт иностранного гражданина' />
                    <MenuItem value={'SailorPassport'} primaryText='Паспорт моряка' />
                </SelectField>
            </div>
            <div className='passenger-input-wrap'>
                <TextField
                    hintText='Серия'
                    onChange={this.handleChange}
                    className='input-passenger'
                    name='documentSeries'
                    value={this.state.documentSeries}
                    errorText={documentSeriesErrorText}
                    errorStyle={documentSeriesErrorStyle}
                    floatingLabelFocusStyle={documentSeriesErrorStyle}
                />
            </div>
            <div className='passenger-input-wrap'>
                <TextField
                    hintText='Номер'
                    name='documentNumber'
                    onChange={this.handleChange}
                    className='input-passenger'
                    value={this.state.documentNumber}
                    errorText={documentNumberErrorText}
                    errorStyle={documentNumberErrorStyle}
                    floatingLabelFocusStyle={documentNumberErrorStyle}
                />
            </div>
            <div className='passenger-input-wrap'>
                <SelectField
                    floatingLabelText='Пол'
                    className='input-passenger'
                    value={this.state.sex}
                    name='sex'
                    onChange={(evt, index, val) =>this.handleChangeSelect(evt, index, val, 'sex')}
                    errorText={(this.state.validation.indexOf('sex') >= 0) ? ' ' : ''}
                    errorStyle={(this.state.validation.indexOf('sex') >= 0) ? selectValidStyle : {}}
                >
                    <MenuItem value={'0'} primaryText='не выбран' />
                    <MenuItem value='Male' primaryText='мужской' />
                    <MenuItem value='Female' primaryText='женский' />
                </SelectField>
            </div>

            <div className='passenger-input-wrap'>
                <SelectField
                    floatingLabelText='Тип билета'
                    className='input-passenger'
                    onChange={this.ticketTypeChange}
                    value={this.state.ticketType}
                    disabled={true}
                    errorText={(this.state.validation.indexOf('ticketType') >= 0) ? ' ' : ''}
                    errorStyle={(this.state.validation.indexOf('ticketType') >= 0) ? selectValidStyle : {}}

                >
                    <MenuItem value={'0'} primaryText='не выбран' />
                    <MenuItem value={'1'} primaryText='взрослый' />
                    <MenuItem value={'2'} primaryText='детский' />
                </SelectField>
            </div>
        </div>
    }
}
