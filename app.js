const express = require('express'),
session = require('express-session'),
mongoose = require('mongoose'),
passport = require('passport'),
localStrategy = require('passport-local').Strategy,
methodOverride = require('method-override'),
bcrypt = require('bcrypt'),
User = require('./Models/users'),
Todo = require('./Models/todo');


const app = express();

const port = process.env.PORT || 5002;

//CONNECT TO DATABASE
const url = 'mongodb://127.0.0.1:27017/HUE'

mongoose.connect(url,{
}).then(()=>{
	console.log('Connected to Database')
}).catch(err=> console.log(err))

//MIDDLEWARE
//middleware for templating engine
app.set('view engine', 'ejs');

//middlleware for static files
app.use(express.static('public'))
app.use(session({
	secret: 'verygoodsecret',
	resave: false,
	saveUninitialized: true
}))

//Middleware for body-parser

//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));


//parse application/json
app.use(express.json());

//Middleware for methodOverride
app.use(methodOverride('_method'));
app.use(passport.session())
app.use(passport.initialize())

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

passport.use(new localStrategy(function (username, password, done) {
	User.findOne({ username: req.body.username }, function (err, user) {
		if (err) return done(err);
		if (!user) return done(null, false, { message: 'Incorrect username.' });

		bcrypt.compare(password, req.body.password, function (err, res) {
			if (err) return done(err);
			if (res === false) return done(null, false, { message: 'Incorrect password.' });
			
			return done(null, user);
		});
	});
}));

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/');
}

function isLoggedOut(req, res, next) {
	if (!req.isAuthenticated()) return next();
	res.redirect('/Home');
}

//ROUTING

app.get('/Signup', (req, res) => {
	res.render("Signup");
});

//Route for Login
app.get('/', isLoggedOut, (req, res) => {
	const response = {
		error: req.query.error
	}

	res.render('Login', response);
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/Home',
	failureRedirect: '/?error=true'
}));

// Setup our admin user
app.post('/Signup', async (req, res) => {
	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(req.body.password, salt)

	const data = new User({
		username: req.body.username,
		password: hash
	})

	data.save().then(()=>{
		res.render('Login')
	})
});
app.get('/Chat',(req,res)=>{
	res.render('Chat')
})
app.get('/Todo',isLoggedIn, (req, res)=>{
    Todo.find()
    .then(result =>{
        res.render('Todo', {data: result})
        // console.log(result);
    }).catch(err =>{console.log(err)})
})

app.post('/Todo',(req, res)=>{
    const todo = new Todo({
        todo: req.body.todo
    })

    todo.save().then(()=>{
        res.redirect('/Todo')
    })
})

app.delete('/Todo/:id',(req, res)=>{
    Todo.deleteOne({
        _id: req.params.id
    }).then(()=>{
        res.redirect('/Todo')
    })
})
//Connect to Server
app.listen(port,()=>console.log(`Server is running on port ${port}`));