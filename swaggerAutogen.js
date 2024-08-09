"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// Swagger Autogen
// https://swagger-autogen.github.io/docs/
// $ npm i swagger-autogen # JSON creator
// $ npm i swagger-ui-express
// $ npm i redoc-express
/* ------------------------------------------------------- */
require('dotenv').config()
const HOST= process.env?.HOST || '127.0.0.1'
const PORT= process.env?.PORT || 8000
/* ------------------------------------------------------- *
const options = {
    openapi:          <string>,     // Enable/Disable OpenAPI.                        By default is null
    language:         <string>,     // Change response language.                      By default is 'en-US'
    disableLogs:      <boolean>,    // Enable/Disable logs.                           By default is false
    autoHeaders:      <boolean>,    // Enable/Disable automatic headers recognition.  By default is true
    autoQuery:        <boolean>,    // Enable/Disable automatic query recognition.    By default is true
    autoBody:         <boolean>,    // Enable/Disable automatic body recognition.     By default is true
    writeOutputFile:  <boolean>     // Enable/Disable writing the output file.        By default is true
};
/* ------------------------------------------------------- */
const swaggerAutogen=require('swagger-autogen')()// default değerler ile çalışır ya da () içine yukarıdaki ayarlardan ekleyebilirim.
// const swaggerAutogen=require('swagger-autogen')({openapi:'3.0.0',language:'tr-TR}) // gibi ayarlar değişebilir. 


const packageJson=require('./package.json')// infodaki bilgileri almak için require ediyoruz// require json ı destekler


//?ön temel ayarlar burada burası manual olarak girilecek kısım

const document = {
    // info: {
    //     version: '1.0.0',
    //     title: 'Personnel API',
    //     description: 'Personnel Management System API Service v.1',
    //     termOfService: 'http://127.0.0.1:8000/#',// sözleşme varsa sözleşme url i eklemek olabilir, eklemesen de olur.
    //     contact: { name: 'Clarusway', email: 'qadir@clarusway.com' },
    //     license: { name: 'Apache Licence' }
    // },//*bu info caten package json da var oradan çekelim 
    info: {// dökumana ait temel bilgiler kısmı
        version: packageJson.version,
        title: packageJson.name,
        description: packageJson.description,
        // termOfService: 'http://127.0.0.1:8000/#',
        contact: { name: packageJson.author, email: 'abc@abc.com' },
        license: { name: packageJson.license }
    },
    host: `${HOST}:${PORT}`,
    basePath: '/',// ana URL
    schemes: ['http', 'https'],// protokol şemaları array olacak dikkat et
    // SimpleToken Settings:
    securityDefinitions: {// burası kullandığımız  güvenlik tanımlaması, birde bu güvenliği kullan diye security var aşağıda 
        Token: {// bu yazdfıklarımız openAPİ standartı
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
			description: 'Simple Token Authentication * Example: <b>Token ...tokenKey...</b>'
        }
    },
    security: [// yukarıdaki güvenloği kullan 
        { Token: [] }
    ],
    // Model Definitions:
    definitions: {// token model gizlidir burada yer almaz!
        "Department": require('./src/models/department.model').schema.obj,
        "Personnel": require('./src/models/personnel.model').schema.obj,
    }
}

//swagerauten in çalışması: tüm rooları gezecek oradakli crud işlemlerini yakalayacak ve aldığı bu bilgilerle bana JSON ortaya çıkaracak işte bunları yapabilmesi için bunları bulacağı routerları ben bu array içinde gösteriyorum
const routes = ['./index.js'] 
const outputFile = './swagger.json'// bu bana çıktı vereceği dosyanın ismi 

// RUN: 3 parametre alır 
swaggerAutogen(outputFile, routes, document)