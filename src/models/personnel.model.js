"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection"); //db connection da monngose u orada require edip export ettiğimizden burada direk mongoose dan değil dbConnection dosyamızdaki exporttan destruc ile çekiyoruz.
/* ------------------------------------------------------- */
const passwordEncrypt = require("../helpers/passwordEncrypt"); // password şifreleme için helper dosyasında bulunan crypto  kullandığımız dosyayı require ediyoruz.
// const uniqueValidator = require("mongoose-unique-validator");

const PersonnelSchema = new mongoose.Schema(
  {
    departmentId: {
      //foreinkey
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department", // hangi tablodan alacağını,referansını belirtiyoruz.
      required: true,
    },

    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncrypt(password), // şifreleme işlemi yaparak database e kaydoluyor bu sayede sorgu attığımızda bize şifreli olarak dönecek bu func helper içinde
    },

    firstName: {
      type: String,
      trim: true,
      required: true,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
    },

    phone: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: [
        (email) => email.includes("@") && email.includes("."),
        "Email is not valid",
      ],
    },

    title: {
      type: String,
      trim: true,
      required: true,
    },

    salary: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      trim: true,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isAdmin: {
      // yönetici
      type: Boolean,
      default: false,
    },

    isLead: {
      //departmanların takım lideri
      type: Boolean,
      default: false,
    },

    startedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "personnels", timestamps: true }
);



//!MECBUR KALMADIKCA SCHEMA METHODLARINI KULLANMA.
//? aşağıdaki ek bilgi: Json a kullanıcıya gönderirken içinde gereksiz bilgiler var ise çıkarmamızı sağlıyor, direk içeriğini değiştirip  kopyala yapıştır kullan .Database den değil en son aşamada kullnıcıya gönderilecek olan veriden siliyor.
// PersonnelSchema.set("toJSON", {
//   transform: (doc, ret) => {
//     ret.id = ret._id;
//     delete ret._id;
//     delete ret.__v;
//     delete ret.password;
//     ret.createdAt = ret?.createdAt.toLocaleDateString("tr-tr");
//   },
// });

//? bu fonksiyonda bir aşağıdaki birleştirme işlemi için yazılmış
// function capitalize(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
// }
//? aşağıdaki ek bilgi: virtual özelliği  ile iki bilgiyi birleştirip tel bilgi olarak gönderecbiliyorusn
// PersonnelSchema.virtual("fullname").get(function () {
//   return `${this.firstname} ${this.lastname}`;
//? func ile birleştirilmiş hali daha kısa yazımı
//   return `${capitalize(this.firstname)} ${capitalize(this.lastname)}`;
// });

module.exports = mongoose.model("Personnel", PersonnelSchema);
