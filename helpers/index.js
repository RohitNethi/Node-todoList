var db = require('../models');

exports.getTodos = function(req,res){
    db.Todo.find()
    .then(function(foundTodos){
        res.json(foundTodos);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.createTodo = function(req,res){
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.status(201).json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    })
    
}

exports.updateTodo = function(req,res){
    db.Todo.findByIdAndUpdate({_id: req.params.todoId}, req.body)
    .then(function(newTodo){
        res.json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    })
    
}

exports.showTodo = function(req,res){
    db.Todo.findById({_id:req.params.todoId})
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.deleteTodo = function(req,res){
    db.Todo.remove({_id: req.params.todoId})
    .then(function(newTodo){
        res.json({message: 'Todo was deleted!'});
    })
    .catch(function(err){
        res.send(err);
    })
    
}

module.exports = exports;