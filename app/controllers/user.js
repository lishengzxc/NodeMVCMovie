var User = require('../models/user');

exports.signup = function (req, res) {
    var _user = req.body.user;
    var user = new User(_user);

    user.save(function (err, user) {
        if (err) console.log(err);
        res.redirect('/');
    });
};

exports.logout = function (req, res) {
    delete req.session.user;
    res.redirect('/');
};

exports.signin = function (req, res) {
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;

    User.findOne({name: name}, function (err, user) {
        if (err) console.log(err);
        if (!user) {
            return res.redirect('/signup');
        } else {
            user.comparePassword(password, function (err, isMatch) {
                if (err) console.log(err);
                if (isMatch) {
                    req.session.user = user;
                    return res.redirect('/');
                } else {
                    return res.redirect('/signin');
                    console.log('password error');
                }
            })
        }
    });
};

exports.list = function (req, res) {
    User.fetch(function (err, users) {
        if (err) console.log(err);
        res.render('userlist', {
            title: '用户列表页',
            users: users
        });
    });
};

exports.showSignIn = function (req, res) {
    res.render('signin', {
        title: '登陆页面'
    });
};

exports.showSignUp = function (req, res) {
    res.render('signup', {
        title: '注册页面'
    });
};