require('dotenv').config()
const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
var authenticate = require('../middlewares/authenticate');

var User = require('../models/user');
// Load input validation
const validateSignupInput = require("../middlewares/signup");
const validateLoginInput = require("../middlewares/login");
const validateChangePwdInput = require("../middlewares/changePwd");

var router = express.Router();

router.post('/signup',authenticate.verifyUser, authenticate.verifyRoot, (req, res, next) => {
  const { name, email, password } = req.body;
  const { errors, isValid } = validateSignupInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email })
  .then(user =>{
      if(user){
          return res.status(400).json({ email: "Email déjà utilisé" });
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
                  res.status(201).json(
                    'User created successfully!'
                  );
                })
                .catch(err => {
                  res.status(500).json({
                    error: "une erreur est survenue"
                  });
                });
            });
         }
      })
  });

// 
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

router.post('/change-password',authenticate.verifyUser, (req, res, next) => {
    const { errors, isValid } = validateChangePwdInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({ _id: req.user._id })
    .then(user => {
        if(user){
                 bcrypt.compare(req.body.currentPassword, user.password)
                    .then(isMatch => {
                            if (isMatch) {
                              bcrypt.hash(req.body.newPassword, 10)
                               .then(hash => {
                                const obj = {
                                  password: hash,
                                }
                                user = _.extend(user, obj);
                                user.save((err, result)=>{
                                  if(err) {
                                    return res.status(400).json({ error :"Change password error"})
                                  }else{
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
                                  }
                                })
                          }); 
                       }else{
                         return res.status(400).json({ password :"Mot de passe incorrect"})
                       }
                    })
                    .catch((err)=> res.status(500).json(err))
        }
    })
    .catch((err)=> res.status(500).json(err))
  });


router.get('/admin/:userId', authenticate.verifyUser,(req,res) => {
  User.findById(req.params.userId , { name: 1, email: 1, admin:1, phone:1, root:1 })
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
 
router.get('/',authenticate.verifyUser, authenticate.verifyRoot, (req,res,next) => { 
    User.find({}).sort({_id: -1})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
})


router.put('/:userId', authenticate.verifyUser,(req, res, next) => {
      User.findById(req.params.userId).then((user) => {
        if (user != null) {
            if (req.body.name) {
                user.name = req.body.name;
            }
            if (req.body.phone) {
              user.phone = req.body.phone;
            }
            user.save().then((user) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(user);
            }, (err) => next(err)).catch((err) => next(err));
        } else {
            err = new Error('user ' + req.params.userId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err)).catch((err) => next(err));
})
router.delete('/:userId', authenticate.verifyUser, authenticate.verifyRoot, (req, res, next) => {
  User.findByIdAndRemove(req.params.userId)
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));  
});
  module.exports = router;