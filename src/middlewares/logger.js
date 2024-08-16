"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

//LOGGER
//npm i morgan
//https://expressjs.com/en/resources/middleware/morgan.html
// const morgan = require('morgan')
// app.use(morgan('tiny'))

// app.use(morgan('short'))
//app.use(morgan ('dev'))
//app.use(morgan('common'))
// app.use(morgan('combined'))

//Custom Log:
// app.use(
//   morgan(
//     'TIME=":date[iso]" - URL=":url" - Method=":method" - IP=":remote-addr" - Ref=":referrer" - Status=":status" - Sign=":user-agent" (:response-time[digits] ms)'
//   )
// );

//? custom olarak kendimiz düzenlemek istersek örnek bu dökümandan bak!

// Write to File: A

// npm i morgan--> log kayıtlearının tutmak için olan ilgili modul
//LOGGER
// morgen defaul olarak consola  yazar. Dosyaya yazması gerek.
const morgan = require("morgan");
const fs = require("node:fs"); //  file system modulü, dahili modul tuttuğumuz log kayıtlarını dosyalayacak
const now = new Date();
const today = now.toISOString().split("T")[0];
// const now=new Date()
// const today=now.toISOString().split('T')[0]//? now ile gelen tarih bir obje bunun toIsoString ile stringe çevirmemiz gerekiyor. Stringe çevirdikten sonra da split methodu ile istediğimiz yerinden ayırabiliyoruz tarihi. Split te bize array döndüğünden ilk elemanı bizim istediğimiz tarih olduğundan 0 indisi ile tam istediğimiz tarihe ulaşıyoruz.

// app.use(morgan('combined',{
//     stream:fs.createWriteStream(`.logs/${today}.log`,{flags:'+a'})
// }))// middleware olduğundan app.use içinde çağırılıyor ve hazır formatlardan biri (içine) yazılıyor.

module.exports = morgan("combined", {
  stream: fs.createWriteStream(`./logs/${today}.log`, { flags: "a+" }),
});

//stream akış demek. akışta fs modulünü aç
//createWriteStream= akış olduğunda yaz
