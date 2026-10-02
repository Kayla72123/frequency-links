let socket = io();
let slider1 = document.querySelector('#rotationSlider');
let slider2 = document.querySelector('#scaleSlider');

slider1.addEventListener("input", function(e) {
    console.log(this.value);
   socket.emit("rotation", this.value);
} ); 

slider2.addEventListener("input", function(e) {
    console.log(this.value);
   socket.emit("scale", this.value);
} ); 

socket.on('rotationResponse', (data) => {
    document.querySelector("#rightEye").style.transform = `rotate(${data}deg)`
    console.log("someone changed rotation to " + data);
    
});

socket.on('scaleResponse', (data) => {
    document.querySelector("#leftEye").style.transform = `scale(${data})`
    console.log("someone changed rotation to " + data);
    
});

