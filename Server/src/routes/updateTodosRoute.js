const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
    const {id} = req.params;
    const todo_item = await TodoModel.findById(id);
    todo_item.completed = req.body.completed;
    todo_item.text = req.body.text;
    await todo_item.save();
    res.json(todo_item);
}
