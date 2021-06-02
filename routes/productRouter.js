require('dotenv').config()
const express = require('express');
const Products = require('../models/products');
var authenticate = require('../middlewares/authenticate');
var multer = require('../middlewares/multer');
const fs = require('fs');

const productRouter = express.Router();

productRouter.route('/')
.get((req,res,next) => {
    Products.find().sort({_id : -1})
        .then((products) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(products);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, multer,(req, res, next) => {
  const newProduct = new Products({
    title : req.body.title,
    description: req.body.description,
    category: req.body.category,
    subCategory: req.body.subCategory,
    alertStock:req.body.alertStock,
    stock:req.body.stock,
    price: req.body.price,
    imageUrl: `/uploads/${req.file.filename}`
  });
  newProduct.save()
            .then(category => res.status(200).json(category))
            .catch(err => res.status(400).json(err));
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /category');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /category');
});
//COUNT SETUP
productRouter.route('/count')
.get(authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    console.log(req.params)
    Products.aggregate([
        { $group: { _id: null, productsCount: { $sum: 1 } } },
        { $project: { _id: 0 } }
    ], function (err, result) {
        res.json(result);
    }).allowDiskUse(true)
    
});

// /:productId SETUP
productRouter.route('/:productId')
.get(authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    Products.findById(req.params.productId)
    .then((product) => {
        if (product != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(product);
        }
        else {
            res.status(404).json('Product ' + req.params.productId + ' not found');
        }
    },)
    .catch((err) => res.status(500).json({error :err}));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /products/' + req.params.productId);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Products.findByIdAndUpdate(req.params.productId, {
        $set: req.body
    }, { new: true })
    .then((product) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
       Products.findById(req.params.productId)
    .then((product) => {
        const filename = product.imageUrl.split('/uploads/')[1];
        fs.unlink(`uploads/${filename}`, () => {
            Products.deleteOne({_id : req.params.productId})
                .then( (resp)=> {
                 res.statusCode = 200;
                 res.setHeader('Content-Type', 'application/json');
                 res.json(resp);
               })
        })
    })
    .catch((err) => res.status(500).json({error: err}));
});



module.exports = productRouter;