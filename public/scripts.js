const Mask = {
  apply(input, func) {
    setTimeout(function () {
      input.value = Mask[func](input.value)
    }, 1)
  },
  formatBRL(value) {
    value = value.replace(/\D/g, "")

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value / 100)
  }
}

const PhotosUpload = {
  preview: document.querySelector('#photos-preview'),
  uploadLimit: 6,
  handleFileInput(event) {
    const { files: fileList } = event.target

    if (PhotosUpload.hasLimit(event)) return 

      Array.from(fileList).forEach(file => {
        const reader = new FileReader()

          reader.onload = () => {
            const image = new Image()
            image.src = String(reader.result)

            const div = PhotosUpload.getContainer(image)
            PhotosUpload.preview.appendChild(div)
          }

          reader.readAsDataURL(file)
      })
  },
  
  hasLimit(event) {
    const { uploadLimit } = PhotosUpload
    const { files: fileList} = event.target

    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos`)
      event.preventDefault()
      return true
    }
     return false
  },
  getContainer(image) {
    const div = document.createElement('div')
    div.classList.add('photo')

    div.onClick = () => alert('remover foto')

    div.appendChild(image)

    div.appendChild(PhotosUpload.getRemoveButton())

    return div
  },
  getRemoveButton() {
    const button = document.createElement('i')
    button.classList.add('material-icons')
    button.innerHTML= "close"
    return button 
  }
}