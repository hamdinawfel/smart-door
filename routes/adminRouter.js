const express = require('express');
const bodyParser = require('body-parser');
const Products = require('../models/products');
const Orders = require('../models/order');
var authenticate = require('../middlewares/authenticate');


const adminRouter = express.Router();

adminRouter.use(bodyParser.json());


adminRouter.route('/budget')
.get(authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    Products.aggregate([
          {
            $project: {
              total: {
                $multiply: [
                  "$purchasePrice",
                  "$stockAmount"
                ]
              }
            }
          },
          {
            $group: {
              _id: null,
              "stockBudget": {
                $sum: "$total"
              }
            }
          }
    ], function (err, result) {
        res.json(result);
    }).allowDiskUse(true) //FIXME: use aggregate with promise
});

adminRouter.route('/revenue')
.get(authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    Orders.aggregate([
        {
            "$match": {
              status: 2
            }
          },
          {
            "$project": {
              _id: 0,
              city: 1,
              total: 1
            }
          },
          {
            $group: {
              _id: null,
              sum: {
                $sum: "$total"
              },
              users: {
                $push: {
                  city: "$city",
                  cart: "$total"
                }
              }
            }
          },
          {
            $unwind: {
              path: "$users",
              
            }
          },
          {
            $project: {
              city: "$users.city",
              cart: "$users.cart",
              sum: "$sum",
              "percent": {
                $multiply: [
                  {
                    $divide: [
                      "$users.cart",
                      "$sum"
                    ]
                  },
                  100
                ]
              }
            }
          },
          {
            "$sort": {
              percent: -1
            }
          }
    ], function (err, result) {
        res.json(result);
    }).allowDiskUse(true)
});

adminRouter.route('/track')
.get(authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
         Orders.aggregate([
            {
            "$match": {
              status: 2
            }
          },
          {
            "$project": {
              _id: 0,
              products: 1,
              total: 1
            }
          },
          {
            $group: {
              _id: "$products.title",
              // sum: {
              //   $sum: "$total"
              // },
              best: {
                $push: {
                  // total: { $multiply: [ "$products.price", 2 ] }
                  
                  price:"$products.price",
                  quantity:"$products.quantity",
                  total: { $multiply: [ "$price", "$quantity" ] },

                }
              }
            }
          },
          {
            $unwind: {
              path: "$best",
              
            }
          },
          {
            $project: {
              total: "$best.total",
              // sum: "$sum",
            }
          }
              
    ], function (err, result) {
        res.json(result);
    })
});

adminRouter.route('/stock')
.get(authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    Products.aggregate([
              
      {
       $project:
          {
           title:1,
           reference:1,
           imageUrl:1,
           stock:1,
           alertStock:1,
            alert: { $lt: [ "$stock", "$alertStock" ] },
            
          }
     },
      {
       $match:
          {
            alert: true,
          }
     }
          
    ], function (err, result) {
        res.json(result);
    }).allowDiskUse(true) //FIXME: use aggregate with promise
});




module.exports = adminRouter;