//--Text forside animation--
//---------------------------------------------------------------------------------------------------------------------
var textWrapper = document.querySelector('.fwhite');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='fwhite'>$&</span>");

anime.timeline({ loop: true })
    .add({
        targets: '.fwhite',
        translateX: [300, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 5000,
        delay: (el, i) => 500 + 30 * i
    }).add({
        targets: '.fwhite',
        translateX: [0, -850],
        opacity: [1, 0],
        easing: "easeInExpo",
        duration: 1200,
        delay: (el, i) => 100 + 30 * i
    });
//---------------------------------------------------------------------------------------------------------------------

//Ordbog til forskellige keywords som vil blive kigget efter i de sætninger som brugeren indtaler.
var noegleord = [
    {
     "biblotek": ["biblo", "bøger", "bog", "låne", "udlån", "aflevere", "lokale 4", "maria", "biblotek", "bibloteket", "bibliotekar", "bibliotekaren"]
    },
    /*{
        "innolab": ["innolab", "innolab 1", "innolab 2", "innolab 3", "inno lab"] //udkommenteret da et kort til Innolab ikke findes lige nu
    },
    */{
        "fysik": ["fysik lokale", "fysik lokalet", "fysiklokale", "andreas", "george", "georg", "geo"]
    },
    /*{
        "kontor": ["ledelse", "rektor", "katrine", "leder", "søren", "vicerektor", "vice rektor"]
    },
    */{
        "kantine": ["mad", "købe sandwich", "sandwich", "dagensret", "dagens ret", "sydsal", "sydsalen", "kantine", "kantinen", "linda"]
    },
    {
        "lokale21": ["klasselokale21","klasse lokale 21","klasse 21", "rum 21"]
    },
    {
        "studieadmin": ["joan", "information", "administration", "4g", "fjerde gear", "pakke", "pakker", "gls pakke", "gls", "postnord", "admin", "staff", "lærer"]
    },
    {
        "nordsal1":["foredrag", "hanne", "eksamsinformation", "eksams information"]
    }
];

//Speech variabler

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

//Funktion til at skjule vores vejvisningskort
 function skjulKort() {
    $("#bibliotek").hide();
    $("#nordsal1").hide();
    $("#studieadmin").hide();
    $("#fysik").hide();
    $("#kantine").hide();
    $("#lokale21").hide();
    $("#error").hide();
}
//Fejlkode skjules
function error() {
    $("#error").hide();
}
//Opstart funktion
$(document).ready(function () {
    //starter med at skjule vores kort
    skjulKort();

    //hvis knappen (grønne mikrofon) bliver trykket på så starte programmet med at lytte efter stemme input fra brugeren
    $(document).on('click',".KNAP", function(event){
        recognition.start();
        $(".lytterTekst").html("Lytter. . .");
        console.log('Lytter');
    })
});



//Stemme genkendelse og DOM manipulation. -------------------------------------------------------------------------------

var timer;

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
    console.log(transcript);
    for (const obj of noegleord) {
        for (const [key, words] of Object.entries(obj)) {
            for (const word of words) {
                if (transcript.includes(word)) {
                    console.log("Keyword: %s", key);
                    console.log(transcript);
                    skjulKort();
                    $("#frontdiv").hide();
                    $("#" + key).show();
                    return;                 
                }
            }
        }
    }
    $("#frontdiv").hide();
    skjulKort();
    $("#error").show();
};

/*knap.addEventListener('click', () => {
    recognition.start();
    if (timer < 0) {
        console.log("stopper med at lytte");

    }

    //setTimeout(btn.addEventListener()),3000);
*/
    recognition.onspeechend = function () {
        recognition.stop();
        $(".lytterTekst").html("");
        console.log('Speech recognition has stopped.');
    };


