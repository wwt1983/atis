import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class DialogTemplate extends React.Component {
    state = {
        openDialog: false
    };

    handleOpen = () => {
        this.setState({openDialog: true});
    };

    handleClose = (e, status) => {
        e.preventDefault()
        const {data, method} = this.props;
        if(status && method != undefined && data != undefined){
            method(data);
        }
        else {
            console.log('Данные некорректные')
        }
        this.setState({
            openDialog: false
        })
    }
    render() {
        const {titleDialog, btnDialogCancelTxt,  btnDialogSendTxt, txt , btnLbl} = this.props;
        const actions = [
            <FlatButton
                label={btnDialogCancelTxt}
                primary={true}
                onClick={(e) => this.handleClose(e, false)}
            />,
            <FlatButton
                label= {btnDialogSendTxt}
                primary={true}
                keyboardFocused={true}
                onClick={(e) => this.handleClose(e, true)}
            />
        ];
        return <div>
                <FlatButton label= {btnLbl} secondary={true}  onClick={this.handleOpen}/>
            <Dialog
                title={titleDialog}
                actions={actions}
                modal={false}
                open={this.state.openDialog}
                onRequestClose={(e) => this.handleClose(e)}
            >
                {txt}

            </Dialog>
            </div>
    }
}
