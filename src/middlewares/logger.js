"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */



// npm i morgan--> log kayıtlearının tutmak için olan ilgili modul
//LOGGER
const morgan=require('morgan')
const fs=require('node:fs')//  file system modulü, dahili modul tuttuğumuz log kayıtlarını dosyalayacak
const now=new Date
const today=now.toISOString().split('T')[0]//? now ile gelen tarih bir obje bunun toIsoString ile stringe çevirmemiz gerekiyor. Stringe çevirdikten sonra da split methodu ile istediğimiz yerinden ayırabiliyoruz tarihi. Split te bize array döndüğünden ilk elemanı bizim istediğimiz tarih olduğundan 0 indisi ile tam istediğimiz tarihe ulaşıyoruz. 

// app.use(morgan('combined',{
//     stream:fs.createWriteStream(`.logs/${today}.log`,{flags:'+a'})
// }))// middleware olduğundan app.use içinde çağırılıyor ve hazır formatlardan biri (içine) yazılıyor. 
module.exports=morgan('combined',{
        stream:fs.createWriteStream(`.logs/${today}.log`,{flags:'+a'})})