module.exports = {
    priceFormatter: (price) => {
        price = price.toString()
        return (price.length > 3) ? price.slice(0, (price.length - 3))+' '+price.slice(-3) : price
    },
    sumWithPromo : (promoCode, resultSumm) => {
        if (promoCode.markupType == 'Amount') {
            let discount = resultSumm - parseInt(promoCode.markup);
            resultSumm = discount < 0 ? 0 : discount
        } else {
            let discount = resultSumm * parseInt(promoCode.markup) / 100;
            resultSumm = discount < 0 ? 0 : parseInt(resultSumm - discount)
        }
        console.log('pay ' + resultSumm)
        return resultSumm;
    },
    sumToPayFull : (passengerArray) =>  {
        let resultSumm = 0;
        for(var s in passengerArray) {
            resultSumm = resultSumm + parseInt(passengerArray[s].ticketPrice)
        }
        return resultSumm;
    },
    lblBalanceText : (balance) => {
        return 'Списать с лицевого счета (доступно ' + balance + ' км.)';
    },
    sumToPayWithAccountMoney : (balance, resultSumm) => {
        return balance > resultSumm ? resultSumm : resultSumm - balance;
    },
    sumWithAccount : (resultSumm, balance, isAccount) => {
        let summ = 0;
        if(isAccount && resultSumm > 0 && balance > 0) {
            summ =  resultSumm > balance ? resultSumm - balance : 0;
        } else {
            summ = resultSumm;
        }
        //console.log('summ ' + summ)
        return summ;
    },
    checkTxt(val, search) {
        if(val === undefined || val.length === 0 || search === undefined) return -1;
        return val.indexOf(search)
    },
    getSwalData: (type, titleTxt, btnTxt, txt) => {
        switch (type) {
            case 'action':
                return {
                    title: titleTxt,
                    padding: 50,
                    html: '<span className="custom-dialog_html-color">' + txt + '</span>',
                    showCancelButton: true,
                    confirmButtonText: btnTxt,
                    cancelButtonText: 'отмена',
                    confirmButtonClass: 'custom-dialog_btn custom-dialog_btn-small custom-dialog_action',
                    cancelButtonClass: 'custom-dialog_btn custom-dialog_btn-small custom-dialog_cancellable',
                    buttonsStyling: false,
                    customClass: 'custom-dialog'
                };
            case 'deletable':
                return {
                    title: 'Вы уверены?',
                    padding: 50,
                    html: '<span className="custom-dialog_html-color">' + txt + '</span>',
                    showCancelButton: true,
                    confirmButtonText: 'удалить',
                    cancelButtonText: 'отмена',
                    confirmButtonClass: 'custom-dialog_btn custom-dialog_btn-small custom-dialog_confirm',
                    cancelButtonClass: 'custom-dialog_btn custom-dialog_btn-small custom-dialog_cancellable',
                    buttonsStyling: false,
                    customClass: 'custom-dialog'
                }
            case 'info':
                return {
                    title: titleTxt,
                    padding: 50,
                    html: '<span className="custom-dialog_html-color">' + txt + '</span>',
                    confirmButtonText: btnTxt,
                    confirmButtonClass: 'custom-dialog_btn custom-dialog_info',
                    buttonsStyling: false,
                    customClass: 'custom-dialog'
                }
        }
    }
}
