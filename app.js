const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const LogInCollection = require('./Models/mongo');
const runPrompt = require('./Models/index')


const app = express();

const port = 5000;

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
app.get('/To-do',(req,res)=>{
	res.render('To-do')
})

app.post('/Signup', async (req, res) => {
    
    const data = new LogInCollection({
        name: req.body.name,
        password: req.body.password
    })
    await data.save()


    const checking = await LogInCollection.findOne({ name: req.body.name })
   try{
    if (checking.name === req.body.name && checking.password===req.body.password) {
        res.redirect('/');
    }
    else{
        await LogInCollection.insertMany([data])
    }
   }
   catch{
    res.render('Login')
   }
    res.status(201).render("Home");
})
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
        res.send('ENTER CORRECT DEATAILS!!!!!');
    }
})

// runPrompt

app.listen(port,()=>console.log(`Server is running on port ${port}`));