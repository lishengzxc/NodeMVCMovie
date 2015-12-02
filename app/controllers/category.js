var Category = require('../models/category');

exports.admin = function (req, res) {
  res.render('category_admin', {
    title: '分类录入页',
    category: {}
  })
};

exports.save = function (req, res) {
  var _category = req.body.category;
  var category = new Category(_category);
  category.save(function (err, category) {
    if (err) console.log(err);
    console.log(category);
    res.redirect('/admin/categoryList');
  })
};

exports.list = function (req, res) {
  Category.fetch(function (err, categories) {
    if (err) console.log(err);
    res.render('category_list', {
      title: '分类列表页',
      categories: categories
    });
  });
};