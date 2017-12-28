import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import '../styles.css'
import DialogTemplate from '../../Common/Dialog'


var valueStatuses = require('../../../utils/statuses')
var common = require('../../../utils/common')

export default class Ticket extends Component {
    componentWillMount(){
        this.state = ({
            open: false,
            anchorOrigin: {
                horizontal: 'left',
                vertical: 'bottom'
            },
            targetOrigin: {
                horizontal: 'left',
                vertical: 'top'
            },
            checkedPay: true
        })
    }


    handleTouchTap = (event) => {
           // This prevents ghost click.
           event.preventDefault();
           this.setState({
             open: true,
             anchorEl: event.currentTarget
           });
         };

    handleRequestClose = () => {
       this.setState({
         open: false
       });
     };


    handleTouchTapClose = (event) => {
           // This prevents ghost click.
           event.preventDefault();
           this.setState({
             open: false
           });
     };

    updateCheckPay() {
        this.setState((oldState) => {
            return {
                checkedPay: !oldState.checkedPay
            };
        });
    }

    setAnchor = (positionElement, position) => {
       const {anchorOrigin} = this.state;
       anchorOrigin[positionElement] = position;

       this.setState({
         anchorOrigin: anchorOrigin
       });
     };

     setTarget = (positionElement, position) => {
       const {targetOrigin} = this.state;
       targetOrigin[positionElement] = position;

       this.setState({
         targetOrigin: targetOrigin
       });
     };

    handleGetPdf = (e, orderId) => {
        e.preventDefault();
        const {getPdf} = this.props;
        getPdf(orderId);
    }

    handleBuy = (e, orderId) => {
        e.preventDefault();

        const { paylerForm } = this.props;
        paylerForm(orderId);
    }

    render() {
        const { dataTicket, visibleStatusReturn, visibleStatusPay , pdf, paylerFrame} = this.props;
        const status = valueStatuses.getTicketStatuses();
        const statusDesc = valueStatuses.getTicketStatusDesc();
        var ReturnForm =  [];
        var PdfBtn = [];
        var BuyBtn = [];

        let PaylerForm = common.checkTxt(paylerFrame, 'iframe') >= 0 ? ( <div className='passenger-form-payler' dangerouslySetInnerHTML={{__html: paylerFrame}} /> ) :
            ( <div className='passenger-form-payler'>{paylerFrame} </div> );

        //кнопка возврата
        if(visibleStatusReturn){
            ReturnForm = <DialogTemplate
                titleDialog ='Вернуть билет'
                btnLbl = 'Возврат'
                btnTxt='Вернуть'
                btnDialogCancelTxt = 'Отменить'
                btnDialogSendTxt = 'Отправить'
                txt = 'Вы действетльно хотите вернуть билет?'
                method = {this.props.returnTicket}
                data = {dataTicket.id}
            />
        }

        //ннопка купить для заброинированных билетов
        if(visibleStatusPay) {
            BuyBtn = (
                <RaisedButton key='btnBuy'
                              label = 'Купить'
                              onClick = {(e) => this.handleBuy(e, dataTicket.orderId)}
                />
            )
        }

        //кнопка полуечения pdf билета
        if(pdf){
            PdfBtn = (
                <RaisedButton key='btnPdf'
                label = 'Билет pdf'
                onClick = {(e) => this.handleGetPdf(e, dataTicket.orderId)}
                />
           )
        }

        return  <div className='ticket-wrap'>
                    <div className='ticket-left-column'>
                        <p><strong>Откуда:</strong></p>
                        <p>{dataTicket.departure}</p>
                        <p><strong>Куда:</strong></p>
                        <p>{dataTicket.arrival}</p>
                        <p><strong>Пассажир:</strong></p>
                        <p>{dataTicket.person.fullName}</p>
                        <p><strong>Отправление:</strong></p>
                        <p>{dataTicket.departureDate}</p>

                        { PaylerForm }

                     </div>
                    <div className='ticket-right-column'>

                        <p><strong>Место:</strong></p>
                        <p>{dataTicket.seatInfo}</p>
                        <p><strong>Тип:</strong></p>
                        <p>{(dataTicket.ticketType == 'Adult') ? 'взрослый' : 'детский'}</p>
                        <p><strong>Цена:</strong></p>
                        <p>{dataTicket.price}</p>
                        <RaisedButton
                            onMouseEnter={this.handleTouchTap}
                            label={statusDesc[dataTicket.state]}
                            className={status[dataTicket.state]+'-ticket-state ticket-status'}
                        />
                        <Popover
                            open={this.state.open}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={this.state.anchorOrigin}
                            targetOrigin={this.state.targetOrigin}
                            onRequestClose={this.handleRequestClose}
                        >
                            <p className='status-text'>{valueStatuses.getTicketStatusInfo(dataTicket.state)}</p>
                        </Popover>

                        { ReturnForm }
                        { BuyBtn }
                        { PdfBtn }

                    </div>
                </div>
    }
}


