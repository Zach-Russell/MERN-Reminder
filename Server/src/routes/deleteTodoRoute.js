const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
    const {id} = req.params;
    const todo_item = await TodoModel.findById(id);
    
    await todo_item.deleteOne();

    res.status(204).json(todo_item);
}