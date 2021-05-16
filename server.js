require('dotenv').config()
const express = require('express')
var sslRedirect = require('heroku-ssl-redirect').default;
var cors = require('cors')
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");

//Load routes
const users = require("./routes/users");
const subscriberRouter = require("./routes/subscriberRouter");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const catalogRouter = require("./routes/catalogRouter");

// const adminRouter = require("./routes/adminRouter");
// const orderRouter = require("./routes/orderRouter");
// const deliveryRouter = require("./routes/deliveryRouter");
// const cancelRouter = require("./routes/cancelRouter");
// const locationRouter = require("./routes/locationRouter");

const app = express()
app.use(express.json());
app.use(sslRedirect());

// Connect to MongoDB
const url = 'mongodb://localhost:27017/smart-door'; 
// const url = process.env.mongoURI
mongoose
.connect(url, {
useUnifiedTopology: true,
useNewUrlParser: true,
useCreateIndex:true,
useFindAndModify: false 
})
.then(() => console.log('MongoDB successfully connected'))
.catch(err => {
console.log(`DB Connection Error: ${err.message}`);
});
app.use(cors())
// upload file middlware -folder
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
// cors middleware
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*',);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,content-type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Passport middleware
app.use(passport.initialize());

// Routes

app.use("/users", users);
app.use("/subscribe", subscriberRouter);
app.use('/category', categoryRouter);
app.use('/products', productRouter);
app.use('/catalog', catalogRouter);

// app.use("/admin", adminRouter);
// app.use('/orders', orderRouter);
// app.use('/deliveries', deliveryRouter);
// app.use('/cancels', cancelRouter);


// Production set up
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));
  app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
  }
// port
const port = process.env.PORT || 8081;
app.listen(port, ()=> console.log(`Server running on port : ${port}`));
