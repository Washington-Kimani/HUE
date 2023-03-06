const btn = document.getElementById('btn');
const question = document.getElementById('question');

const SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition;


btn.addEventListener('click', ()=>{
    recognition.start();
    
    
})
recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    question.textContent = transcript;
    speakThis(transcript.toLowerCase());
}

question.textContent = 'Washington Kimani'