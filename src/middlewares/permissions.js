"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// Permission Control Middleware:

module.exports = {
// önce login mi ona bakıyoruz.Bunu hangi rootera koymulsam kullanıcı login ise erişebilecek. 
    isLogin: (req, res, next) => {

        if (req.user && req.user.isActive) {

            next()

        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login.')
        }
    },
// bazen de admin olması gereken yerler olabilir.Ör.silmek gibi
    isAdmin: (req, res, next) => {

        if (req.user && req.user.isActive && req.user.isAdmin) {

            next()

        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Admin.')
        }

    },
//Lead departmana ait olduğundan önce departman kontrolu yapılıyor.Birde admin tam yetkili olduğundan burada admin de olsa yetkili olacağından onu da sorguluyoruz. 
    isAdminOrLead: (req, res, next) => {

        const departmentId = req.params?.id

        // if (req.user && req.user.isActive && (req.user.isAdmin || req.user.isLead)) {
        if (req.user && req.user.isActive && (req.user.isAdmin || (req.user.isLead && req.user.departmentId == departmentId))) {

            next()

        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Admin or Department Lead (Own).')
        }
    }
}


/* ------------------------------------------------------- */