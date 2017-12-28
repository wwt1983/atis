module.exports = {
    addAccountPassenger: (list, payload) => {
        let arrayPassenger = list.map((person) => {
            return person
        })
        arrayPassenger.push(payload)
        return arrayPassenger
    },
    updatedAccountPassenger: (list, payload) => {
        return list.map((person) =>{
            if (person.id == payload.id){
                return payload
            }else{
                return person
            }
        })
    },
    deleteAccountPassenger: (list, payload) => {
        return list.filter((person) =>{
            if(person.id !== payload) {
                return person
            }
        })
    }
}
