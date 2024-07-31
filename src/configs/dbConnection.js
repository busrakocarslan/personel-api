"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// MongoDB Connection:

const mongoose = require('mongoose')

const dbConnection = function() {
    // Connect:
    mongoose.connect(process.env.MONGODB)
        .then(() => console.log('* DB Connected * '))
        .catch((err) => console.log('* DB Not Connected * ', err))
}

/* ------------------------------------------------------- */
module.exports = {
    mongoose,// mongoose u bırada böyle export ederek ilgili dosyada detsruc ile kullanabiliuorym her seferinde mongoosden require etmeye gerek kalmyıyor bu da bir diğer kullanım yani.
    dbConnection
} 