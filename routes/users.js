require('dotenv').config()
const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
var authenticate = require('../middlewares/authenticate');

// EMAIL SETUP
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');


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
            return res.status(400).json({ email: "Email existe déjà" });
        }
       let token = jwt.sign(
          { name,
            email,
            password  },
          process.env.JWT_ACTIVATE_SECRET,
          { expiresIn: process.env.JWT_ACTIVATE_EXPIRE }
        );
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: `${process.env.NODEMAILAR_USER}`,
              pass: `${process.env.NODEMAILAR_PASS}`
            }, tls: {
              rejectUnauthorized: false
            }
          });

          const handlebarOptions = {
            viewEngine: {
                extName: ".hbs",
                partialsDir: './emails',
                defaultLayout: false,
            },
            viewPath: './emails',
            extName: ".hbs",
        };
        
        transporter.use('compile', hbs(handlebarOptions));
          let mailOptions = {
            from: `${process.env.NODEMAILAR_USER}`, 
            to: email, 
            subject: 'Activation de votre compte',
            text: 'Bienvenue à Dinari Green Life',
            template: 'activate',
            attachments: [{
              filename: 'logo.jpg',
                path:'./emails/assets/logo.jpg',
               cid: 'logo'
              },
              {
                filename: 'ico-facebook.png',
                 path:'./emails/assets/ico-facebook.png',
                 cid: 'ico-facebook'
                },
                {
                  filename: 'ico-youtube.png',
                   path:'./emails/assets/ico-youtube.png',
                   cid: 'ico-youtube'
                }],
            context: {
              name: req.body.name,
              URL: process.env.CLIENT_URL,
              token : token
          } 
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
          return res.status(400).json({error:"Lien expiré"})
        }
        const {name, email, password } = decodedToken;
       User.findOne({ email })
        .then(user =>{
            if(user){
                return res.status(400).json({ error: "Ce compte est actif" });
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
                          error: "Identifiants d'authentification non valides!"
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

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.NODEMAILAR_USER}`,
      pass: `${process.env.NODEMAILAR_PASS}`
    }, tls: {
      rejectUnauthorized: false
    }
  });
  const handlebarOptions = {
    viewEngine: {
        extName: ".hbs",
        partialsDir: './emails',
        defaultLayout: false,
    },
    viewPath: './emails',
    extName: ".hbs",
};

transporter.use('compile', hbs(handlebarOptions));

  let mailOptions = {
    from: `${process.env.NODEMAILAR_USER}`, 
    to: email, 
    subject: 'Mot de passe oublié?',
    text: 'Bienvenue à Dinari Green Life',
    template: 'forgotPwd',
      attachments: [{
        filename: 'logo.jpg',
          path:'./emails/assets/logo.jpg',
          cid: 'logo'
        },
        {
        filename: 'ico-facebook.png',
          path:'./emails/assets/ico-facebook.png',
          cid: 'ico-facebook'
        },
        {
          filename: 'ico-youtube.png',
            path:'./emails/assets/ico-youtube.png',
            cid: 'ico-youtube'
        }],
      context: {
        URL: process.env.CLIENT_URL,
        token : token
    } 
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
          return res.status(400).json({error: 'Lien expiré'})
        }
       
       User.findOne({ resetLink }, (err, user)=> {
        if(err || !user ){
          return res.status(400).json({ error: "Utilisateur non trouvé" });
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
                      let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: `${process.env.NODEMAILAR_USER}`,
                          pass: `${process.env.NODEMAILAR_PASS}`
                        }, tls: {
                          rejectUnauthorized: false
                        }
                      });
                      const handlebarOptions = {
                        viewEngine: {
                            extName: ".hbs",
                            partialsDir: './emails',
                            defaultLayout: false,
                        },
                        viewPath: './emails',
                        extName: ".hbs",
                    };
                    
                    transporter.use('compile', hbs(handlebarOptions));
                      let mailOptions = {
                        from: `${process.env.NODEMAILAR_USER}`, 
                        to: user.email, 
                        subject: 'Votre mot de passe a été modifié avec avec succès',
                        text: 'Bienvenue to Dinari Green Life',
                        template: 'resetPwd',
                        attachments: [{
                          filename: 'logo.jpg',
                            path:'./emails/assets/logo.jpg',
                            cid: 'logo'
                          }, 
                          {
                            filename: 'ico-facebook.png',
                              path:'./emails/assets/ico-facebook.png',
                              cid: 'ico-facebook'
                            },
                            {
                              filename: 'ico-youtube.png',
                                path:'./emails/assets/ico-youtube.png',
                                cid: 'ico-youtube'
                            }],
                       };
                        transporter.sendMail(mailOptions, (error, info) => {
                          if (error) {
                            res.status(500).json({
                              error: error.message
                            });
                            
                          }
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
            return res.status(404).json({ email: "Email non trouvé" });
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
                    return res.status(400).json({ password: "Mot de passe incorrect" });
                }
            })
          }
    })
});
// 


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
          subject: 'Your account has been created successfully',
          text: 'Welcome back to Dinari Green Life',
          template: 'welcome',
            attachments: [{
              filename: 'logo.jpg',
                path:'./uploads/logo.jpg',
               cid: 'logo'
              }],
            context: {
              name: req.body.name
          }  
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

router.get('/:userId', authenticate.verifyUser,(req,res) => {
  User.findById(req.params.userId , { name: 1, email: 1 })
   .then((user) => {
     if( user && user._id.equals(req.user._id) ){
      return res.status(200).json({ user });
     }
    if (!user) {
      return res.status(404).json({ error: "User non trouvé" })
   }else{
    return res.status(403).json({ error: "You are not authorized to perform this operation!" })
   }
   })
})
 
router.get('/admin/:userId', authenticate.verifyUser,(req,res) => {
  User.findById(req.params.userId , { name: 1, email: 1, admin:1 })
   .then((user) => {
     if( user && req.user.admin ){
      return res.status(200).json({ user });
     }
    if (!user) {
      return res.status(404).json({ error: "User non trouvé" })
   }else{
    return res.status(403).json({ error: "You are not authorized to perform this operation!" })
   }
   })
})
 
router.get('/',authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => { //FIXME: Add pagination
    User.find({})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
})


router.put('/:userId', authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
  User.findByIdAndUpdate(req.params.userId, {
    $set: req.body
}, { new: true })
.then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
}, (err) => next(err))
.catch((err) => next(err));
})
router.delete('/:userId', authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
  User.findByIdAndRemove(req.params.userId)
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));  
});
  module.exports = router;