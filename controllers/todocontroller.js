let bodyParser = require('body-parser');
let mongoose = require('mongoose');

// Connect to the database
mongoose.connect("mongodb+srv://test:test@todo.lxxri.mongodb.net/<dbname>?retryWrites=true&w=majority")

let todoSchema = new mongoose.Schema({
    item: String
});

let Todo = mongoose.model('Todo', todoSchema);

let urlEncodedParser = bodyParser.urlencoded({extended: false})

module.exports = function(app) {
    app.get('/todo', function(req, res){
        Todo.find({}, function(err, data) {
            if(err) throw err;
            res.render('todo', {data: data})
        })
    }); 

    app.post('/todo', urlEncodedParser, function(req, res) {
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data)
        })
    });

    app.delete('/todo/:item', function(req,res) {
        Todo.find({item:req.params.item.replace(/\-/g, ' ')}).remove(function(err, data) {
            if(err) throw err;
            res.json(data);
        })
    })
};