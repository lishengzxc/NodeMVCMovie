var Movie = require('../models/movie');
var Category = require('../models/category');

exports.index = function (req, res) {
  Category.find().populate({
    path: 'movies',
    option: {
      limit: 5
    }
  }).exec(function (err, categories) {
    res.render('index', {
      title: '首页',
      categories: categories
    });
  });

};

