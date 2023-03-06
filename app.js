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


//*******OPENAI********
const config = new Configuration({
	apiKey: "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",
});

const openai = new OpenAIApi(config);

const runPrompt = async () => {
	const prompt = `
        Hello. Return response in the following parsable JSON format:

        {
            "Q": "question",
            "A": "answer"
        }

    `;

	const response = await openai.createCompletion({
		model: "text-davinci-002",
		prompt: prompt,
		max_tokens: 100,
		temperature: 1,
	});

	const parsableJSONresponse = response.data.choices[0].text;
	const parsedResponse = bodyParser.json().parse(parsableJSONresponse);

	console.log("Question: ", parsedResponse.Q);
	console.log("Answer: ", parsedResponse.A);
};

// runPrompt()
































//ROUTING
//route for Homepage
app.get('/',(req, res)=>{
    res.render('Index');
});

//Route for ChatPage 
app.get('/Chat',(req, res)=>{
	res.render('Chat',{value: parsableJSONresponse});
});

//Route for To-Do page
app.get('/To-do',(req,res)=>{
	res.render('To-do')
})
app.listen(port,()=>console.log(`Server is running on port ${port}`));