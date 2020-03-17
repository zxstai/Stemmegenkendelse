window.onload = function (){

    var constrains = {audio: true, 
                      Video: true};
        navigator.mediaDevices.getUserMedia(constrains).then(function(mediaStream){ 
        var video = document.querySelector('video');
        video.srcObject = mediaStream;
        video.play();
        }).catch(function(err){
            console.log("yikes, an error!")
        })

}