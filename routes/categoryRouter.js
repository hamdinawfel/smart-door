require('dotenv').config()
const express = require('express');
const fs = require('fs');
// const Products = require('../models/products');
const Categories = require('../models/category');

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
    imageUrl: `/uploads/${req.file.filename}`
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
.put(authenticate.verifyUser, authenticate.verifyAdmin,multer, (req, res, next) => {
    if(req.file)
    {
        Categories.findById(req.params.categoryId)
        .then((category) => {
            const filename = category.imageUrl.split('/uploads/')[1];
            const categoryUpdated = {
                name: req.body.name,
                title: req.body.title,
                caption: req.body.caption,
                imageUrl: `/uploads/${req.file.filename}`
            }
            fs.unlink(`uploads/${filename}`, () => {
                Categories.updateOne({ _id: req.params.categoryId }, { ...categoryUpdated, _id: req.params.categoryId })
                .then(() => res.status(200).json({ message: 'Category modifié !'}))
                .catch(err => console.log(err));
            })
        })
        .catch(err=> res.status(400).json({ error: err }));
    
    }else {
        const categoryUpdated = {
            name: req.body.name,
            title: req.body.title,
            caption: req.body.caption,
        }
        Categories.updateOne({ _id: req.params.categoryId }, { ...categoryUpdated, _id: req.params.categoryId })
        .then(() => res.status(200).json({ message: 'Category modifié !'}))
        .catch(error => res.status(400).json({ error }));
    }
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /category/'+ req.params.categoryId);
});
// .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//     Categories.findById(req.params.categoryId)
//     .then((category) => {
//         const filename = category.imageUrl.split('/uploads/')[1];
//         fs.unlink(`uploads/${filename}`, () => {
//            Products.deleteMany({ category: category.name})
//              .then((produts)=>{
//                 Categories.deleteOne({_id : req.params.categoryId})
//                 .then( (resp)=> {
//                  res.statusCode = 200;
//                  res.setHeader('Content-Type', 'application/json');
//                  res.json(resp);
//                })
//              })
//         })
//     }, (err) => next(err))
//     .catch((err) => next(err));
// });

// subCategpries
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
    Categories.findById(req.params.categoryId).then((category) => {
        if (category != null && category.subCategories.indexOf(req.body.oldSubCategory) !== -1) {
            if (req.body.newSubCategory) {
                category.subCategories[category.subCategories.indexOf(req.body.oldSubCategory)] = req.body.newSubCategory;
                Categories.findByIdAndUpdate(req.params.categoryId, {
                    $set: {subCategories : category.subCategories}
                }, { new: true })
                .then((category) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(category);
                })
                .catch((err) => res.status(500).json({error :err}));
            }else{
                upadte = category.subCategories.filter(item => item !== req.body.oldSubCategory)
                Categories.findByIdAndUpdate(req.params.categoryId, {
                    $set: {subCategories : upadte}
                }, { new: true })
                .then((category) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(category);
                })
                .catch((err) => res.status(500).json({error :err}));
            }
        } else if (category == null) {
            res.status(404).json('Category ' + req.params.categoryId + ' not found');
        } else {
            res.status(404).json('SubCategory ' + req.body.oldSubCategory + ' not found');
        }
    })
    .catch((err) => res.status(500).json({error :err}));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /category/'+ req.params.categoryId+'/subcategories');
});


module.exports = categoryRouter;