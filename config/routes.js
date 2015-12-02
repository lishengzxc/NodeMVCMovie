var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Comment = require('../app/controllers/comment');
var Category = require('../app/controllers/category');

module.exports = function (app) {
  app.use(function (req, res, next) {
    var _user = req.session.user;
    app.locals.user = _user;
    next();
  });

  app.get('/', Index.index);

  app.get('/movie/:id', Movie.detail);
  app.get('/admin/movie', User.signinRequired, User.adminRequired, Movie.admin);
  app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update);
  app.post('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.save);
  app.delete('/admin/list', User.signinRequired, User.adminRequired, Movie.del);
  app.get('/admin/list', User.signinRequired, User.adminRequired, Movie.list);

  app.post('/user/signup', User.signup);
  app.get('/logout', User.logout);
  app.post('/user/signin', User.signin);
  app.get('/admin/userlist', User.signinRequired, User.adminRequired, User.list);
  app.get('/signin', User.showSignIn);
  app.get('/signup', User.showSignUp);

  app.post('/user/comment', User.signinRequired, Comment.save);

  app.get('/admin/category', User.signinRequired, User.adminRequired, Category.admin);
  app.post('/admin/category/new', User.signinRequired, User.adminRequired, Category.save);
  app.get('/admin/categorylist', User.signinRequired, User.adminRequired, Category.list);
};


