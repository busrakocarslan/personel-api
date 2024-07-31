"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const Personnel = require("../models/personnel.model");
const Token = require("../models/token.model");

const passwordEncrypt = require("../helpers/passwordEncrypt");

/******************************************************** */
module.exports = {
  login: async (req, res) => {
     /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Login'
            #swagger.description = 'Login with username and password'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    username: '*String',
                    password: '*String',
                }
            }
        */
    const { username, password } = req.body; // destruc ile bize gelen req.body den alıyoruz.
    if (username && password) {
      const user = await Personnel.findOne({ username }); // username ile eşleşen personeli al diyoruz. password kontrolü yapmaya geçiyoruz. Set methodu findone da da çalıştığı için password şifreli geliyor
      if (user && user.password == passwordEncrypt(password)) {
        if (user.isActive) {
          //TOKEN İŞLEMİ ALANI

          let tokenData = await Token.findOne({ userId: user._id }); // token de bu ku user a ait daha önce bir token oluşturmuşmuyum onu kontrol et diyoruz

          if (!tokenData) {
            tokenData = await Token.create({
              // iki adet fielname alıyor
              userId: user._id,
              token: passwordEncrypt(user._id + Date.now()), // timestaps
            });
          }
          res.status(200).send({
            error: false,
            token: tokenData.token,
            user,
          });
        } else {
          res.errorStatusCodde = 401;
          throw new Error("This user is not active");
        }
      } else {
        res.errorStatusCodde = 401;
        throw new Error("Wrong username or password");
      }
    } else {
      res.errorStatusCodde = 401;
      throw new Error("Please enter username and password");
    }
  },
  //TOKİN DELETE ETme

  logout: async (req, res) => {
     /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Logout'
            #swagger.description = 'Delete token.'
        */


   // auth mw de en sonda yaptığımız if (tokenData) req.user = tokenData.userId bu eşitleme sebebiyle token v arsa req.user true gelecektir. 
    const data= req.user? await Token.deleteOne({userId:req.user._id}) : null
     res.status(200).send({
        error:false,
        message:"logout:OK",
        data

     })




  },
};

/************************************************** */
