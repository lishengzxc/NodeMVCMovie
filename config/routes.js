var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');

module.exports = function (app) {
    app.use(function (req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user;
        next();
    });

    app.get('/', Index.index);

    app.get('/movie/:id', Movie.detail);
    app.get('/admin/movie', Movie.admin);
    app.get('/admin/movie/update/:id', Movie.update);
    app.post('/admin/movie/new', Movie.save);
    app.delete('/admin/list', Movie.del);
    app.get('/admin/list', Movie.list);

    app.post('/user/signup', User.signup);
    app.get('/logout', User.logout);
    app.post('/user/signin', User.signin);
    app.get('/user/list', User.list);
    app.get('/signin', User.showSignIn);
    app.get('/signup', User.showSignUp);
};

