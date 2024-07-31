"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection"); //db connection da monngose u orada require edip export ettiğimizden burada direk mongoose dan değil dbConnection dosyamızdaki exporttan destruc ile çekiyoruz.
/* ------------------------------------------------------- */


/* ------------------------------------------------------- *
{
    "userId": "66a13e516d7779078d0458e8",
    "token": "random-chars-to-here"
}
/* ------------------------------------------------------- */
// Token Model:

const TokenSchema = new mongoose.Schema({

    userId: {//foreingkey
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Personnel',
        required: true,
        index: true// hızlı ualaşabilmek için ekleniyor
    },

    token: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true// hızlı ualaşabilmek için ekleniyor
    }

}, {

    collection: 'tokens',
    timestamps: true

})

/* ------------------------------------------------------- */
module.exports = mongoose.model('Token', TokenSchema)








/* ------------------------------------------------------- */
