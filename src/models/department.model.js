"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");// db connection da monngose u orada require edip export ettiğimizden burada direk mongoose dan değil dbConnection dosyamızdaki exporttan destruc ile çekiyoruz. 

/* ------------------------------------------------------- */
const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true, // departmN  isimle uniq olue ve değiişmez.
      // unique verilerde validation yapılmaz çünkü validate için gönderilen bilgilerle yapılır data ya gitmeden;ancak unique olup olmadığını ancak data ya girderek görürüz.
    },
  },
  { collection: "departments", timestamps: true },
);

module.exports = mongoose.model("Department", DepartmentSchema);



















//? DERS NOTLARI 24/07/2024
//*TOKEN
// fe den yada herhangi bir servitesn username password geldi kullanıcının herhangi bir datasını herhangi bir yere kaydetmeyeceğim.token modeli oluşturacağım o bir token verecek fe ye gönderecek fe de bunu istedi yerde örneğin localstorage de saklayacak.her token kullanıcıya özeldir. 
//frontend herhangi bir url e ziyater ettiğinde benim ona gönderdiğim tolken i fe be e gönderecek. bende bu token i token modelinde bakacağım var mı aktif mi tamam da user uygulamada dolaşır diyor. 
// sesion cookie gibi dılarodan eirşilr yere veri eklemiyorum kendi güvenliğimi token ile daha iyi duruma getiriyorum. Token de çalışanabilir ama be onlarak ben sorumluluğumu yapıyorum
// session cccokie kulanmamamknın ASIL sebebi sadece web servisi değil belki bir telefon mobile otomobil servisi vb gibi. browserlarda session coookie desteği var ama br IOT cihazında bu destek olamayabilir. ben be servisi olarak tüm cihazları gözetip projemi yapmalıyım. 
// be de autorization kısmında kullanmıyoruz sesion cookie yi
//