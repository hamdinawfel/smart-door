require('dotenv').config()
const express = require('express');
const Subscribers = require('../models/subscribers');
const nodemailer = require('nodemailer');

const subscriberRouter = express.Router();


subscriberRouter.route('/') 
.get( (req,res,next) => { //FIXME: only the admin can access the resourse
    // Products.find({}).sort( { "category": -1 , "_id": 1} ).skip(req.query.page > 0 ? ( ( req.query.page - 1 ) * 12 ) : 0).limit(12)
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
            
              const output = `
              <p>Bienvenue à MamoGamers</p>
              <h3>Merci de votre abonnement</h3>
              <h3>test for emailing feature after subscribe</h3>
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
              from:`${process.env.NODEMAILAR_USER}`, 
              to:  req.body.email, 
              subject: 'Bienvenue à MamoGamers',
              text: 'Bienvenue à MamoGamers',
              html: output 
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
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /subscribe');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /subscribe');   
});


module.exports = subscriberRouter;