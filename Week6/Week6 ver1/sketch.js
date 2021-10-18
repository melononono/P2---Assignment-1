//This code uses in class code examples such as 3circles-3sounds and loadSounds to demonstrate my ideas. I have also taken some code examples and references from the p5js website to use in this code. https://p5js.org/

let serial;
let latestData = "waiting for data";
let splitter;
let func1 = 0,
    func2 = 0,
    func3 = 0;
let audio, audio2;


function setup() {
    audio = createAudio('assets/assets_sounds_veil.mp3');
    audio2 = createAudio('assets/assets_sounds_moon.mp3');
    createCanvas(windowWidth, windowHeight);
    background(89, 177, 218);

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
    background(89, 177, 218);
    textSize(20);
    fill(255);
    text(latestData, 20, 80);
    text('Click to enable sound!', 20, 30);
    Button();
    Pot();
    Light();
}

function Button() { //When the button is pressed, a sound plays
    if (func1 == 1) {
        audio.play();
    }
    if (func1 == 0) {
        audio.stop;
    }
}

function Pot() { //When pot is turned, the screen turns black
    if (func2 == 0) {
        background(0);
    }
    if (func2 == 1) {
        background(89, 177, 218);
    }
}

function Light() { //When light is completely covered, a sound plays
    if (func3 < 1) {
        audio2.play();
    }
    if (func3 > 1) {
        audio2.stop();
    }

}
