const input = document.querySelector('input[name="price"]')
input.addEventListener('keydown', function (e) {
  let { value } = e.target

  value = value.replace(/\D/g, '')

  value = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }).format(value / 100)

  e.target.value = value
}, 1)
