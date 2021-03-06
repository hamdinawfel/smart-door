const express = require('express');
const Products = require('../models/products');

const catalogRouter = express.Router();

catalogRouter.route('/')
.get((req,res,next) => {
  Products.find({ tags: req.query.tag })
  .then((products) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(products);
  })
  .catch((err) => status(500).json(err));
});


catalogRouter.route('/showcase')
.get((req,res,next) => {
    Products.find({ showcase: true }).sort({_id:req.query.sort}).limit(parseInt(req.query.limit))
    .then((products) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(products);
    })
    .catch((err) => status(500).json(err));
});
catalogRouter.route('/category/:category')
.get((req,res,next) => {
    Products.aggregate([
        {
            "$match": {
              category: req.params.category
            }
        },
        {
            "$project": {
              "createdAt": 0,
              "updatedAt": 0,
              "stock": 0,
              "alertStock": 0,
              "showcase": 0,
            }
        }
    ], function (err, result) {
        res.json(result);
    })
});
catalogRouter.route('/subcategory/:subCategory')
.get((req,res,next) => {
    Products.aggregate([
        {
            "$match": {
              subCategory: req.params.subCategory
            }
        },
        {
            "$project": {
              "createdAt": 0,
              "updatedAt": 0,
              "stock": 0,
              "alertStock": 0,
              "showcase": 0,
            }
        }
    ], function (err, result) {
        res.json(result);
    })
});





module.exports = catalogRouter;