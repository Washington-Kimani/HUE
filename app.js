const express = require('express'),
session = require('express-session'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
passport = require('passport'),
localStrategy = require('passport-local').Strategy,
methodOverride = require('method-override'),
bcrypt = require('bcrypt')
User = require('./Models/users'),
Todo = require('./Models/todo');


const app = express();

const port = 5002;

//CONNECT TO DATABASE
const url = 'mongodb://127.0.0.1:27017/HUE'

mongoose.connect(url,{
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(()=>{
	console.log('Connected to Database')
}).catch(err=> console.log(err))

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

//More middleware
app.use(session({
	secret: "verygoodsecret",
	resave: false,
	saveUninitialized: true
}));

// Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

passport.use(new localStrategy(function (username, password, done) {
	User.findOne({ username: username }, function (err, user) {
		if (err) return done(err);
		if (!user) return done(null, false, { message: 'Incorrect username.' });

		bcrypt.compare(password, user.password, function (err, res) {
			if (err) return done(err);
			if (res === false) return done(null, false, { message: 'Incorrect password.' });
			
			return done(null, user);
		});
	});
}));

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/Home');
}

function isLoggedOut(req, res, next) {
	if (!req.isAuthenticated()) return next();
	res.redirect('/');
}



//ROUTING
//Route for Login
app.get('/', isLoggedIn, (req, res) => {
	res.render("Home");
});

//
app.get('/Signup', (req, res) => {
	res.render("Signup");
});

app.get('/Login', isLoggedOut, (req, res) => {
	res.render('Login');
});

app.post('/Login', passport.authenticate('local', {
	successRedirect: '/Home',
	failureRedirect: '/login?error=true'
}));

app.get('/Logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

// Setup our admin user
app.post('/Signup', async (req, res) => {
	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash(req.body.password, salt, function (err, hash) {
			if (err) return next(err);
			
			const data = new User({
				username: req.body.username,
				password: hash
			});

			data.save();

			res.redirect('/Login');
		});
	});
});
app.get('/Chat',(req,res)=>{
	res.render('Chat')
})
app.get('/Todo', (req, res)=>{
    Todo.find()
    .then(result =>{
        res.render('Index', {data: result})
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
// //Route for signing up
// app.post('/Signup', async (req, res) => {
    
//     const data = new LogInCollection({
//         name: req.body.name,
//         password: req.body.password
//     })
//     await data.save()


//     const checking = await LogInCollection.findOne({ name: req.body.name })
//    try{
//     if (checking.name === req.body.name && checking.password===req.body.password) {
//         res.send('<h1>Error: 404</h1> <p>User Already Exists!!</p>')
//     }
//     else{
//         await LogInCollection.insertMany([data])
//         res.render('Login')
//     }
//    }
//    catch{
//     res.send("Something went wrong")
//    }
//     res.status(201).render("Home");
// })

// //Route for Login
// app.post('/Login', async (req, res) => {
//     try {
//         const check = await LogInCollection.findOne({ name: req.body.name })
//         if (check.password === req.body.password) {
//             res.status(201).render("Home")
//         }
// 		else {
//             res.render('Login', {value:'Username or password incorrect!'});
//         }
//     } 
//     catch (e) {
//         res.status(404).send('<h1>Error: 404</h1> <p>User Not Found. Try to sign up first!!</p>');
//     }
// })

//Connect to Server
app.listen(port,()=>console.log(`Server is running on port ${port}`));