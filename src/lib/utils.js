module.exports = {
  age (timestamp) {
    // Utilizando lógica de idade: 11-12 = 1, 11-1- = + 1;
    const today = new Date()
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()

    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
      age = age - 1
    }

    return age
  },

  date (timestamp) {
    const date = new Date(timestamp)

    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.slice(-2) // retorna a data ao contrario
    const day = `0${date.getDate()}`.slice(-2)
    const hour = date.getHours()
    const minutes = date.getMinutes()

    return {
      day,
      month,
      year,
      hour,
      minutes,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`
    }
  },
  formatPrice (price) {
    return new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }).format(price / 100)
  },
  formatCpfCnpj(value) {
    value = value.replace(/\D/g, "")
      if (value.length > 14) 
        value.slice(0, -1)

     if (value.length > 11) { //cnpj
        value = value.slice(0, -1)

        value = value.replace(/(\d{2})(\d)/, "$1.$2")
        value = value.replace(/(\d{3})(\d)/, "$1.$2")
        value = value.replace(/(\d{3})(\d)/, "$1/$2")
        value = value.replace(/(\d{4})(\d)/, "$1-$2")
      
      } else { //cpf
        value = value.replace(/(\d{3})(\d)/, "$1.$2")
        value = value.replace(/(\d{3})(\d)/, "$1.$2")
        value = value.replace(/(\d{3})(\d)/, "$1.$2")
        value = value.replace(/(\d{3})(\d)/, "$1-$2")
    }

    return value

  },
  formatCep(value) {
    value = value.replace(/\D/g, "")
    if(value.length > 8 ) 
      value = value.slice(0, -1)
      
    value = value.replace(/(\d{5})(\d)/, "$1-$2")
    return value
  }
}
