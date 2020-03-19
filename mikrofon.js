const btn =document.querySelector('.talk')

var timer;


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "da";

recognition.onstart = function (){
 console.log('Stemmer lytter');

}
 
recognition.onresult = function(event){
    const ord = event.resultIndex;
    const transcript = event.results[ord][0].transcript;
    console.log(transcript);

}

btn.addEventListener('click', () =>{
    recognition.start();
    if (timer < 0){
        console.log("stopper med at lytte");
    }
    
    setTimeout(btn.addEventListener()),3000);

    recognition.onspeechend = function() {
        recognition.stop();
        console.log('Speech recognition has stopped.');
      }
      /*function nedtælling(){
        timer = 5;
        setInterval (nedtælling)(){
            timer--;
            if (counter === 0){

            }
        }

      }*/
});





