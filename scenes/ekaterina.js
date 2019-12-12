class ekaterina extends Scene {

    preload() {

        // sprite sheet - src, width, height, number of sprites
        this.mousemovesright = loadSpriteSheet('images/ekaterina/mousemovesright.png', 150, 93, 4);
        this.mousemovesleft = loadSpriteSheet('images/ekaterina/mousemovesleft.png', 150, 93, 4);
        this.mouseidle = loadSpriteSheet('images/ekaterina/mouseidle.png', 100, 106, 15);


        this.lionmovesright = loadSpriteSheet('images/ekaterina/lionmovesright.png', 400, 212, 11);
        this.lionmovesleft = loadSpriteSheet('images/ekaterina/lionmovesleft.png', 400, 212, 11);
        this.lionidle = loadSpriteSheet('images/ekaterina/lionidle.png', 200, 216, 15),

            //this.remixSound = loadSound('sounds/ekaterina/remix.mp3');

            this.MouseSounds = [];
        this.MouseSounds[0] = loadSound('sounds/ekaterina/mousemoves.mp3');
        this.MouseSounds[0].playMode('sustain');

        this.LionSounds = [];
        this.LionSounds[0] = loadSound('sounds/ekaterina/lionmoves.mp3');
        this.LionSounds[0].playMode('sustain');

        this.WinSound = [];
        this.WinSound[0] = loadSound('sounds/ekaterina/winsound.mp3');
        this.WinSound[0].playMode('sustain');


        /*
			you don't need two maps
			you can combine obstacles and scenery in one map
        */
        this.obstacles = new Map();
        this.obstacles.preload('data/obstacles.json');

        this.map = new Map();
        this.map.preload('data/ekaterina.json');

        var spriteSheet = loadSpriteSheet('images/ekaterina/gateway.png', 350, 350, 4);
        this.sceneLink = new NPC(-100, 400, spriteSheet);

        this.sky = new Map();
        this.sky.preload('data/sky.json');
    }


    setup() {


        /* 
        	different character should have different animation sets 
        	you should not be making your own classes for characters if the only difference is the position of the character
        	see below
        	also i recommend just using this.lion and this.mouse for simpler variable names
        */
        const mouseAnimations = {
            mousemovesright: loadAnimation(this.mousemovesright),
            mousemovesleft: loadAnimation(this.mousemovesleft),
            mouseidle: loadAnimation(this.mouseidle),
        };

        this.characterMouse = new Character(mouseAnimations);
        /* 
			position should be set relative to the screen
			otherwise the y could be cropped out
        */
        this.characterMouse.x = width - 100;
        this.characterMouse.y = height / 2;
        this.characterMouse.changeAnimation('mouseidle');

        const lionAnimations = {
            lionmovesright: loadAnimation(this.lionmovesright),
            lionmovesleft: loadAnimation(this.lionmovesleft),
            lionidle: loadAnimation(this.lionidle),
        };

        this.characterLion = new Character(lionAnimations);
        this.characterLion.x = 540;
        this.characterLion.y = 400;
        this.characterLion.changeAnimation('lionidle');

        this.obstacles.setup();

        this.map.setup();
        this.sceneLink.setup();
        this.sky.setup();



    }

    start() {
        /* need to start the map */
        this.sky.start();

        /* 
        	if you don't use map.move or map.update this will center the map
        */
        this.map.center();

        //this.remixSound.play();
    }

    draw() {
        background(255);
        // this.characterMouse.update();
        // this.characterMouse.display();
        // 
        // this.characterLion.update();
        // this.characterLion.display();


        /* user input - move character around */
        var isWalkingRightLion = false;
        var isWalkingLeftLion = false;

        var isWalkingRightMouse = false;
        var isWalkingLeftMouse = false;


        if (keyIsDown(88)) //Key X 
        {
            this.characterLion.speedX = 7;
            isWalkingRightLion = true;
        } else if (keyIsDown(90)) //Key Z 
        {
            this.characterLion.speedX = -7;
            isWalkingLeftLion = true;
        } else {
            this.characterLion.speedX = 0;
        }

        if (keyIsDown(RIGHT_ARROW)) {
            this.characterMouse.speedX = 7;
            isWalkingRightMouse = true;
        } else if (keyIsDown(LEFT_ARROW)) {
            this.characterMouse.speedX = -7;
            isWalkingLeftMouse = true;
        } else {
            this.characterMouse.speedX = 0;
        }

        /* need the else statement at the end for both */
        if (isWalkingRightLion) {
            this.characterLion.changeAnimation('lionmovesright');
            if (this.LionSounds.every(sound => sound.isPlaying() == false))
                random(this.LionSounds).play();
        } else if (isWalkingLeftLion) {
            this.characterLion.changeAnimation('lionmovesleft');
            if (this.LionSounds.every(sound => sound.isPlaying() == false))
                random(this.LionSounds).play();
        } else {
            this.characterLion.changeAnimation('lionidle');
        }



        if (isWalkingRightMouse) {
            this.characterMouse.changeAnimation('mousemovesright');
            if (this.MouseSounds.every(sound => sound.isPlaying() == false))
                random(this.MouseSounds).play();
        } else if (isWalkingLeftMouse) {
            this.characterMouse.changeAnimation('mousemovesleft');
            if (this.MouseSounds.every(sound => sound.isPlaying() == false))
                random(this.MouseSounds).play();
        } else {
            this.characterMouse.changeAnimation('mouseidle');
        }

        /*
        	obstacles map cant move based on both characters
        	needs to be one or neither
        	lets discuss in class	
        */

        this.characterLion.update();
        this.characterMouse.update();

        //		this.obstacles.collide(this.characterLion);
        //		this.obstacles.collide(this.characterMouse);


        /* non moving map */
        camera.off();
        this.sky.display();
        camera.on();

            this.obstacles.move(this.characterLion);
        } else {
            this.obstacles.move(this.characterMouse);
        }



        //        

        //        

        
        this.map.display();
        this.obstacles.display();
        this.obstacles.collide(this.characterLion);
        
        
        /* this is happening twice for some reason
        	commented it out up top */

        this.characterLion.display();
        this.characterMouse.display();



        this.sceneLink.display();
        if (this.sceneLink.overlap(this.characterMouse)) {
            changeScene('mousewins');
            if (this.WinSound.every(sound => sound.isPlaying() == false))
                random(this.WinSound).play();
        }

        this.sceneLink.display();
        if (this.sceneLink.overlap(this.characterLion)) {
            changeScene('lionwins');
            if (this.WinSound.every(sound => sound.isPlaying() == false))
                random(this.WinSound).play();
        }

        /* 
        	don't do this it will reload the entire site
        	you can just restart the scene
        */
        if (keyIsDown(ENTER)) {
            // location.reload(); 
            changeScene('ekaterina');
        }
    }

}
