var Movie = require('../models/movie');
var Comment = require('../models/comment');
var Category = require('../models/category');
var _ = require('underscore');


exports.detail = function (req, res) {
  var id = req.params.id;
  Movie.findById(id, function (err, movie) {
    Comment
      .find({movie: id})
      .populate('from', 'name')
      .populate('reply.from reply.to')
      .exec(function (err, comments) {
        res.render('detail', {
          title: '详情页',
          movie: movie,
          comments: comments
        });
      });

  });
};

exports.admin = function (req, res) {
  Category.find({}, function (err, categories) {
    res.render('admin', {
      title: '后台录入页',
      categories: categories,
      movie: {}
    });
  });

};

exports.update = function (req, res) {
  var id = req.params.id;
  if (id) {
    Movie.findById(id, function (err, movie) {
      res.render('admin', {
        title: '后台更新页',
        movie: movie
      });
    })
  }
};

exports.save = function (req, res) {
  var id = req.body.movie._id;
  var _movie = req.body.movie;
  var __movie;

  if (id) {
    Movie.findById(id, function (err, movie) {
      if (err) console.log(err);
      __movie = _.extend(movie, _movie);
      __movie.save(function (err, movie) {
        if (err) console.log(err);
        res.redirect('/movie/' + movie._id);
      });

    });
  } else {
    __movie = new Movie({
      doctor: _movie.doctor,
      title: _movie.title,
      country: _movie.country,
      language: _movie.language,
      year: _movie.year,
      poster: _movie.poster,
      summary: _movie.summary,
      flash: _movie.flash,
      category: _movie.category
    });

    var categoryId = __movie.category;

    __movie.save(function (err, movie) {
      if (err) console.log(err);
      Category.findOne({_id: categoryId}, function (err, category) {
        category.movies.push(movie._id);
        category.save(function (err) {
          res.redirect('/movie/' + movie._id);
        });
      });
    });
  }
};

exports.del = function (req, res) {
  var id = req.query.id;
  if (id) {
    Movie.remove({_id: id}, function (err, movie) {
      if (err) {
        console.log(err);
        res.json({success: 0})
      }
      else {
        res.json({success: 1})
      }
    })
  }
};

exports.list = function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err) console.log(err);
    res.render('list', {
      title: '列表页',
      movies: movies
    });
  });
};