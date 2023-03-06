const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


const app = express();

const port = 5001;

//MIDDLEWARE
//middleware for templating engine
app.set('view engine', 'ejs');

//middlleware for static files
app.use(express.static('public'));

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
//route for Homepage
app.get('/',(req, res)=>{
    res.render('Index');
});

//Route for ChatPage 
app.get('/Chat',(req, res)=>{
	res.render('Chat');
});

//Route for To-Do page
app.get('/To-do',(req,res)=>{
	res.render('To-do')
})
app.listen(port,()=>console.log(`Server is running on port ${port}`));