const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const User = require("./models/user");
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('64f468404737649c767613e2')
    .then(user => {
      req.user = user
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://poonam:gautam23@cluster0.oeyakd6.mongodb.net/')
.then(() => {
  User.findOne().then(user => {
    if(!user) {
      const user = new User({
        name: 'poonam',
        email : "ex@ex",
        cart : {
          title : []
        }
      })
      user.save();
    }
  })
  
  console.log('connected');
  app.listen(3000, () => console.log("server is running on port 3000"))
})
.catch(err => console.log(err))