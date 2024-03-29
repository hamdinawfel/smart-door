require('dotenv').config()
const express = require('express');
const fs = require('fs');
// const Products = require('../models/products');
const Categories = require('../models/category');
const Products = require('../models/products');

var authenticate = require('../middlewares/authenticate');
var multer = require('../middlewares/multer');

const categoryRouter = express.Router();


categoryRouter.route('/')
.get((req,res,next) => {
    Categories.find({})
    .then((categories) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(categories);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, multer,(req, res, next) => {
  const newCategory = new Categories({
    name: req.body.name,
    title : req.body.title,
    caption: req.body.caption,
    imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  });
  newCategory.save()
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

categoryRouter.route('/:categoryId')
.get((req,res,next) => {
    Products.aggregate([
        {
            $group: {
              _id: "$category",
              "count": {
                $sum: 1
              }
            }
          },
          {
            "$sort": {
              count: -1
            }
          }
    ], function (err, result) {
        res.json(result);
    }).allowDiskUse(true) //FIXME: use aggregate with promise
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /category/'+ req.params.categoryId);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, multer, (req, res, next) => {
    if(req.file)
    {
        Categories.findById(req.params.categoryId)
        .then((category) => {
            const filename = category.imageUrl.split('/uploads/')[1];
            const categoryUpdated = {
                name: req.body.name,
                title: req.body.title,
                caption: req.body.caption,
                imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
            }
            fs.unlink(`uploads/${filename}`, () => {
                Categories.updateOne({ _id: req.params.categoryId }, { ...categoryUpdated, _id: req.params.categoryId })
                .then((resp) => {
                    Products.find({category: category.name})
                        .then((products) => {
                            if(products.length !== 0){
                                products.forEach(element => {
                                element.category = req.body.name
                                element.save()
                                .then((product) => {
                                    res.status(200).json({ message: 'Category modifié !'})
                                })
                                .catch((err) => next(err)); 
                            })
                            }else{
                            res.status(200).json({ message: 'Category modifié !'})
                            }
                        })
                })
                .catch(err => console.log(err));
            })
        })
        .catch(err=> res.status(400).json({ error: err }));
    
    }else {
        //
        Categories.findById(req.params.categoryId)
        .then((category) => {
           const categoryUpdated = {
            name: req.body.name,
            title: req.body.title,
            caption: req.body.caption,
        }
        Categories.updateOne({ _id: req.params.categoryId }, { ...categoryUpdated, _id: req.params.categoryId })
        .then((resp) => {
            Products.find({category: category.name})
                .then((products) => {
                    if(products.length !== 0){
                        products.forEach(element => {
                        element.category = req.body.name
                        element.save()
                        .then((product) => {
                            res.status(200).json({ message: 'Category modifié !'})
                        })
                        .catch((err) => next(err)); 
                    })
                    }else{
                    res.status(200).json({ message: 'Category modifié !'})
                    }
            })
        })
        .catch(error => res.status(400).json({ error }));
        })
        .catch(err=> res.status(400).json({ error: err }));
    }
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Categories.findById(req.params.categoryId)
        .then((category)=> {
        const filename = category.imageUrl.split('/uploads/')[1];
        fs.unlink(`uploads/${filename}`, () => {
            Categories.deleteOne({_id : req.params.categoryId})
                .then((resp)=> {
                    Products.find({ category: category.name})
                     .then((products)=>{
                         if( products.length !== 0){
                            products.forEach(element => {
                            const image = element.imageUrl.split('/uploads/')[1];
                                fs.unlink(`uploads/${image}`, () => {
                                     Products.deleteMany({ category: category.name}) 
                                    .then((result) => {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(result);
                                    })
                                    .catch((err) => res.status(500).json({error :err}));
                                })
                            })
                         }else{
                            return res.status(200).json({
                                message: 'category deleted!'
                              })
                         }
                        console.log(category)
                     })
                     .catch((err) => res.status(500).json({error :err})); 
                })
                .catch((err) => res.status(500).json({error :err})); 
        })
          
    })
    .catch((err) => res.status(500).json({error :err})); 
});


// subCategories
categoryRouter.route('/:categoryId/subcategories')
.get((req,res,next) => {
    Categories.findById(req.params.categoryId)
    .then((category) => {
        if (category != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(category.subCategories);
        }
        else {
            res.status(404).json('Category ' + req.params.categoryId + ' not found');
        }
    },)
    .catch((err) => res.status(500).json({error :err}));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Categories.findById(req.params.categoryId)
    .then((category) => {
        if (category != null && req.body.subCategory) {
            category.subCategories.push(req.body.subCategory);
            category.save()
            .then((category) => {
                Categories.findById(category._id)
                .then((category) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(category);
                })            
            })
            .catch((err) => res.status(500).json({error :err}));
        }
        else {
            res.status(404).json('Category ' + req.params.categoryId + ' not found');
        }
    })
    .catch((err) => res.status(500).json({error :err}));
})
.put(authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Categories.findById(req.params.categoryId)
    .then((category) => {
        if (req.body.newSubCategory) {
            category.subCategories[category.subCategories.indexOf(req.body.oldSubCategory)] = req.body.newSubCategory;
            Categories.findByIdAndUpdate(req.params.categoryId, {
                $set: {subCategories : category.subCategories}
            }, { new: true })
            .then((category) => {
                Products.find({subCategory: req.body.oldSubCategory})
                .then((products) => {
                    if(products.length !== 0){
                        products.forEach(element => {
                        element.subCategory = req.body.newSubCategory
                        element.save()
                        .then((product) => {
                            res.status(200).json({result:"Subcategory and products updated successfully"})
                        })
                        .catch((err) => next(err)); 
                      })
                    }else{
                      res.status(200).json({result:"Subcategory and products updated successfully"})
                    }
                })
            .catch((err) => res.status(500).json({error :err}));
            })
            .catch((err) => res.status(500).json({error :err}));
        }
    })
    .catch((err) => res.status(500).json({error :err}));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Categories.findById(req.params.categoryId)
    .then((category) => {
        upadte = category.subCategories.filter(item => item !== req.query.subCategory)
        Categories.findByIdAndUpdate(req.params.categoryId, {
            $set: {subCategories : upadte}
        }, { new: true })
        .then((category) => {
            //
            Products.find({subCategory: req.query.subCategory})
            .then((products) => {
              if(products.length !==0){
                products.forEach(element => {
                    const filename = element.imageUrl.split('/uploads/')[1];
                   fs.unlink(`uploads/${filename}`, () => {
                       Products.deleteMany({ subCategory: req.query.subCategory}) 
                       .then((products) => {
                           res.statusCode = 200;
                           res.setHeader("Content-Type", "application/json");
                           res.json(products);
                       })
                       .catch((err) => res.status(500).json({error :err}));  
                   })
               });
              }else{
                return res.status(200).json({
                    message: 'subcategory deleted!'
                  })
              }
              
            })
            .catch((err) => res.status(500).json({error :err}));  
        })
       .catch((err) => res.status(500).json({error :'second'}));  
  })
  .catch((err) => res.status(500).json({error :err}));  
})


module.exports = categoryRouter;