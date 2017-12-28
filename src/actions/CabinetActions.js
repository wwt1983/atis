const axios = require('axios')
var moment = require('moment')

function getSession(){
    return  localStorage.getItem('__tb_client_key')
}

function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('__tb_api_key'),
        'X-Session': getSession()
    }
}


export function getAccountTickets() {
    return async (dispatch) => {
       return dispatch((getTickets ()))
    }
}

export function getAccountPassenger() {
    return async (dispatch) => {
        dispatch({
            type: 'FETCHING_ACCOUNT_PASSENGER'
        })
        try {
            var persons = await axios.get(process.env.BASE_URL +  '/api/v1/account/persons', { headers: getHeaders() })
            if (persons.data.data) {
                dispatch({
                    type: 'LOADED_ACCOUNT_PASSENGER',
                    payload: persons.data.data
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export function addPassenger(passengerForm) {
    return async (dispatch) => {
        dispatch({
            type: 'CREATING_ACCOUNT_PASSENGER'
        })

        var need_times_offset = moment(passengerForm.birthDate).utcOffset()
        var need_times_offset_result = need_times_offset / 60
        var need_times_result = {};
        if (Math.sign(need_times_offset_result) == 1) {
            need_times_result = moment(passengerForm.birthDate).add(need_times_offset_result, 'h');
        } else if (Math.sign(need_times_offset_result) == 0) {
            need_times_result = moment(passengerForm.birthDate);
        } else {
            need_times_result = moment(passengerForm.person.birthDate).subtract(Math.abs(need_times_offset_result), 'h');
        }
        passengerForm.birthDate = moment(need_times_result).utc().format()
        var splitValue = passengerForm.fullName.split(' ');
        passengerForm.firstName = (splitValue && splitValue[1]) ? splitValue[1] : '',
            passengerForm.middleName = (splitValue && splitValue[2]) ? splitValue[2] : '',
            passengerForm.lastName = (splitValue && splitValue[0]) ? splitValue[0] : ''
        try {
            var addPassenger = await axios.post(process.env.BASE_URL + '/api/v1/account/person/create', passengerForm, { headers: getHeaders() });
            if (addPassenger.data) {
                dispatch({
                    type: 'CREATED_ACCOUNT_PASSENGER',
                    payload: addPassenger.data
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export function updatePassenger(passengerForm) {
    return async (dispatch) => {
        dispatch({
            type: 'UPDATING_ACCOUNT_PASSENGER'
        })


        var need_times_offset = moment(passengerForm.birthDate).utcOffset()
        var need_times_offset_result = need_times_offset / 60
        var need_times_result = {};
        if (Math.sign(need_times_offset_result) == 1) {
            need_times_result = moment(passengerForm.birthDate).add(need_times_offset_result, 'h');
        } else if (Math.sign(need_times_offset_result) == 0) {
            need_times_result = moment(passengerForm.birthDate);
        } else {
            need_times_result = moment(passengerForm.person.birthDate).subtract(Math.abs(need_times_offset_result), 'h');
        }
        passengerForm.birthDate = moment(need_times_result).utc().format()


        var splitValue = passengerForm.fullName.split(' ');
        passengerForm.firstName = (splitValue && splitValue[1]) ? splitValue[1] : '',
            passengerForm.middleName = (splitValue && splitValue[2]) ? splitValue[2] : '',
            passengerForm.lastName = (splitValue && splitValue[0]) ? splitValue[0] : ''
        try {
            var addPassenger = await axios.post(process.env.BASE_URL + '/api/v1/account/person/update', passengerForm, { headers: getHeaders() });
            if (addPassenger.data) {
                dispatch({
                    type: 'UPDATED_ACCOUNT_PASSENGER',
                    payload: addPassenger.data
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export function deletePassenger(passengerForm) {
    return async (dispatch) => {
        dispatch({
            type: 'DELITING_ACCOUNT_PASSENGER'
        })
        try {
            var deletePassenger = await axios.post(process.env.BASE_URL + '/api/v1/account/person/delete/' + passengerForm.id, {}, { headers: getHeaders() });
            console.log(deletePassenger)
            if (deletePassenger.data.errors.length == 0) {
                dispatch({
                    type: 'DELETED_ACCOUNT_PASSENGER',
                    payload: passengerForm.id
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export function saveAccountSettings(userDetail) {
    return async (dispatch) => {
        dispatch({
            type: 'UPDATING_ACCOUNT_SETTINGS'
        })

        var userDetailResult = {
            vkId: userDetail.vkId,
            vkName: userDetail.vkName,
            fbId: userDetail.fbId,
            fbName: userDetail.fbName,
            name: userDetail.name,
            phone: userDetail.phone
        }

        try {
            var accountSettings = await axios.post(process.env.BASE_URL + '/api/v1/account/update', userDetailResult, { headers: getHeaders() })
            console.log(accountSettings);
            if (accountSettings.data) {
                dispatch({
                    type: 'UPDATED_ACCOUNT_SETTINGS',
                    payload: accountSettings.data
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export function getAccountBalance(id) {
    return async (dispatch) => {
        dispatch({
            type: 'FETCHING_ACCOUNT_BALANCE'
        })

        try {
            var balance = await axios.get(process.env.BASE_URL + '/api/v1/account/balance?id=' + id, { headers: getHeaders() });
            console.log(balance);
            if (balance.data.data || balance.data.data == 0) {
                dispatch({
                    type: 'LOADED_ACCOUNT_BALANCE',
                    payload: balance.data.data
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export function socialAutorization(data, types) {
    return async (dispatch) => {
        dispatch({
            type: 'FETCHING_SOCIAL_ACCOUNT'
        })

        try {
            console.log(data)
            if (data) {
                dispatch({
                    type: 'LOADED_SOCIAL_ACCOUNT',
                    payload: data,
                    types: types
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export function returnTicket(ticketId) {
    if (!ticketId) return;

    return async (dispatch) => {
        dispatch({
            type: 'FETCHING_RETURN_TICKET'
        });
        try {
            let result = await axios.post(process.env.BASE_URL + '/api/v1/ticket/return/' + ticketId, {}, { headers: getHeaders() });
            console.log('return result=' + ticketId + ' ' + JSON.stringify(result) )
            if(result.data){
                dispatch({
                    type: 'FETCHED_RETURN_TICKET'
                })

                dispatch({
                    type: 'FETCHING_ACCOUNT_TICKETS'
                })

                return dispatch(getTickets());
            }else {
                dispatch({
                    type: 'FETCHED_WRONG__RETURN_TICKET'
                })
            }
        }
        catch (e) {
            console.log(e.message)
        }
    }
}

function getTickets () {
    return async dispatch => {
        try {
            dispatch({
                type: 'FETCHING_ACCOUNT_TICKETS'
            })
            let tickets = await axios.get(process.env.BASE_URL + '/api/v1/account/tickets', { headers: getHeaders() });
            if (tickets.data.data) {
                dispatch({
                    type: 'FETCHED_ACCOUNT_TICKETS',
                    payload: tickets.data.data
                });
            } else if(tickets.data.errors.length > 0) {
                dispatch({
                    type: 'FETCHED_WRONG_ACCOUNT_TICKETS',
                    payload : tickets.data.errors[0].description
                })
            }
        }catch (e) {
            dispatch({
                type: 'FETCHED_WRONG_ACCOUNT_TICKETS'
            })
            console.log('error ' + e.message)
        }
    }
}

export function getPaylerForm(orderId) {
    return async  dispatch => {
        dispatch({
            type: 'FETCHING_PAYLER_FORM'
        })
        try {
                let result = await axios.get(process.env.BASE_URL + process.env.PAYLERFORM + orderId, { headers: getHeaders() });
                if (result.data) {
                    dispatch({
                        type: 'FETCHED_PAYLER_FORM',
                        payload: result.data.data
                    })
                } else {
                    dispatch({
                        type: 'FETCHED_WRONG__PAYLER_FORM',
                        payload : result.data.errors[0]
                    })
                }
        }
        catch (e) {
            console.log('error getPaylerForms' + e.message)
        }
    }
}

export function getPdf(orderId) {
    return  (dispatch) => {
        dispatch({
            type: 'FETCHING_PDF'
        });

        try {
            pdf(orderId );
        } catch (err) {
            Error(err, getPdf.name, new Array(orderId))
            if (err && err.response) {
                switch (err.response.status) {
                    case 401:
                        dispatch({
                            type: 'TOKEN_FAILED'
                        })
                        break
                    default:
                        dispatch({
                            type: 'FETCHED_WRONG_PDF'
                        })
                        return err
                }
            }
        }
    }
}

function pdf(orderId) {
    return axios.get(process.env.BASE_URL +  process.env.GETPDF +  orderId,  {
        headers: {
            'responseType': 'arraybuffer',
            'content-type': 'application/octet-stream',
            'Authorization': 'Bearer ' + localStorage.getItem('__tb_api_key')
        }
    }).then(result => {
        if (result.status >= 200 && result.status < 300) {
            var binary = window.atob(result.data.replace(/\s/g, ''));
            var len = binary.length;
            var buffer = new ArrayBuffer(len);
            var view = new Uint8Array(buffer);
            for (var i = 0; i < len; i++) {
                view[i] = binary.charCodeAt(i);
            }
            var blob = new Blob([view], {type: 'application/pdf'});
            // var url = URL.createObjectURL(blob);
            // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            //     window.navigator.msSaveOrOpenBlob(blob);
            //     return;
            // }
            const data = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = data;
            link.target = '_blank';
            // link.download='file.pdf';
            link.click();
            // window.open(url)
            // window.URL.revokeObjectURL(url);

            // window.location.assign(url, '_blank');
            // window.open(url, '_blank');
        }
    });
}



//Метод получения формы пелера для всех забронированных билетов. может пригодиться
/*
function getPaylerForms(tickets) {
    return async  dispatch => {
        dispatch({
            type: 'FETCHING_PAYLER_FORM'
        })
        try {
                let paylersPromises = [];
                tickets.forEach(function (ticket) {
                    let result = axios.get(process.env.BASE_URL + process.env.PAYLERFORM + ticket.orderId, { headers: getHeaders() });
                    paylersPromises.push(result)
                });

                Promise.all(paylersPromises).then((response) => {
                    let paylersForms = [];
                    for (let i = 0; i < tickets.length; i++) {
                        paylersForms.push({
                            orderId: tickets[i].orderId,
                            frame: response[i].data.data
                        });
                    }

                    if (paylersForms) {
                        dispatch({
                            type: 'FETCHED_PAYLER_FORM',
                            payload: paylersForms
                        })
                    } else {
                        dispatch({
                            type: 'FETCHED_WRONG__PAYLER_FORM'
                        })
                    }
                });
               dispatch({
                        type: 'FETCHED_PAYLER_FORM',
                        payload: []
                    })
        }
        catch (e) {
            console.log('error getPaylerForms' + e.message)
        }
    }
}
*/


function Error(err , methodName, params) {
    let data = '';
    params.forEach(function(entry) {
        data += JSON.stringify(entry) + ' ; ';
    });
    //Rollbar.error(err + ' \\nmethod : ' + methodName + ' \\nparams : ' + data);
}
