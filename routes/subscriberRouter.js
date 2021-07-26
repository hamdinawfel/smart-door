require('dotenv').config()
const express = require('express');
const Subscribers = require('../models/subscribers');
var authenticate = require('../middlewares/authenticate');

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const subscriberRouter = express.Router();


subscriberRouter.route('/') 
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => { //FIXME: Add pagination
    Subscribers.find({})
    .then((subscribers) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(subscribers);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Subscribers.findOne({email: req.body.email})
    .then((subscriber) => {
        if (!subscriber) {
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
              from:`${process.env.NODEMAILAR_USER}`, 
              to:  req.body.email, 
              subject: 'Merci de vous être inscrit à notre newsletter',
              text: 'Votre inscription a été confirmée avec succès',
              template: 'subscribe',
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
                } 
          };
          
            Subscribers.create(req.body)
            .then((subscriber) => {
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return res.json({
                    error: error.message
                  })
                }
                return res.json({
                  message: 'Wellcome Email has been sent'
                })
              });
    
                
            }, (err) => next(err))
        }
        else {
            return res.status(400).json({ email: "Vous êtes déjà abonné" });
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /subscribe');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /subscribe');   
});

subscriberRouter.route('/:userId') 
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => { //FIXME: Add pagination
  res.statusCode = 403;
  res.end('GET operation not supported on /subscribe' + req.params.userId);  
})
.post(authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /subscribe' + req.params.userId);  
})
.put(authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /subscribe' + req.params.userId);
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
  Subscribers.findByIdAndRemove(req.params.userId)
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));  
});


module.exports = subscriberRouter;