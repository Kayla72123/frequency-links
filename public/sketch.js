let socket = io();
let slider1 = document.querySelector('#rotationSlider');
let slider2 = document.querySelector('#scaleSlider');
let slider3 = document.querySelector('#skewSlider');

let restartBtn = document.querySelector('#restartBtn')
let blackScreen = document.querySelector('#blackScreen')
let realMonroe = document.querySelector('#realMonroe')

let laughter = document.querySelector("#laughter");
laughter.volume = 0;
let crying = document.querySelector("#crying");
crying.volume = 0;
let whisper = document.querySelector("#whisper");
whisper.volume = 0;

///sliders
slider1.addEventListener("input", function(e) {
    console.log(this.value);
   socket.emit("rotation", this.value);
   crying.play();
} ); 

slider2.addEventListener("input", function(e) {
    console.log(this.value);
   socket.emit("scale", this.value);

   whisper.play();
} ); 

slider3.addEventListener("input", function(e) {
    console.log(this.value);
   socket.emit("skew", this.value);

   laughter.play();
} ); 

///responses
socket.on('scaleResponse', (data) => {
    document.querySelector("#leftEye").style.transform = `scale(${data})`
    console.log("someone changed rotation to " + data);
    whisper.volume = Math.abs(Number(data) - 1) * 0.2;
});

socket.on('rotationResponse', (data) => {
    document.querySelector("#rightEye").style.transform = `rotate(${data}deg)`
    console.log("someone changed rotation to " + data);
    
    crying.volume = Math.abs(Number(data)) / 180;
});

socket.on('skewResponse', (data) => {
    document.querySelector("#smile").style.transform = `skew(${data}deg)`
    console.log("someone changed skew to " + data);

    laughter.volume = Math.abs(Number(data)) / 80;
});

//black screen button
restartBtn.addEventListener("click", function() {
    realMonroe.style.display = "flex";
    blackScreen.style.display = "flex";

    laughter.pause();
    crying.pause();
    whisper.pause();

setTimeout(function() {
        blackScreen.style.opacity = "0";
    }, 10000);
});