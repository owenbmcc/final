//1st scene
class ekaterinaStart extends Scene {

    preload() {

        this.menu = new EkaterinaMap();
        this.menu.preload('data/ekaterina/menu.json');

        var begin = loadImage('images/ekaterina/begin.gif');
        this.begin = new NPCimage(0, 620, begin);

        this.remix = loadSound('sounds/ekaterina/remix.mp3');
        this.remix.setVolume(0.3);

        this.press = loadSound('sounds/ekaterina/press.mp3');
        this.press.setVolume(1.0);
    }


    setup() {

        //        createCanvas(1435, 735);

        this.nextScene = false;
        
        this.menu.setup();
        this.begin.setup();
    }

    start() {

        this.menu.start();
    }

    draw() {

        this.menu.display();
        this.begin.display();

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

        this.menu.end();
    }

}