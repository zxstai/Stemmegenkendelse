const btn =document.querySelector('.talk')

var timer;

var noegleord = [
    {
     "biblotek": ["biblo", "bøger", "bog", "låne", "udlån", "aflevere", "lokale 14"]
    }

    /*{"fysik":71},{"fysiklaboratoriet":71},{"andreas":71},{"george":71},

    {"information":100},{"studieadministration":100},{"oplysning":100}, 
    {"kontor":101},{"ledelse":101},{"rektor":101},{"leder":101},
    {"kantine":102},{"mad":102},{"købe":102}, {"sandwich":102},
    {"nordsal":103}, {"sal":103}, {"nordsalen":103}, {"nord":103}, 
    {"innolab":104}, {"inno":104}

    // Mangler lokale 63 og 21, det er sammensat ord. 
*/
    ];
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "da";

recognition.onstart = function (){
 console.log('Stemmer lytter');

} 

/*Ørecognition.onresult = function(event){
    var transcript = event.results[0][0].transcript;
    console.log(transcript);
    for (e of noegleord) { //noegleord array
        for (k of Object.values(e)[0]){
            if (event.results[0][0].transcript.toLowerCase().includes(k)) {
                console.log("Keyword: " + Object.keys(e));
            }
        }
    }
}
*/
 recognition.onresult = event => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    for (const obj of noegleord) {
        for (const [key, words] of Object.entries(obj)) {
            for (const word of words) {
                if (transcript.includes(word)) {
                    console.log("Keyword: %s", key);
                }
            }
        }
    }
};

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
});



