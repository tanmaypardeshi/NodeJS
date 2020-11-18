let express = require('express');
let todoController = require('./controllers/todocontroller');

let app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

todoController(app);


app.listen(3000);
console.log('Listening to port 3000...');

