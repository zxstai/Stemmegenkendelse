const btn =document.querySelector('.talk')

var timer;

var noegleord = [
    {"biblotek":4}, {"biblo":4}, {"bøger":4}, {"bog":4}, {"låne":4}, {"udlån":4}, {"aflevere":4}, 
    {"fysik":71},{"fysiklaboratoriet":71},{"andreas":71},{"george":71},

    {"information":100},{"studieadministration":100},{"oplysning":100}, 
    {"kontor":101},{"ledelse":101},{"rektor":101},{"leder":101},
    {"kantine":102},{"mad":102},{"købe":102}, {"sandwich":102},
    {"nordsal":103}, {"sal":103}, {"nordsalen":103}, {"nord":103}, 
    {"innolab":104}, {"inno":104}

    // Mangler lokale 63 og 21, det er sammensat ord. 

    ];


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
    
    //setTimeout(btn.addEventListener()),3000);

    recognition.onspeechend = function() {
        recognition.stop();
        console.log('Speech recognition has stopped.');
      }
      for (var i=0; i<saetning.length; i++) { for (var j =0; j<noegleord.length; j++) {if(saetning[i] == noegleord[j].name) {noegleFundet = noegleord.val; break}}}
      /*function nedtælling(){
        timer = 5;
        setInterval (nedtælling)(){
            timer--;
            if (counter === 0){

            }
        }

      }*/
});


