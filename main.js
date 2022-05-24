song = "";

function preload() {
  song = loadSound("music.mp3");
}

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

scoreLeftwrist = 0;
scoreRightwrist = 0;

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded() {

  console.log("poseNet is initialized");
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);

    scoreLeftwrist = results[0].pose.keypoints[9].score;
    console.log("scoreLeftwrist = " + scoreLeftwrist);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX =" + rightWristX + "rightWristY = " + rightWristY);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX =" + leftWristX + "leftWristY = " + leftWristY);
  }
}

function draw() {
  image(video, 0, 0, 600, 500);

 fill("red");
 stroke("black");

 if(scoreRightwrist > 0.2){

  circle(rightWristX,rightWristY,20);

  if(rightWristY > 0 && rightWristY <=100){
    document.getElementById("label_speed").innerHTML = "speed = 0.5x";
    song.rate(0.5);
  }
  else if(rightWristY > 100 && rightWristY <=200){
    document.getElementById("label_speed").innerHTML = "speed = 1.0x";
    song.rate(1);
  }
  else if(rightWristY > 200 && rightWristY <=300){
    document.getElementById("label_speed").innerHTML = "speed = 1.5x";
    song.rate(1.5);
  }
  else if(rightWristY > 300 && rightWristY <=400){
    document.getElementById("label_speed").innerHTML = "speed = 2.0x";
    song.rate(2);
  }
  else if(rightWristY > 400){
    document.getElementById("label_speed").innerHTML = "speed = 2.5x";
    song.rate(2.5);
  }


 }
 
 if(scoreLeftwrist > 0.2){
 circle(leftWristX,leftWristY,20);
 leftWristyno = Number(leftWristY);
 roundwristy = floor(leftWristyno);
 volume = roundwristy/500;
 document.getElementById("label_volume").innerHTML = "volume = " + volume;
 song.setVolume(volume);
 }
}

function play() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}