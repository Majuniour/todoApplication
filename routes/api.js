var mongoose = require('mongoose').Types.ObjectId;
var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

/* GET /api/todos */

router.get('/todos', function (req, res, next) {
  var data = "Working";
  res.send(data);
});

router.get('/get_todos', function (req, res, next) {

  // use mongoose to get all todos in the database
  Todo.find(function (err, todos) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err)

    res.json(todos); // return all todos in JSON format
  });
});

// create todo and send back all todos after creation
router.post('/post_todo', function (req, res) {

  // create a todo, information comes from AJAX request from Angular
  Todo.create({
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    status: req.body.status,
    done: false
  }, function (err, todo) {
    if (err)
      res.send(err);

    // get and return all the todos after you create another
    Todo.find(function (err, todos) {
      if (err)
        res.send(err)
      res.json(todos);
    });
  });

});

// delete a todo
  router.delete('/delete_todo/:id?', function (req, res) { 
    Todo.findById(req.params.id, function(err, data){
      console.log("data", req.params.id);
    Todo.remove({
        _id: req.params.id
    }, function (err, todos) {
        if (err) 
        return res.send(err);
        res.json({ message: 'Deleted' });
    });
  });
});
// update a todo
router.route('/update_todo/:id')
  // update the todo with this id ()
  .put(function (req, res) {
      // use our todo model to find the todo we want
      Todo.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, todo) {
        if (err) return res.status(500).send("There was a problem updating the todo.");
        res.status(200).send(todo);
    });
      });
  module.exports = router;