var express = require('express')
  , bodyParser = require('body-parser')
  , app = express()
  , mongoose = require('mongoose/')
  , Schema = mongoose.Schema
  , Records = new Schema({
      key:   {type: String, unique: true}
      ,value:   String
      ,createdAt:   Date
  });

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

mongoose.connect('mongodb://dbUser:dbPassword@ds155428.mlab.com:55428/getir-bitaksi-hackathon');

app.post('/getRecord', function (req, res, next) {

    var key = req.body.key
        , myRecords = mongoose.model('records', Records)
        ;

    if(!key) {
       return res.end('post is empty!');
    }

    var query = myRecords.findOne({ 'key': key }, '-_id');

    query.exec(function (err, item) {
        if (err) return next(err);
        res.json(item);
    });
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.end(err.message);
});

app.listen(2020, function () {
    console.log('Example app listening on port 3000!')
});
