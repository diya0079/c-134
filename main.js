img="";
status="";
object=[];


function preload() {
img=loadImage('dog_cat.jpg');
}

function setup() {
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.hide();
objectdetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status:dectecting objects";

}
function modelLoaded() {
    console.log("model is loaded");
    status=true;
    objectdetector.detect(video,gotresult);
}

function gotresult(error,results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    object=results;

}

function draw() {
    image(video,0,0,380,380);
    if(status!="") {
        r=random(255);
        g=random(255);
        b=random(255);
        objectdetector.detect(video,gotresult);
        for(r=0;r<object.length;r++) {
            document.getElementById("status").innerHTML="status:objects detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are:"+object.length;
            fill(r,g,b);
            percent=floor(object[r].confidence*100);
            text(object[r].label+""+percent+"%",object[r].x,object[r].y);
            noFill();
            stroke(r,g,b);
            rect(object[r].x,object[r].y,object[r].width,object[r].height);

        }
    }
}