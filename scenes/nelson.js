class nelson extends Scene {

    preload() {

        this.walk = loadSpriteSheet('images/Nelson/walking.png', 192, 199, 3);
        this.stand = loadSpriteSheet('images/Nelson/standing.png', 192, 206, 2);

        //this.bg = loadSound('sounds/nelson/');


        this.walkSound = loadSound('sounds/nelson/walking.wav');


        this.walkSound.playMode('sustain');


        this.woodsSheet = loadSpriteSheet('images/Nelson/background.png', 224, 224, 2);

    }

    setup() {
        const animations = {
            walking: loadAnimation(this.walk),
            standing: loadAnimation(this.stand)
        };
        this.character = new Character(animations);
        this.character.changeAnimation('standing');

        //this.map.setup();
        //this.sceneLink.setup();
        //this.woods = new Scenery(width / 2, height / 2, this.woodsSheet);
        //this.woods.sprite.scale = 3;
        //this.woods.setup();
    }

    start() {
        //		this.bg.play();
        //		this.bg.loop();
        //this.map.start();
    }

    end() {
        this.bg.pause();
    }

    draw() {
        background('green');
        //this.woods.display();

        /*instructions*/
        textAlign(CENTER);
        textSize(20);
        text('move the character with arrows', width / 2, 100);


        /* user input - move character around */
        var isWalking = false;
        if (keyIsDown(RIGHT_ARROW)) {
            this.character.speedX = 5;
            isWalking = true;
        } else if (keyIsDown(LEFT_ARROW)) {
            this.character.speedX = -5;
            isWalking = true;
        } else {
            this.character.speedX = 0;
        }

        if (keyIsDown(DOWN_ARROW)) {
            this.character.speedY = 5;
            isWalking = true;
        } else if (keyIsDown(UP_ARROW)) {
            this.character.speedY = -5;
            isWalking = true;
        } else {
            this.character.speedY = 0;
        }

        if (isWalking) {
            this.character.changeAnimation('walking');
            if (this.walkSound.isPlaying() == false) {
                this.walkSound.play();
            }
        } else {
            this.character.changeAnimation('standing');
        }

        this.character.display();
    }
}