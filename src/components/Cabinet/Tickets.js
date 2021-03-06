import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import './styles.css'
const style = {

    width: 700,
    margin: 'auto',
    textAlign: 'center',
    display: 'inline-block',
    fontSize : '14px',
    lineHeight: '28px',
    color: '#6a6a6a', 
    wordWrap: 'break-word'
  };
export default class Tickets extends Component {

    render() {
        return  <div className='cabinet-wrap'>
                    <Paper style={style} zDepth={1} >
            
                        <h2>Информационное сообщение для землевладельцев.</h2>
                        В настоящее время большинство собственников земельных участков занимают по факту площадь больше, чем предусмотренно правоустанавливающими документами, по этой причине органом исполнительной власти проводятся плановые проверки по вопросу соблюдения требований земельного законодательства. 
                        По факту выявления несоответствия занимаемой площади земельного участка, площади указанной в правоустанавливающих документах органом исполнительной власти (РОСРЕЕСТР) выносится предписание и назначаются штрафные санкции в размере от 5.000 до 10.000 рублей за одну проверку. Штрафы назначаются до момента:
                     - Устранения нарушения (восстановление границ по правоустанавливающим документам)
                     - Оформления правоустанавливающих документов на самовольно занятый земельный участок.
                          Если Вы хотите оформить в собственность земельный участок не принадлежащий Вам по документам, но которым Вы пользуетесь, звоните и записывайтесь на БЕСПЛАТНУЮ консультацию.
                    </Paper>
                </div>
    }
}