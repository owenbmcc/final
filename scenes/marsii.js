class marsii extends Scene {


    preload() {

        //Main character - Astronaut
        this.walkright = loadSpriteSheet('images/marsii/astwalkr.png', 64, 128, 8);
        this.walkleft = loadSpriteSheet('images/marsii/astwalkl.png', 64, 128, 8);
        this.walkup = loadSpriteSheet('images/marsii/astwalku.png', 64, 128, 8);
        this.walkdown = loadSpriteSheet('images/marsii/astwalkd.png', 64, 128, 8);
        this.idle = loadSpriteSheet('images/marsii/astidleslow.png', 64, 128, 12);
        //this.idle = loadSpriteSheet('images/marsii/astidle.png', 64, 128, 6);
        //this.startSet = loadImage('images/marsii/testmap.png', 4830 , 3150);
      /*  
        this.walkSounds = [];
		this.walkSounds[0] = loadSound('sounds/marsii/asttalk.wav');
		
		this.walkSounds[0].playMode('sustain');
        
        this.talkSounds = [];
		this.talkSounds[0] = loadSound('sounds/marsii/footsteps.wav');

		this.talkSounds[0].playMode('sustain');
        
        this.bgSounds = [];
		this.bgSounds[0] = loadSound('sounds/marsii/goodjob.wav'); //used when task completed
        this.bgSounds[1] = loadSound('sounds/marsii/select.wav'); //used when selecting dialogue and path

		this.bgSounds[0].playMode('sustain');
        this.bgSounds[1].playMode('sustain');
        */
		this.map = new Map();
        this.map.preload('data/marsii.json');
		
    }

    setup() {


        const animations = {

            //Main character directional and idle animation
            walkright: loadAnimation(this.walkright),
            walkleft: loadAnimation(this.walkleft),
            walkup: loadAnimation(this.walkup),
            walkdown: loadAnimation(this.walkdown),
            idle: loadAnimation(this.idle)

        };

        this.character = new Character(animations);
        this.character.changeAnimation('idle');

        this.map.setup();
          
    }
    /*
    start() {
//		this.bg.play();
//		this.bg.loop();
		this.map.start();
	}
	
	end() {
		//this.bg.pause();	
	}
	*/
    draw() {

        //map maybe big, helps to have camera
        if (mouseIsPressed)
            camera.zoom = 0.5;
        else
            camera.zoom = 1;
        /*
    //bg = this.startSet;
         //.5 zoom is zooming out (50% of the normal size)

    
   */

        //camera.position.x = this.sprite.position.x;
        //camera.position.y = this.sprite.position.y;


        //background(this.startSet);
        textSize(10);
        //background('DarkBlue');
        fill('black');
        textAlign(CENTER, 100);
        text("Naomi's Scene", width / 2, height / 2);

        //this.character.update();
        //this.character.display();

        // user input - move character around 

        var isWalkingR = false;
        var isWalkingL = false;
        var isWalkingU = false;
        var isWalkingD = false;

        if (keyIsDown(RIGHT_ARROW)) {
            this.character.speedX = 5;
            isWalkingR = true;
        } else if (keyIsDown(LEFT_ARROW)) {
            this.character.speedX = -5;
            isWalkingL = true;
        } else {
            this.character.speedX = 0;
        }

        if (keyIsDown(DOWN_ARROW)) {
            this.character.speedY = 5;
            isWalkingD = true;
        } else if (keyIsDown(UP_ARROW)) {
            this.character.speedY = -5;
            isWalkingU = true;
        } else {
            this.character.speedY = 0;
        }

        if (isWalkingR) {
            this.character.changeAnimation('walkright');
        } else if (isWalkingL) {
            this.character.changeAnimation('walkleft');
        } else if (isWalkingD) {
            this.character.changeAnimation('walkdown');
        } else if (isWalkingU) {
            this.character.changeAnimation('walkup');
        } else {
            this.character.changeAnimation('idle');
        }
		/* update map */
		this.map.collide(this.character);
		this.map.move(this.character);
//		this.map.update(this.character);
		this.map.display();
        
        /* update character */
		this.character.update();
		this.character.display();
    }


}
