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
        duration: 7000,
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

//Ordbog til forskellige keywords
var noegleord = [
    {
        "bibliotek": ["biblo", "bøger", "bog", "låne", "udlån", "aflevere", "lokale 4", "maria", "biblotek", "bibloteket", "bibliotekar", "bibliotekaren"]
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
recognition.lang = 'da';

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

//nedtæller funktion
var timer
function nedtæller (){
    recognition.stop()
    skjulKort();
    $("#frontdiv").show();
    console.log("timedout");

}

//Opstart funktion
$(document).ready(function () {
    //starter med at skjule vores kort
    skjulKort();

    //hvis knappen (grønne mikrofon) bliver trykket på så starte programmet med at lytte efter stemme input fra brugeren
    $(document).on('click',".KNAP", function(event){
        clearTimeout(timer);
        console.log("timer stoppet")//timer stoppet
        recognition.start();
        $(".lytterTekst").html("Lytter. . .");
        console.log('Lytter');
    })
});



//Stemme genkendelse og DOM manipulation. -------------------------------------------------------------------------------
recognition.onresult = event => {
    const transcript = event.results[0][0].transcript.toLowerCase(); //laver det til små bogstaver, da ellers kan der opstå problemer med at nogen egenavne.
    for (const obj of noegleord) {
        for (const [key, words] of Object.entries(obj)) {
            for (const word of words) {
                if (transcript.includes(word)) { //hvis at transscript indeholder vores keyword
                    console.log("Keyword: %s", key); //logger vores keyword
                    console.log(transcript); //hvad er er blevet sagt
                    skjulKort(); //skjuler alle kort (det er til hvis folk har søgt på noget før, så den ikke render det 2 gange oven på hinanden
                    $("#frontdiv").hide(); //skjuler front siden, da vi skal vise et kort lige om lidt
                    $("#" + key).show(); //viser med brug af DOM manipulation
                    //20 sekunders timeout på resultat
                    timer = setTimeout(nedtæller,20000);
                    return; //hvis der ikke kommer et gyldigt resultat, jamen så skal koden ikke køres
                }
            }
        }
    }
    //derfor skal front fjernes (hvis man er på forsiden og siger en ting der ikke giver mening for koden, altså ingen nøgle ord bliver forstået
    $("#frontdiv").hide();
    skjulKort(); //skjuler alle sider
    $("#error").show(); //viser kun error vinduet for at indikere at det folk prøvede at søge om ikke blev korrekt registeret
    setTimeout(nedtæller,10000); //folk har 10 sekunder til at trykke på ny søgning
};



    recognition.onspeechend = function () {
        recognition.stop();
        $(".lytterTekst").html("");
        console.log('Speech recognition has stopped.');
    };
