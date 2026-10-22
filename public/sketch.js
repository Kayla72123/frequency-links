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

    document.querySelector("#blackBackground").style.display = "block";
    document.body.style.backgroundColor = "black";

    setTimeout(function() {
        blackScreen.style.opacity = "0";

        // setTimeout(function() {
        //     document.querySelector("#ghost").style.opacity = "0.5";
        //     document.querySelector("#ghost").style.transform = "translateX(50px)";
        // }, 4000);

        setTimeout(function() {
            let ghost = document.querySelector("#ghost");
            
            setInterval(function() {
                let x = Math.random() * 40 - 20; 
                let y = Math.random() * 40 - 20;
                
                ghost.style.transform = `translate(${x}px, ${y}px)`;
                ghost.style.opacity = Math.random() * 0.4;

            }, 150);

            setTimeout(function(){
                    document.querySelector("#glitchText").style.display = "block";
                }, 2000);

            // setTimeout(function(){

            //     setInterval(function(){
            //         if (Math.random() > 0.5){
            //             realMonroe.style.opacity = "1";
            // } else{
            //     realMonroe.style.opacity = "0";
            // }
            //     }, 150);
            // }, 5000);

            setTimeout(function() {
                realMonroe.style.opacity = "0";
                setTimeout(function() {
                    realMonroe.style.opacity = "1";
                }, 200);
                
                setTimeout(function() {
                    setInterval(function() {
                        if (Math.random() > 0.5) {
                            realMonroe.style.opacity = "1";
                        } else {
                            realMonroe.style.opacity = "0";
                        }
                    }, 120);
                }, 1800);
                
                setTimeout(function() {
                    document.querySelector("#finalScreen").style.display = "flex";

                    let finalWords = document.querySelector("#finalWords");

                    setTimeout(function() {
                        finalWords.style.opacity = "0";
                    }, 500);

                    setTimeout(function(){
                        finalWords.style.opacity = "1";
                    }, 650);

                    setTimeout(function() {
                        finalWords.style.opacity = "0";
                    }, 700);

                    setTimeout(function(){
                        finalWords.style.opacity = "1";
                    }, 800);


                    setTimeout(function(){
                        document.querySelector("#finalWords").style.display = "none";

                        setTimeout(function(){
                            document.querySelector("#finalScreen").classList.add("errorPage");
                            document.querySelector("#errorText").style.display = "block";
                        }, 1500)
                    }, 3000)
                }, 5000);

            }, 5000);

        }, 4000);

    }, 10000);

});

