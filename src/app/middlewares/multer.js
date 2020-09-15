const multer = require('multer')

//FileName unic Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '.public/images')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now().toString()}-$(file.originalName)`) 
    }
})

const fileFilter = (req, file, cb) => {
    const isAccepted = ['image/png', 'image/jpg', 'image/jpg']
    .find(acceptedFormat => acceptedFormat = file.mimetype)

    if(isAccepted) {
        return cb(null, true); 
    }
    
    return cb(null, false)
}

module.exports = (multer) ({
    Storage,
    fileFilter
})