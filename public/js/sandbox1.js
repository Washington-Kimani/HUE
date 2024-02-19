const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const main = document.querySelector('.main');



function speak(greetings) {
    const text_speak = new SpeechSynthesisUtterance();


    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = 'en-GB';


    function wishMe() {
        let day = new Date();
        let hr = day.getHours();
    
        if(hr >= 0 && hr < 12) {
            const finalText = 'Good Morning';
            text_speak.speak = finalText;
        }
    
        else if(hr > 12 && hr <= 17) {
            const finalText = 'Good Afternoon';
            text_speak.speak = finalText;
        }
    
        else {
            const finalText = 'Good Afternoon';
            text_speak.speak = finalText;
        }
    }
    
    window.addEventListener('load', ()=>{
        text_speak.speak= "Activating HUE";
        text_speak.speak = "Going online";
        wishMe();
    })
}



const SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition;


btn.addEventListener('click', ()=>{
    recognition.start();
})

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    speakThis(transcript.toLowerCase());
}


function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.lang = "en-GB";


    main.style.background = 'rgba(0, 0, 0, .7) url(/images/back.gif) no-repeat'
    main.style.backgroundPosition = 'center'

    speech.text = "I did not understand what you said please try again";

    if(message.includes('hey') || message.includes('hello')) {
        const finalText = "Hello there!";
        speech.text = finalText;
    }

    else if(message.includes('how are you')) {
        const finalText = "I am fine. How can I help you";
        speech.text = finalText;
    }

    else if(message.includes('your name')) {
        const finalText = "My name is HUE.I was developed by Washington and Alexander. What's yours?";
        speech.text = finalText;
    }

    else if (message.includes('my name is')) {
        const userName = message.slice(11, undefined)
        finalText = 'Nice to meet you ' + userName + "." + "How may I be of help today?";
        speech.text = finalText;
    }

    else if(message.includes('old are you') || message.includes('your age')){
        const bDay = new Date(2023, 1, 20, 10, 30, 0, 0);
        const cDate = new Date();
        let diff = cDate - bDay;
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const week = day * 7;
        const month = day * 30;
        const year  = month * 12;

        if(Math.floor(diff/month) > 12){
            finalText ='I am ' + Math.floor(diff/year) + ' years old';
        }

        else if(Math.floor(diff/day) > 30){
            finalText ='I am ' + Math.floor(diff/month) + ' months old';
        }
        else if(Math.floor(diff/week) < 4){
            finalText = `I am ${Math.floor(diff/week)} weeks old`;
        }

        else {
            finalText ='I am ' + Math.floor(diff/day) + ' days old';
        }

        speech.text = finalText;
    }

    else if(message.includes('open google')) {
        window.open("https://google.com", "_blank");
        const finalText = "Opening Google";
        speech.text = finalText;
    }

    else if(message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        const finalText = "Opening instagram";
        speech.text = finalText;
    }

    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speech.text = finalText;
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = "THe time is "+time;
        speech.text = finalText;
    }

    else if(message.includes('date') || message.includes('today')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = "Today is on "+date;
        speech.text = finalText;
    }
    
    else if(message.includes('open mail')) {
    	window.open('https://mail.google.com/mail/?tab=rm&ogbl', '_blank');
    	const finalText = 'Opening email';
    	speech.text = finalText;
    }

    else if(message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speech.text = finalText;
    }
    else if(message.includes('open to-do list')){
        window.open('/Todo', '_blank')
        const finalText = 'Opening your To-dos'
        speech.text = finalText;
    }
    else if (message.includes('open visual studio')){
        window.open('code:///');
        const finalText = "Opening Visual Studio Code";
        speech.text = finalText;
    }

    else {
        const qaArray = {
            data: [
                {
                    question: "What is the capital of Afghanistan?",
                    answer: "Kabul"
                },
                {
                    question: "What is the smallest country in the world?",
                    answer: "Vatican City"
                },
                {
                    question: "What is the currency of Brazil?",
                    answer: "Brazilian real"
                },
                {
                    question: "Who is the founder of Amazon?",
                    answer: "Jeff Bezos"
                },
                {
                    question: "What is the name of the largest ocean on Earth?",
                    answer: "Pacific Ocean"
                },
                {
                    question: "What is the largest continent on Earth?",
                    answer: "Asia"
                },
                {
                    question: "What is the highest mountain in Africa?",
                    answer: "Mount Kilimanjaro"
                },
                {
                    question: "What is the currency of China?",
                    answer: "Renminbi (yuan)"
                },
                {
                    question: "What is the name of the longest river in the world?",
                    answer: "Nile"
                },
                {
                    question: "Who wrote the novel 'Pride and Prejudice'?",
                    answer: "Jane Austen"
                },
                {
                    question: "What is the name of the first man to walk on the moon?",
                    answer: "Neil Armstrong"
                },
                {
                    question: "What is the largest organ in the human body?",
                    answer: "Skin"
                },
                {
                    question: "Who is the author of the book '1984'?",
                    answer: "George Orwell"
                },
                {
                    question: "What is the currency of India?",
                    answer: "Indian rupee"
                },
                {
                    question: "What is the largest desert in the world?",
                    answer: "Sahara"
                },
                {
                    question: "What is your favorite color?",
                    answer: "As an AI language model, I don't have a favorite color."
                },
                {
                    question: "What is the capital of France?",
                    answer: "The capital of France is Paris."
                },
                {
                    question: "How do you create an object in JavaScript?",
                    answer: "There are different ways to create objects in JavaScript, but the most common one is by using object literals {}."
                },
                {
                    question: "What is the difference between null and undefined in JavaScript?",
                    answer: "Null is a value that represents the intentional absence of any object value, while undefined is a value assigned by JavaScript to variables that have not been assigned a value."
                },
                {
                    question: "What is a callback function in JavaScript?",
                    answer: "A callback function is a function that is passed as an argument to another function and is executed inside the function body."
                },
                {
                    question: "What is the difference between let and var in JavaScript?",
                    answer: "The main difference between let and var is that var has function scope, while let has block scope."
                },
                {
                    question: "What is a closure in JavaScript?",
                    answer: "A closure is a function that has access to variables in its outer lexical environment, even after the outer function has returned."
                },
                {
                    question: "What is the spread operator in JavaScript?",
                    answer: "The spread operator (...) is a syntax for expanding an iterable object (e.g. an array) into individual elements, or for combining multiple objects into one."
                },
                {
                    question: "What is the difference between synchronous and asynchronous code?",
                    answer: "Synchronous code is executed in sequence, blocking the execution of other code until it has completed. Asynchronous code, on the other hand, allows other code to be executed while it is waiting for a non-blocking operation to complete."
                },
                {
                    question: "Who painted the 'Mona Lisa'?",
                    answer: "Leonardo da Vinci"
                }
            ]
            }
            qaArray.data.forEach((elem)=>{
                if(elem.question.toLowerCase().includes(message)){
                    speech.text = elem.answer;
                }
                
            })
          
    }

    speech.volume = 2;
    speech.pitch = '-1';
    speech.rate = 1;

    speech.onend = e => {
        console.log('done speaking...');
        main.style.background = '#000';
        recognition.start();
    }

    window.speechSynthesis.speak(speech);
}

