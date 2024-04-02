const multer = require("multer")

const upload  = multer ({
    storage: multer.diskStorage ({
        destination: function (req, file, callback){
            callback(null, "C:/xampp/htdocs/project/img/")
        },
    filename: function (req, file, callback){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        callback(null, file.fieldname + '-' + uniqueSuffix)
    },

    }),
    limits:{
        fileSize : (1024 * 1024) * 3
    },
    fileFilter: function (req, file, callback){
        if (file.mimetype !== "image/png" && file.mimetype !== "image/jpg" && file.mimetype  !== "image/jpeg"){
            callback(null, false)
        }else{
            callback (null, true)
        }
        
    }


})

module.exports = {
    upload
}