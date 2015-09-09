var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/artists');

var artistSchema = mongoose.Schema({
  name: String,
  shortname: String,
  reknown: String,
  bio: String
});

var Artist = mongoose.model('Artist', artistSchema);

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('./static'));

app.get('/api', function(req, res, next) {
  Artist.find().
    exec(function(err, artists) {
      if (err) { return next(err) }
      res.json(artists);
    })
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
