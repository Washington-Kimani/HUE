const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const LogInCollection = require('./Models/mongo');
const Todo = require('./Models/todo')


const app = express();

const port = 5002;

//MIDDLEWARE
//middleware for templating engine
app.set('view engine', 'ejs');

//middlleware for static files
app.use(express.static('public'))

//Middleware for body-parser

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


//parse application/json
app.use(bodyParser.json());

//Middleware for methodOverride
app.use(methodOverride('_method'));


//CONNECT TO DATABASE
const url = 'mongodb://127.0.0.1:27017/HUE'

mongoose.connect(url,{
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(()=>{
	console.log('Connected to Database')
}).catch(err=> console.log(err))

//ROUTING
//route for Login
app.get('/',(req, res)=>{
    res.render('Login',{value:''});
});

//Route for Signup 
app.get('/Signup',(req, res)=>{
	res.render('Signup', {value: ''});
});

//Route for Home page
app.get('/Home',(req, res)=>{
	res.render('Home')
})

//Route for ChatPage 
app.get('/Chat',(req, res)=>{
	res.render('Chat');
});

//Route for To-Do page
//GET to-dos
app.get('/Todo',(req,res)=>{
	Todo.find()
    .then(result=>{
        res.render('Todo',{ data: result })
    })
})

//POST todos
app.post('/Todo', (req, res)=>{
    const todo = new Todo({
        todo: req.body.todo
    })

    todo.save().then(()=>{
        res.redirect('Todo')
    }).catch(err=>{
        console.log(err);
    })
})

//DELETE todos
app.delete('/Todo/:id',(req, res)=>{
    Todo.deleteOne({
        _id: req.params.id
    }).then(()=>{
        res.redirect('/Todo');
    }).catch(err=>{
        console.log(err);
    })
})

//Route for signing up
app.post('/Signup', async (req, res) => {
    
    const data = new LogInCollection({
        name: req.body.name,
        password: req.body.password
    })
    await data.save()


    const checking = await LogInCollection.findOne({ name: req.body.name })
   try{
    if (checking.name === req.body.name && checking.password===req.body.password) {
        res.send('<h1>Error: 404</h1> <p>User Already Exists!!</p>')
    }
    else{
        await LogInCollection.insertMany([data])
        res.render('Login')
    }
   }
   catch{
    res.send("Something went wrong")
   }
    res.status(201).render("Home");
})

//Route for Login
app.post('/Login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name })
        if (check.password === req.body.password) {
            res.status(201).render("Home")
        }
		else {
            res.render('Login', {value:'Username or password incorrect!'});
        }
    } 
    catch (e) {
        res.status(404).send('<h1>Error: 404</h1> <p>User Not Found. Try to sign up first!!</p>');
    }
})

//Connect to Server
app.listen(port,()=>console.log(`Server is running on port ${port}`));