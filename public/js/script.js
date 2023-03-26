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
    question.innerHTML = transcript.charAt(0).toUpperCase() + transcript.slice(1);
}

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {

  const formData = new FormData(form);

  fetch('/submit', {
    method: 'POST',
    body: formData
  })
});
