"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Token = require('../models/token.model')

module.exports = async (req, res, next) => {

    req.user = null;//herhangi bir yanlışlıkta burası dönecek
     //? piyasada görülebilecek haller
    // Authorization: Token ...tokenKey...
    // Authorization: ApiKey ...tokenKey...
    // Authorization: Bearer ...tokenKey...
    // Authorization: Auth ...tokenKey...
    // Authorization: X-API-KEY ...tokenKey...
    // Authorization: x-auth-token ...tokenKey...

    // Get Token from Headers:
    const auth = req.headers?.authorization || null // Token ...tokenKey...
    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...']

    if (tokenKey && tokenKey[0] == 'Token') {

        const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('userId')//? bana sadece token yetmez token dan o kullanıcıya ulaşmalıyım populeta  sayesinde model vb çağırmadan user bilgilerine userId üzerinden ulaşabiliyorum.
        // console.log(tokenData)
        if (tokenData) req.user = tokenData.userId// her şey yolundaysa çalışacak yani token data varsa ve doğruysa req.user değişkenin de user datası olacak  burada bu atamayı yaparak diyoruz ki artık kullanıcıyı ben ona verdiğim tokenla hatırlarım token varsa var yoksa yok. Eğilse üste atadığım gibi req.user null gelir!

    }
    // console.log(req.user)

    next()
}

