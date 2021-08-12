const express = require('express');
const bodyParser = require('body-parser');
const Orders = require('../models/order');
const Products = require('../models/products');
var authenticate = require('../middlewares/authenticate');

const orderRouter = express.Router();

orderRouter.route('/')
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    Orders.find({ status : 1 })
    // .populate('products.product') //FIXME: 
    .then((orders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(orders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(async (req, res, next) => {
        var products = [];
        var total = 0;
        for (let i = 0; i < req.body.products.length; i++) {
            // wait for the promise to resolve before advancing the for loop
            await Products.findById( req.body.products[i]._id)
             .then((product) => {
              total = total + req.body.products[i].quantity * product.price;
              title = product.title
              price = product.price,
              reference = product.reference,
              req.body.products[i]  = {...req.body.products[i] , title, price, reference }
             products.push(req.body.products[i])
         })
        }
    const newOrder = new Orders({
        customerName: req.body.customerName,
        email : req.body.email,
        adress : req.body.adress,
        phone : req.body.phone,
        message : req.body.message,
        products : products,
        total : total
    });
    newOrder.save()
      .then((order) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(order);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /orders');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /orders');
});

orderRouter.route('/deliveries')
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    Orders.find({ status : 2 }).sort({ updatedAt : -1 })
    .then((orders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(orders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /orders/deliveries');
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /orders/deliveries');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Orders.deleteMany({ status : 2 })
    .then((orders) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(orders);
    }, (err) => next(err))
    .catch((err) => next(err));
});

orderRouter.route('/cancels')
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    Orders.find({ status : 3 }).sort({ updatedAt : -1 })
    .then((orders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(orders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /orders/cancels');
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /orders/cancels');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Orders.deleteMany({ status : 3 })
    .then((orders) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(orders);
    }, (err) => next(err))
    .catch((err) => next(err));
});

orderRouter.route('/:orderId')
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Orders.findById( req.params.orderId )
      .then((order) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(order);
      }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /orders/'+ req.params.orderId);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Orders.findById(req.params.orderId)
    .then((order) => {
       if( order.status === 1 && req.body.status === 2){
            for (let i = 0; i < order.products.length; i++) {
                Products.findByIdAndUpdate( order.products[i]._id, {$inc: {"stock": - order.products[i].quantity }}, {useFindAndModify: false})
                .then((product) => {
            }, (err) => next(err))
           }
           Orders.findByIdAndUpdate(req.params.orderId, {
            $set: {status : req.body.status, orderNumber: req.body.orderNumber}
        }, { new: true })
        .then((order) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(order);
        }, (err) => next(err))
       } else if( order.status === 2 && req.body.status === 3) {
        for (let i = 0; i < order.products.length; i++) {
            Products.findByIdAndUpdate( order.products[i]._id, {$inc: {"stock": order.products[i].quantity }}, {useFindAndModify: false})
            .then((product) => {
        }, (err) => next(err))
       }
       Orders.findByIdAndUpdate(req.params.orderId, {
        $set: {status : req.body.status}
    }, { new: true })
    .then((order) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(order);
    }, (err) => next(err))
       } else{
        Orders.findByIdAndUpdate(req.params.orderId, {
            $set: {status : req.body.status}
        }, { new: true })
        .then((order) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(order);
        }, (err) => next(err))
       }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, async(req, res, next) => {
    Orders.findByIdAndDelete(req.params.orderId)
    .then((order) =>{

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(order);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = orderRouter;