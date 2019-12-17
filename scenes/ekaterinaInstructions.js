//2nd scene
class ekaterinaInstructions extends Scene {

    preload() {

        //        this.instructions = new EkaterinaMap();
        //        this.instructions.preload('data/ekaterina/instructions.json');

        this.instructions = loadImage('images/ekaterina/instructions.png');
        this.startGame = loadImage('images/ekaterina/begin.gif');
        //        this.startGame = new NPCimage(0, 685, startGame);

        this.press = loadSound('sounds/ekaterina/press.mp3');
        this.press.setVolume(1.0);
    }

    setup() {
        //        createCanvas(1435, 735);
//        this.instructions.setup();
//        this.startGame.setup();
    }

    start() {

//        this.instructions.start();
    }

    draw() {

        camera.off();
//        imageMode(CENTER);
        image(this.instructions, 0, 0);
        image(this.startGame, 600, 600);
        camera.on();

        if (keyIsDown(ENTER)) {
            changeScene('ekaterina');
            this.press.play();
        }
    }

    end() {

//        this.instructions.end();
    }

}