var express = require('express');
var router = express.Router();
var db = require('../models');
var helpers = require('../helpers/index')

//List all todos
router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodo);

router.route('/:todoId')
    .put(helpers.updateTodo)
    .get(helpers.showTodo)
    .delete(helpers.deleteTodo);

module.exports = router;
