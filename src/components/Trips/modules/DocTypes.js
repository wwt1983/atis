import React from 'react';
import MenuItem from 'material-ui/MenuItem'


module.exports.createTypeDocs = function (place, availableDocumentTypes) {
        let MenuItems = [];
        if (availableDocumentTypes.length == 0) {
            MenuItems.push(<MenuItem value={'Undefined_' + place} primaryText='не выбран' key={'Undefined_' + place}/>)
            MenuItems.push(<MenuItem value={'Passport_' + place} primaryText='Паспорт РФ' key={'Passport_' + place}/>)
            MenuItems.push(<MenuItem value={'InternationalPassport_' + place} primaryText='Заграничный паспорт'
                                     key={'InternationalPassport_' + place}/>)
            MenuItems.push(<MenuItem value={'CertificateOfBirth_' + place} primaryText='Свидетельство о рождении'
                                     key={'CertificateOfBirth_' + place}/>)
            MenuItems.push(<MenuItem value={'MilitaryCard_' + place} primaryText='Военный билет'
                                     key={'MilitaryCard_' + place}/>)
            MenuItems.push(<MenuItem value={'ForeignDocument_' + place} primaryText='Паспорт иностранного гражданина'
                                     key={'ForeignDocument_' + place}/>)
            MenuItems.push(<MenuItem value={'SailorPassport_' + place} primaryText='Паспорт моряка'
                                     key={'SailorPassport_' + place}/>)
        } else {
            for (let i in availableDocumentTypes) {
                MenuItems.push(<MenuItem value={availableDocumentTypes[i].code + '_' + place}
                                         primaryText={availableDocumentTypes[i].description}
                                         key={availableDocumentTypes[i].code + '_' + place}/>)
            }
        }
        return MenuItems;
}

