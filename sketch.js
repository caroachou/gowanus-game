let handpose;
let video;
let predictions = [];
let microbes = [];
let bactA;
let bactB;
let bactC;
let bactD;
let bactF;
let bactG;
let bactR;
let bactR2;
let Resistant;
let mercury;
let lead;
let metals = [];
let waterLevel = 250;
let videoWidth = 640;
let videoHeight = 480;
let indent = 10;
let population = 80;
let metalContaminants = 15;
let lifespan = 1500;
const maxPopulation = 100;
let metalCountText;
let metalsRemoved;
let hydrogelWidth = 100;
let hydrogelHeight = 50;
let isModelLoaded = false;

let sound;
let win;


function preload() {
  video = createCapture(VIDEO);

  video.hide();

  handpose = ml5.handpose(video, () => {
    console.log("Model ready!");
    sound = loadSound("bloop.mp3");
  
    win = loadSound("win.wav");

    isModelLoaded = true;
  });
  bactA = loadImage("bactA.png");
  bactB = loadImage("bactB.png");
  bactC = loadImage("bactC.png");
  bactD = loadImage("bactD.png");
  bactF = loadImage("bactF.png");
  bactG = loadImage("bactG.png");
  bactR = loadImage("bactR.png");
  bactR2 = loadImage("bactR2.png");
  Resistant = loadImage("Resistant.png");
  mercury = loadImage("mercury.png");
  lead = loadImage("lead.png");
}

function setup() {
  createCanvas(1200, 800);

  video.hide();

  handpose.on("predict", (results) => {
    predictions = results;
  });

  for (let i = 0; i < population; i++) {
    let type = int(random(8));
    let position = createVector(random(width), random(waterLevel, height));
    let dna = new DNA();
    microbes.push(new Microbe(position, type, dna));
  }

  for (let i = 0; i < metalContaminants; i++) {
    metals.push(new Metal(random(width), random(waterLevel, height)));
  }
}

function draw() {
  if (!isModelLoaded) return;
  background(0);
  drawGradientBackground();

  push();
  fill(0);
  noStroke();
  textSize(19);
  textAlign(CENTER);
  text(
    "lift your hand to activate the hydrogel which will attract the lead. bring all the lead out of the water to remove pollution",
    width / 2,
    60
  );
  pop();

  textSize(24);
  fill(255);
  strokeWeight(3);
  stroke(0);
  textAlign(LEFT);
  text("Gowanus Canal", indent, 30);
  text("sediment", indent, height - 125);
  text("water", indent, waterLevel);
  text("sediment", indent, height - 125);

  textAlign(RIGHT);
  text("Metals Removed: " + (metalsRemoved + "%"), width - 10, 30);

  for (let i = microbes.length - 1; i >= 0; i--) {
    let microbe = microbes[i];
    microbe.display();
    microbe.move();
    microbe.contact(metals);
    if (microbe.dead()) {
      microbes.splice(i, 1);
    } else {
      let clone = microbe.reproduce();
      if (clone) {
        microbes.push(clone);
      }
    }
  }

  for (let j = 0; j < metals.length; j++) {
    let metal = metals[j];
    metal.move();
    metal.display();
    metal.returnToInitialMovement();
  }

  metalsRemoved = round((1 - metals.length / metalContaminants) * 100);
 

  drawHydrogel();
  attractMetals();
}

function drawHydrogel() {
  if (predictions[0]) {
    // predictions[0] is the first hand data detected by the model
    // ['landmarks'][9] is the 9th point postion of the first hand detected
    // https://developers.google.com/mediapipe/solutions/vision/hand_landmarker
    let center = predictions[0]["landmarks"][9];
    fill(255, 255, 255);
    let ellipseX = map(center[0], 0, videoWidth, 0, width);
    let mirrorEllipseX = width - ellipseX;
    let ellipseY = map(center[1], 0, videoHeight, 0, height);
    ellipse(mirrorEllipseX, ellipseY, hydrogelWidth, hydrogelHeight, 90);
  }
}

function attractMetals() {
  predictions.forEach((prediction) => {
    prediction.landmarks.forEach((landmark) => {
      let targetX = map(landmark[0], 0, videoWidth, 0, width);
      let mirrorTargetX = width - targetX;
      let targetY = map(landmark[1], 0, videoHeight, 0, height);
      let target = createVector(mirrorTargetX, targetY);

      metals.forEach((metal, index) => {
        metal.attract(target);
        if (metal.isAttracted(target) && metal.pos.y < waterLevel - 50) {
          metals.splice(index, 1);
          sound.play();
        }
      });
    });
  });

  if (metals.length === 0) {
    win.play();
    for (let i = 0; i < metalContaminants; i++) {
      metals.push(new Metal(random(width), random(waterLevel, height)));
    }
  }
}
function drawGradientBackground() {
  for (let y = 0; y <= height - 150; y++) {
    let inter = map(y, 0, waterLevel, 0, 1);
    let c = lerpColor(color(86, 170, 255), color(84, 112, 42), inter);

    stroke(c);
    line(0, y, width, y);
  }
}
