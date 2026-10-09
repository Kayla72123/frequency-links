let socket = io();
let slider1 = document.querySelector('#rotationSlider');
let slider2 = document.querySelector('#scaleSlider');
let slider3 = document.querySelector('#skewSlider');

let laughter = document.querySelector("#laughter");
laughter.volume = 0;

let crying = document.querySelector("#crying");
crying.volume = 0;


slider1.addEventListener("input", function(e) {
    console.log(this.value);
   socket.emit("rotation", this.value);
   crying.play();
} ); 

slider2.addEventListener("input", function(e) {
    console.log(this.value);
   socket.emit("scale", this.value);
} ); 

slider3.addEventListener("input", function(e) {
    console.log(this.value);
   socket.emit("skew", this.value);

   laughter.play();
} ); 



socket.on('scaleResponse', (data) => {
    document.querySelector("#leftEye").style.transform = `scale(${data})`
    console.log("someone changed rotation to " + data);
    
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
