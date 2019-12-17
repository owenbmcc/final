//1st scene
class ekaterinaStart extends Scene {

    preload() {

//        this.menu = new EkaterinaMap();
//        this.menu.preload('data/ekaterina/menu.json');

        this.begin = loadImage('images/ekaterina/begin.gif');
        
        this.bg = loadImage('images/ekaterina/menu.png');

        this.remix = loadSound('sounds/ekaterina/remix.mp3');
        this.remix.setVolume(0.3);

        this.press = loadSound('sounds/ekaterina/press.mp3');
        this.press.setVolume(1.0);
    }


    setup() {

        //        createCanvas(1435, 735);
        this.nextScene = false;

    }

    start() {

    }

    draw() {

//        this.menu.display();
        camera.off();
//        imageMode(CENTER);
        image(this.bg, 0, 0);
        image(this.begin, 400, 600);
        camera.on();

        if (keyIsPressed) {
            if (keyIsDown(ENTER)) {
                this.nextScene = true;
            }
        } else if (this.nextScene) {
            changeScene('ekaterinaInstructions');
            this.remix.loop();
            this.press.play();
        }
    }

    end() {

//        this.menu.end();
    }

}