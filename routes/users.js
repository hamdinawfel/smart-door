require('dotenv').config()
const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
//
const nodemailer = require('nodemailer');

var User = require('../models/user');
// Load input validation
const validateSignupInput = require("../middlewares/signup");
const validateLoginInput = require("../middlewares/login");
const validateResetPwdInput = require("../middlewares/resetPwd");

var router = express.Router();

router.post('/signup', (req, res, next) => {
  const { name, email, password } = req.body;
  const { errors, isValid } = validateSignupInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
User.findOne({ email: req.body.email })
      .then(user =>{
        if(user){
            return res.status(400).json({ email: "Cette adresse e-mail est déjà utilisée" });
        }
       let token = jwt.sign(
          { name,
            email,
            password  },
          process.env.JWT_ACTIVATE_SECRET,
          { expiresIn: process.env.JWT_ACTIVATE_EXPIRE }
        );
          const output = `
            <p>Bienvenue ${req.body.name} à MamoGamers</p>
            <h3>Account Activation Link</h3>
            <p>Please ckick on given <a href="${process.env.CLIENT_URL}/activate/${token}">Link</a> to activate your account</p>
          `;
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: `${process.env.NODEMAILAR_USER}`,
              pass: `${process.env.NODEMAILAR_PASS}`
            }, tls: {
              rejectUnauthorized: false
            }
          });

          let mailOptions = {
            from: `${process.env.NODEMAILAR_USER}`, 
            to: email, 
            subject: 'Account Activation Link',
            text: 'Bienvenue à MamoGamers',
            html: output 
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.json({
              error: error.message
            })
          }
          return res.json({
            message: 'Activation Email has been sent'
          })
        });
      })
  });
  
router.post('/activate', (req, res, next) => {
  const token = req.headers.authorization;

  if(token){
      jwt.verify(token,  process.env.JWT_ACTIVATE_SECRET, (err, decodedToken)=>{
        if(err){
          return res.status(400).json({error:"Incorrect or Expired link."})
        }
        const {name, email, password } = decodedToken;
       User.findOne({ email })
        .then(user =>{
            if(user){
                return res.status(400).json({ email: "Cette adresse e-mail est déjà utilisée" });
            }else{
                bcrypt.hash(password, 10).then(hash => {
                    const user = new User({
                        name,
                        email,
                        password: hash, 
                    });
                    user
                      .save()
                      .then(result => {
                        const token = jwt.sign(
                          {  
                            id : user._id },
                          process.env.JWT_SECRET,
                          { expiresIn: process.env.JWT_EXPIRE }
                        );
                        res.status(201).json({
                          success: true,
                          token: token,
                        });
                      })
                      .catch(err => {
                        res.status(500).json({
                          message: "Invalid authentication credentials!"
                        });
                      });
                  });
            }
      })
     })
    }else{
      return res.json({error:"Something went Wrong!"});
    }
  });

router.post('/forgot-password', (req, res, next) => {
  const { email } = req.body
  User.findOne({ email }, (err, user) => {
      if(err || !user ){
          return res.status(400).json({ email: "Email non trouvé" });
      };
     const token = jwt.sign({id : user._id },
      process.env.JWT_RESET_PASSWORD_SECRET,
      { expiresIn: process.env.JWT_ACTIVATE_EXPIRE }
    );
   
    const output = `
    <p>Bienvenue à MamoGamers</p>
    <h3>Reset Password Link</h3>
    <p>Please ckick on given <a href="${process.env.CLIENT_URL}/reset-password/${token}">Link</a> to reset your password</h2></p>
  `;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.NODEMAILAR_USER}`,
      pass: `${process.env.NODEMAILAR_PASS}`
    }, tls: {
      rejectUnauthorized: false
    }
  });
    
  let mailOptions = {
    from: `${process.env.NODEMAILAR_USER}`, 
    to: email, 
    subject: 'Reset password link',
    text: 'Reset password link',
    html: output 
};
    return user.updateOne({resetLink : token }, function (err, success ){
        if( err ) {
          return res.status(400).json({ error: "Reset password link error" });
        }else{
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.status(400).json({ error: "Reset password link error" });
            }
            return res.json({
              message: 'Reset password link has been sent'
            })
          });
        }
    })
  })
});

router.post('/reset-password', (req, res, next) => {
  const { errors, isValid } = validateResetPwdInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
    const resetLink = req.headers.authorization;
    if( resetLink){
      jwt.verify(resetLink,  process.env.JWT_RESET_PASSWORD_SECRET, (err, decodedToken)=>{
        if(err){
          return res.status(400).json({error: 'Lien incorrect ou expiré!'})
        }
       
       User.findOne({ resetLink }, (err, user)=> {
        if(err || !user ){
          return res.status(400).json({ error: "User with this token does not exist" });
         };
            bcrypt.hash(req.body.password, 10).then(hash => {
                    const obj = {
                      password: hash,
                      resetLink : ''
                    }
                    user = _.extend(user, obj);
                    user.save((err, result)=>{
                      if(err) {
                        return res.status(400).json({ error :"Reset password error"})
                      }else{
                        const output = `
                        <p>Bienvenue à MamoGamers</p>
                        <h3>Your password has been changed</h3>
                      `;
                      let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: `${process.env.NODEMAILAR_USER}`,
                          pass: `${process.env.NODEMAILAR_PASS}`
                        }, tls: {
                          rejectUnauthorized: false
                        }
                      });
            
                      let mailOptions = {
                        from: `${process.env.NODEMAILAR_USER}`, 
                        to: user.email, 
                        subject: 'Your password has been changed',
                        text: 'Your password has been changed',
                        html: output 
                       };
                        transporter.sendMail(mailOptions, (error, info) => {
                          if (error) {
                            res.status(500).json({
                              error: error.message
                            });
                            
                          }
                          return res.status(200).json({
                            message: 'Saving new password email has been sent'
                          })
                        });
                      }
                    })
          });
        })
     })
    }else{
        return res.status(401).json({ message: "Athentitication Error" });
    }
});


router.post('/login', (req, res ) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(404).json({ credentials: "Email non trouvé" });
          }else{
            bcrypt.compare(req.body.password, user.password).then(isMatch => {
                if (isMatch) {
                      jwt.sign(
                            { id: user._id },
                            process.env.JWT_SECRET,
                            { expiresIn: process.env.JWT_EXPIRE },(err, token)=>{
                                res.json({
                                    success: true,
                                    token: token
                                });
                            }
                      );
                }else{
                    return res.status(400).json({ credentials: "Le mot de passe est incorrect" });
                }
            })
          }
    })
});

router.post('/auth', (req, res ) => {
  User.findOne({ email: req.body.email })
  .then(user =>{
      if(user){
            jwt.sign(
              {  id: user._id },
              process.env.JWT_SECRET,
              { expiresIn: process.env.JWT_EXPIRE },(err, token)=>{
                  res.json({
                      success: true,
                      token: token
                  });
              }
            );
      }else{
        //
        bcrypt.hash(req.body.email, 10).then(hash => {
          const output = `
          <p>Bienvenue à MamoGamers</p>
        `;
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: `${process.env.NODEMAILAR_USER}`,
            pass: `${process.env.NODEMAILAR_PASS}`
          }, tls: {
            rejectUnauthorized: false
          }
        });
  
        let mailOptions = {
          from: `${process.env.NODEMAILAR_USER}`, 
          to: req.body.email, 
          subject: 'Bienvenue à MamoGamers',
          text: 'Bienvenue à MamoGamers',
          html: output 
      };
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash
          });
          user
          .save()
          .then(result => {
            const token = jwt.sign(
              { id: user._id },
              process.env.JWT_SECRET,
              { expiresIn: process.env.JWT_EXPIRE  }
            );
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                res.status(500).json({
                  error: error.message
                });
                
              }
              return res.status(201).json({
                success: true,
                token: token
              });
            });
            
          })
          .catch(err => {
            res.status(500).json({
              message: "Invalid authentication credentials!"
            });
          });
        });
     
     }
  })
});

router.get('/:userId', (req,res) => {//FIXME: autorizeb the admin to get user info 
  User.findById(req.params.userId, { name: 1, email: 1, balance:1, _id:0 } )
   .then((user) => {
    if (!user) {
      return res.status(404).json({ error: "User non trouvé" })
   }
   res.json({ user });
   })
})
 

  module.exports = router;