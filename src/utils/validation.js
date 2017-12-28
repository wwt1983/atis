module.exports = {
    ValidationUserSettings: function(type,body) {
        const models = {
            cabinet: [
                {key: 'name', fieldType: 'str'},
                {key: 'email', fieldType: 'str'},
                {key: 'phoneError', fieldType: 'phone'},
                {key: 'password', fieldType: 'str'},
                {key: 'newPassword', fieldType: 'str'}
            ]
        }

        let result = []
        let model = models[type]

        for(let i of model) {
            switch(i.fieldType) {
                case 'arr':
                    if(!body[i.key] || body[i.key].length === 0) {
                        result.push(i.key)
                    }
                    break
                case 'str':
                    if(!body[i.key] || body[i.key] === '') {
                        result.push(i.key)
                    }
                    break
                case 'phone':
                    if(body[i.key]) {
                        result.push(i.key)
                    }
                    break
            }
        }
        return result
    },
    ValidationPasseengerSettingsReverse: function(type,body) {
        const models = {
            cabinet: [
                {key: 'birthDate', fieldType: 'data'},
                {key: 'birthPlace', fieldType: 'str'},
                {key: 'documentType', fieldType: 'select'},
                {key: 'documentSeries', fieldType: 'str'},
                {key: 'documentNumber', fieldType: 'str'},
                {key: 'sex', fieldType: 'select'},
                {key: 'citizenship', fieldType: 'str'},
                {key: 'ticketType', fieldType: 'select'},
                {key: 'fullName', fieldType: 'str'}
            ],
            flow: [
                {key: 'birthDate', fieldType: 'data'},
                {key: 'birthPlace', fieldType: 'str'},
                {key: 'documentType', fieldType: 'select'},
                {key: 'documentSeries', fieldType: 'str'},
                {key: 'documentNumber', fieldType: 'str'},
                {key: 'sex', fieldType: 'select'},
                {key: 'citizenship', fieldType: 'str'},
                {key: 'fullName', fieldType: 'str'}
            ]
        }
        let result = []
        let model = models[type]

        for(let i of model) {
            switch(i.fieldType) {
                case 'arr':
                    if(!body[i.key] || body[i.key].length === 0) {
                        result.push(i.key)
                    }
                    break
                case 'str':
                    if(body[i.key] && body[i.key].length != 0) {
                        if (i.key == 'documentSeries'){
                            if (body['documentType'] != 'Undefined'){
                                if (body['documentType'] == 'Passport'){
                                    if (body[i.key].length == 4 ){
                                        result.push('documentSeries')
                                    }
                                }
                                if (body['documentType'] == 'InternationalPassport'){
                                    if (body[i.key].length == 2 ){
                                        result.push('documentSeries')
                                    }
                                }
                                if (body['documentType'] == 'CertificateOfBirth'){
                                    if (body[i.key].length >= 3 ){
                                        result.push('documentSeries')
                                    }
                                }
                                if (body['documentType'] == 'MilitaryCard'){
                                    if (body[i.key].length == 2 ){
                                        result.push('documentSeries')
                                    }
                                }
                                if (body['documentType'] == 'ForeignDocument'){
                                    if (body[i.key].length > 0 ){
                                        result.push('documentSeries')
                                    }
                                }
                                if (body['documentType'] == 'SailorPassport'){
                                    if (body[i.key].length > 0 ){
                                        result.push('documentSeries')
                                    }
                                }
                            }else{
                                result.push('documentSeriesInvalidType')
                            }
                        }else if (i.key == 'documentNumber'){
                            if (body['documentType'] != 'Undefined'){
                                if (body['documentType'] == 'Passport'){
                                    if (body[i.key].length == 6 ){
                                        result.push('documentNumber')
                                    }
                                }
                                if (body['documentType'] == 'InternationalPassport'){
                                    if (body[i.key].length == 7 ){
                                        result.push('documentNumber')
                                    }
                                }
                                if (body['documentType'] == 'CertificateOfBirth'){
                                    if (body[i.key].length == 6 ){
                                        result.push('documentNumber')
                                    }
                                }
                                if (body['documentType'] == 'MilitaryCard'){
                                    if (body[i.key].length == 7 ){
                                        result.push('documentNumber')
                                    }
                                }
                                if (body['documentType'] == 'ForeignDocument'){
                                    if (body[i.key].length > 0 ){
                                        result.push('documentNumber')
                                    }
                                }
                                if (body['documentType'] == 'SailorPassport'){
                                    if (body[i.key].length > 0 ){
                                        result.push('documentNumber')
                                    }
                                }
                            }else{
                                result.push('documentNumberInvalidType')
                            }
                        }else if (i.key == 'fullName'){
                            var fname = body[i.key].split(' ')
                            if (fname[0] && fname[1] && fname[2]){
                                if ((fname[0].replace(/\s*/g,'')).length != 0 && (fname[1].replace(/\s*/g,'')).length != 0 && (fname[2].replace(/\s*/g,'')).length != 0){
                                    if (fname[2] == '-' || fname[2]){
                                        result.push('fullName')
                                    }
                                }
                            }
                        }else {
                            if (body[i.key].length > 2){
                                result.push(i.key)
                            }
                        }
                    }
                    break
                case 'select':
                    if(body[i.key] !== '0' && body[i.key] !== 'Undefined' ) {
                        result.push(i.key)
                    }
                    break
                case 'data':
                    if(new Date(body[i.key]) !== 'Invalid Date' && (new Date(body[i.key])).toDateString() !== (new Date()).toDateString()) {
                        result.push(i.key)
                    }
                    break
            }
        }
        return result
    },

    ValidationPasseengerSettings: function(type,body) {
        console.log(body);
        const models = {
            cabinet: [
                {key: 'birthDate', fieldType: 'data'},
                {key: 'birthPlace', fieldType: 'str'},
                {key: 'documentType', fieldType: 'select'},
                {key: 'documentSeries', fieldType: 'str'},
                {key: 'documentNumber', fieldType: 'str'},
                {key: 'sex', fieldType: 'select'},
                {key: 'citizenship', fieldType: 'str'},
                {key: 'ticketType', fieldType: 'select'},
                {key: 'fullName', fieldType: 'str'}
            ],
            flow: [
                {key: 'birthDate', fieldType: 'data'},
                {key: 'birthPlace', fieldType: 'str'},
                {key: 'documentType', fieldType: 'select'},
                {key: 'documentSeries', fieldType: 'str'},
                {key: 'documentNumber', fieldType: 'str'},
                {key: 'sex', fieldType: 'select'},
                {key: 'citizenship', fieldType: 'str'},
                {key: 'ticketType', fieldType: 'select'},
                {key: 'fullName', fieldType: 'str'}
            ]
        }

        let result = []
        let model = models[type]

        for(let i of model) {
            switch(i.fieldType) {
                case 'arr':
                    if(!body[i.key] || body[i.key].length === 0) {
                        result.push(i.key)
                    }
                    break
                case 'str':
                    if(!body[i.key] || body[i.key] === '') {
                        result.push(i.key)
                    }else{
                        if (i.key == 'fullName'){
                            var fname = body[i.key].split(' ')

                            if(fname.length != 3 && (fname[2] && (fname[2].length != 0) || fname[2] != '-')) {
                                if (fname[2] && (fname[2].length == 0) || fname[2] != '-'){
                                    result.push('fullNameInvalidLength')
                                }else if (fname[0] && fname[0].length == 0) {
                                    result.push('fullNameInvalidLength')
                                }else if (fname[1] && fname[1].length == 0) {
                                    result.push('fullNameInvalidLength')
                                }
                            }
                        }
                        if (i.key == 'documentSeries'){
                            if (body['documentType'] != 'Undefined'){
                                if (body['documentType'] == 'Passport'){
                                    if (body[i.key].length != 4 ){
                                        result.push('documentSeriesInvalidLength')
                                    }
                                }
                                if (body['documentType'] == 'InternationalPassport'){
                                    if (body[i.key].length != 2 ){
                                        result.push('documentSeriesInvalidLength')
                                    }
                                }
                                if (body['documentType'] == 'CertificateOfBirth'){
                                    if (body[i.key].length < 3 ){
                                        result.push('documentSeriesInvalidLength')
                                    }
                                }
                                if (body['documentType'] == 'MilitaryCard'){
                                    if (body[i.key].length != 2 ){
                                        result.push('documentSeriesInvalidLength')
                                    }
                                }
                                if (body['documentType'] == 'ForeignDocument'){
                                    if (body[i.key].length <= 0 ){
                                        result.push('documentSeriesInvalidLength')
                                    }
                                }
                                if (body['documentType'] == 'SailorPassport'){
                                    if (body[i.key].length <= 0 ){
                                        result.push('documentSeriesInvalidLength')
                                    }
                                }
                            }else{
                                result.push('documentSeriesInvalidType')
                            }
                        }
                        if (i.key == 'documentNumber'){
                            if (body['documentType'] != 'Undefined'){
                                if (body['documentType'] == 'Passport'){
                                    if (body[i.key].length != 6 ){
                                        result.push('documentNumberInvalidLength')
                                    }
                                }
                                if (body['documentType'] == 'InternationalPassport'){
                                    if (body[i.key].length != 7 ){
                                        result.push('documentNumberInvalidLength')
                                    }
                                }
                                if (body['documentType'] == 'CertificateOfBirth'){
                                    if (body[i.key].length != 6 ){
                                        result.push('documentNumberInvalidLength')
                                    }
                                }
                                if (body['documentType'] == 'MilitaryCard'){
                                    if (body[i.key].length != 7 ){
                                        result.push('documentNumberInvalidLength')
                                    }
                                }
                                if (body['documentType'] == 'ForeignDocument'){
                                    if (body[i.key].length <= 0 ){
                                        result.push('documentNumberInvalidLength')
                                    }
                                }
                                if (body['documentType'] == 'SailorPassport'){
                                    if (body[i.key].length <= 0 ){
                                        result.push('documentNumberInvalidLength')
                                    }
                                }
                            }else{
                                result.push('documentNumberInvalidType')
                            }
                        }
                    }

                    break
                case 'phone':
                    if(body[i.key]) {
                        result.push(i.key)
                    }
                    break
                case 'select':
                    if(body[i.key] === '0' || body[i.key] === 'Undefined') {
                        result.push(i.key)
                    }
                    break
                case 'data':
                    if(new Date(body[i.key]) == 'Invalid Date') {
                        result.push(i.key)
                    }
                    break
            }
        }
        return result
    }
}
