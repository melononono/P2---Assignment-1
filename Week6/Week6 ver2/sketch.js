//This code uses in class code examples such as 3circles-3sounds and loadSounds to demonstrate my ideas. I have also taken some code examples and references from the p5js website to use in this code. https://p5js.org/

let serial;
let latestData = "waiting for data";
let splitter;
let func1 = 0,
    func2 = 0,
    func3 = 0;
let audio, audio2;


function setup() {
    audio = createAudio('assets/assets_sounds_pinwheel.mp3');
    audio2 = createAudio('assets/assets_sounds_squiggle.mp3');
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < width / 10; i++) {
        particles.push(new Particle());
    }
    background(240, 96, 109);

    serial = new p5.SerialPort();

    serial.list();
    serial.open('COM3');

    serial.on('connected', serverConnected);

    serial.on('list', gotList);

    serial.on('data', gotData);

    serial.on('error', gotError);

    serial.on('open', gotOpen);

    serial.on('close', gotClose);
}

function serverConnected() {
    print("Connected to Server");
}

function gotList(thelist) {
    print("List of Serial Ports:");

    for (let i = 0; i < thelist.length; i++) {
        print(i + " " + thelist[i]);
    }
}

function gotOpen() {
    print("Serial Port is Open");
}

function gotClose() {
    print("Serial Port is Closed");
    latestData = "Serial Port is Closed";
}

function gotError(theerror) {
    print(theerror);
}

function gotData() {
    splitter = split(latestData, ','); //Splitting the input into 3
    func1 = splitter[0];
    func2 = splitter[1];
    func3 = splitter[2];

    let currentString = serial.readLine();
    trim(currentString);
    if (!currentString) return;
    console.log(currentString);
    latestData = currentString;

}

function draw() { //General setup of instructions
    background(240, 96, 109);
    textSize(20);
    fill(255);
    text(latestData, 20, 80);
    text("Click to enable sound!", 20, 30);
    Button();
    Light();

    noStroke();
    fill('rgb(255, 210, 219)');
    ellipse(500, 500, func2, func2); //When pot is turned, the circle hidden on screen expands
    ellipseMode(RADIUS);
}

function Button() { //When button is pressed, the screen becomes white and sound is played
    if (func1 == 1) {
        audio.play();
        background(255);
    }
    if (func1 == 0) {
        audio.stop;
    }
}

function Light() { //When there's no light, the page changes colour with particles flowing in the background
    if (func3 == 1) {
        audio.stop;
        background(0, 0, 0);
    }
    if (func3 == 0) {
        audio2.play();
        text("Lights off");
        background(89, 177, 218);
        for (let i = 0; i < particles.length; i++) {
            particles[i].createParticle();
            particles[i].moveParticle();
            particles[i].joinParticles(particles.slice(i));
        }

    }

}

//The following code below was all taken from the p5js with some minor changes to the code

// this class describes the properties of a single particle.
class Particle {
    // setting the co-ordinates, radius and the
    // speed of a particle in both the co-ordinates axes.
    constructor() {
        this.x = random(0, width);
        this.y = random(0, height);
        this.r = random(1, 8);
        this.xSpeed = random(-2, 2);
        this.ySpeed = random(-1, 1.5);
    }

    // creation of a particle.
    createParticle() {
        noStroke();
        fill('rgba(255, 255, 255, 1)');
        circle(this.x, this.y, this.r);
    }

    // setting the particle in motion.
    moveParticle() {
        if (this.x < 0 || this.x > width)
            this.xSpeed *= -1;
        if (this.y < 0 || this.y > height)
            this.ySpeed *= -1;
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    // this function creates the connections(lines)
    // between particles which are less than a certain distance apart
    joinParticles(particles) {
        particles.forEach(element => {
            let dis = dist(this.x, this.y, element.x, element.y);
            if (dis < 85) {
                stroke('rgba(255, 255, 255, 1)');
                line(this.x, this.y, element.x, element.y);
            }
        });
    }
}

// an array to add multiple particles
let particles = [];
