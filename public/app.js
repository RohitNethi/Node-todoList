/* global $ */

$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function(err){
        console.log(err);
    })
    
    $('#todoInput').keypress(function(event){
        if(event.which ==13 ){
            createTodo();
        }
    })
    
    $('.list').on('click', 'li', function(event){
        updateTodo($(this));
    })
    
    $('.list').on('click', 'span', function(event){
        event.stopPropagation();
        removeTodo($(this).parent())
    })
});

function addTodo(todo){
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
        newTodo.data("id",todo._id);
        if(todo.completed){
            newTodo.addClass('done');
        }
        $('.list').append(newTodo);
}

function addTodos(todos){
    //add todos to list
    todos.forEach(function(todo){
        addTodo(todo);
});
}

function createTodo(){
    //Create new todo
    var userInput = $('#todoInput').val();
    $.post("/api/todos",{name: userInput})
    .then(function(newTodo){
        $('#todoInput').val('');
        addTodo(newTodo);
    })
    .catch(function(err){
        console.log(err);
    });
}

function removeTodo(todo){
    var todoId = todo.data('id');
    var deleteUrl = '/api/todos/' + todoId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(function(data){
        todo.remove();
    })
}

function updateTodo(todo){
    var todoId = todo.data('id');
    var updateUrl = '/api/todos/' + todoId;
    var todoStatus = !todo.data('completed');
    var updateData = {completed: todoStatus }
    $.ajax({
        method:'PUT',
        url: updateUrl,
        data: updateData
    })
    .then(function(updatedTodo){
        todo.toggleClass('done');
        todo.data('completed', todoStatus);
        console.log(todo);
    })
    
    
}