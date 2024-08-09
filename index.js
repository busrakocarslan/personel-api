"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require('express')
const app = express()
const {dbConnection}=require('./src/configs/dbConnection')
/* ------------------------------------------------------- */
// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;
// asyncErrors to errorHandler:
require("express-async-errors");
//db connection--mongoose la bağlantı noktası yukarıda import et
dbConnection();

//body parser--> req.body i alabilmek için //!bu olmazsa post atıldığından json js objesine dönmez.Hata alınır.
app.use(express.json());

//cookie-session
//httpOnly:true XSS Cross Site Scripting httpOnly yapınca js browserda destekliyorsa cookilerde işlem yapılmasını engelliyor. 
app.use(
    require("cookie-session")({
        secret: process.env.SECRET_KEY,
        // cookie: {//*cookie i güvenli hale getirme kodları
        //     secure: !(process.env.NODE_ENV=="development"),-->//* bunu true yaptığımızda production da https ile istek atılabiliyor.
        //     httpOnly: false,--> XSS saldrırılarını önlemek için yazılıyor.Cookilerde işlem yapılamamasını sağlıyor.
        //     maxAge: 24 * 60 * 60 * 1000,--> coookinin kayıtlı kalacağı süre
        //   }
    }),
);


/* ------------------------------------------------------- */
// //?DOCUMENTAtioN
//npm i swagger-autogen-->//!JSON oluşturur
// npm i swagger-ui-express
// npm i redoc-express
// JSON GÖRÜNÜM 
// app.use('/document/json',(req,res)=>{
//     res.sendFile('swagger.json',{root:'.'})// send,le dosyayı ekranda görüntüleme demek. root . da bu methodun zorunlusu
// })
// SWAGGER İÇİN:
//  öncelikle indirdiğimiz ui modulü çağırıyoruz
// const swaggerUi=require('swagger-ui-express')
//  ikinci olarak da göstereceğimiz swagger.json dosyasını çağırıyoruz
// const swaggerJson=require('./swagger.json')
//  swaggeri kullanma

// app.use('/documents/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson, { swaggerOptions: { persistAuthorization: true } }))
//  swaggerUi.serve: swaggerdeki css ve ilgili js kodlarını hazırlayan bir middleware
//  swaggerUi.setup(swaggerJson :esas kısım, jsın dosyayı swagger olarak yazdıracak
// //?{ swaggerOptions: { persistAuthorization: true } } autorizedaki token i kullanabilmemiz için ikinci parametreye yazmamız gereken ayar. Tokenin hafızada kalmasını sağlıyor. 


// /* ------------------------------------------------------- */
// /* ------------------------------------------------------- */
// //?MORGAN
// bir mw olduğundan appuse içindeçaığırıyoruz. 
 app.use(require('./src/middlewares/logger'))// log tuttam func yazdığım yer
// /* ------------------------------------------------------- */

//?Middlewares
// Authentication Middleware:
app.use(require('./src/middlewares/authentication'))

//sortSearchFilter middlewares
app.use(require('./src/middlewares/findSearchSortPage'))


// HomePath:
app.all("/", (req, res) => {
    res.send({
        error: false,
        message: "Welcome to PERSONNEL API",
        // session: req.session,
        // isLogin: req.isLogin,
        user: req.user
    });
});





//?ROUTES

// /auth
app.use('/auth', require('./src/routes/auth.router'))

// /tokens
app.use("/tokens", require("./src/routes/token.router"));

// /departments
app.use("/departments", require("./src/routes/department.router"));

// /personnels
app.use("/personnels", require("./src/routes/personnel.router"));

//not found routes
app.all("*", async (req, res) => {
    res.status(404).send({
        error: true,
        message: "Route not available",
    });
});



// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()


//? data verisi silme ekleme sadece development aşamasında olur, production da olmaz o yüzden if e yazıldı. 
// if (process.env.NODE_ENV == "development") {
// //   return;//! çalışması için returnu kaldır sonra tekrar ekle
//   require("./src/helpers/dataCreate")()
//     .then((res) => console.log("Data synched"))
//     .catch((err) => console.error("Data could not synched"));
// }