const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes//places-routes');
//require('events').defaultMaxListeners = 15;

const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-errors');
const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads','images')));


app.use((req, res, next) =>{
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
);
res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE');

next();
});

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    const error = new HttpError('해당 경로를 찾을 수 없습니다.', 404);
    throw error;
});

app.use((error, req, res, next)=> {
  if(req.file) {
   fs.unlink(req.file.path, err => {

   });
}
 
    if (res.headerSent) {
     return next(error);
 }
 res.status(error.code || 500);
 res.json({message: error.message || '에러가 발생했습니다.'});
});

mongoose
.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster100-gnyvm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{ useNewUrlParser: true , useUnifiedTopology: true })
.then( () => {
    app.listen(5000);
}
)
.catch( err => {
    console.log(err);
});
