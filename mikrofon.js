const btn =document.querySelector('.talk')



const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function (){
 console.log('Stemmer lytter');

}
 
recognition.onresult = function(event){
    conseole.log(event);

}

btn.addEventListener('click', () =>{
    recognition.start();
});





