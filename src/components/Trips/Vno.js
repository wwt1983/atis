import React, { Component } from 'react'
import './styles.css'
import {
    Step,
    Stepper,
    StepLabel
} from 'material-ui/Stepper';



export default class Vno extends Component {
    render() {
        const contentStyle = { margin: '0 16px' };

        return <div className='route-page' style = {{marginTop: '100', marginLeft: 'auto', marginRight: 'auto'}}>
        <div className='route-page__body'>
            <div className='container flex-container'>
                <div className='route-page__body-main' style = {{marginLeft: 'auto', marginRight: 'auto'}}>
    
                <h2>В каких случаях мы можем Вам помочь?</h2>
                <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
                    <Stepper activeStep={5} orientation={'vertical'}>
                        <Step>
                            <StepLabel>Получили уведомление о расторжении договора аренды земельного участка для размещения торгового павильона?</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Ваш торговый павильон сносят с места его размещения?</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Хотите продлить договорные отношения по размещению торгового павильона?</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Хотите оформить место под торговый павильон?</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Хотите поставить торговый павильон?</StepLabel>
                        </Step>
                    </Stepper>
                    <div style={contentStyle}>
                    </div>
                </div>
                <div style={{width: '80%', color: '#6a6a6a', lineHeight: '1.4', wordWrap: 'break-word'}}>
                    Временные нестационарные  объекты на территории г.Челябинска возводятся в соответствии с утвержденными эскизными (типовыми) проектами с дальнейшим получением акта соответствия. Площади ВНО согласно типовым эскизным проектам составляют (кв.м.) : киоски - 4, 6, павильоны - 12, 20, 50, 100, торгово-остановочные комплексы - 36, 70. Средний срок возведения ВНО составляет два месяца.<br/>
  Наша компания занимается подбором и оформлением мест для размещения нестационарных (некапитальных) объектов, а так же возведением указанных объектов с последующим получением акта соответствия. <br/>При заключении договора на оказание услуг - бесплатное сопровождение (представление интересов) на аукционе.

      </div>
       
                </div>
            </div>
        </div>
    </div>
           
    }
}