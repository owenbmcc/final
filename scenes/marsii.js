class marsii extends Scene {


    preload() {

        //Main character - Astronaut
        this.walkright = loadSpriteSheet('images/marsii/astwalkr.png', 64, 128, 8);
        this.walkleft = loadSpriteSheet('images/marsii/astwalkl.png', 64, 128, 8);
        this.walkup = loadSpriteSheet('images/marsii/astwalku.png', 64, 128, 8);
        this.walkdown = loadSpriteSheet('images/marsii/astwalkd.png', 64, 128, 8);
        //this.idle = loadSpriteSheet('images/marsii/astidleslow.png', 64, 128, 12);
        this.idle = loadSpriteSheet('images/marsii/astidle.png', 64, 128, 15);
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
        
        var staticAlienSheet = loadSpriteSheet('/images/marsii/npcs/staticAlien.png', 64, 128, 8);
		this.staticAlien = new NPC(400, -600, staticAlienSheet, "Hi. you need me for energy.");
        
        var cosmicAlienSheet = loadSpriteSheet('/images/marsii/npcs/cosmicAlien.png', 64, 130, 6);
		this.cosmicAlien = new NPC(-2700, -570, cosmicAlienSheet, "Hi. you need me for my power.");
        
        var liquidAlienSheet = loadSpriteSheet('/images/marsii/npcs/liquidAlien.png', 64, 128, 4);
		this.liquidAlien = new NPC(200, 1200, liquidAlienSheet, "Hi. what's up");
       
        var plantAlienSheet = loadSpriteSheet('/images/marsii/npcs/plantAlien.png', 64, 128, 4);
		this.plantAlien = new NPC(-1700, 500, plantAlienSheet, "Hi. what's up");
        
        var creepAlienSheet = loadSpriteSheet('/images/marsii/npcs/creepAlienB.png', 252, 252, 5);
		this.creepAlien = new NPC(-1800, 1600, creepAlienSheet, "Hi. you need me for my strength.");

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
        
        this.liquidAlien.setup();
		this.cosmicAlien.setup();
		this.staticAlien.setup();
        this.plantAlien.setup();
        this.creepAlien.setup();
        
    }

    start() {
//		this.bg.play();
//		this.bg.loop();
		this.map.start();
	}
	
	end() {
		//this.bg.pause();	
	}
	
    draw() {

        //map maybe big, helps to have camera
        if (mouseIsPressed)
            camera.zoom = 0.3;
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

        if (keyIsDown(RIGHT_ARROW) && this.character.x) {
            this.character.speedX = 15;
            isWalkingR = true;
        } else if (keyIsDown(LEFT_ARROW) && this.character.x) {
            this.character.speedX = -15;
            isWalkingL = true;
        } else {
            this.character.speedX = 0;
        }

        if (keyIsDown(DOWN_ARROW)) {
            this.character.speedY = 15;
            isWalkingD = true;
        } else if (keyIsDown(UP_ARROW)) {
            this.character.speedY = -15;
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
        

         /* check npcs */
		this.staticAlien.display();
        
        this.liquidAlien.display();
		
        this.creepAlien.display();
        
        this.plantAlien.display();
        
		this.cosmicAlien.display();
		if (this.cosmicAlien.overlap(this.character)) {
			/* style dialog */
			textSize(10);
			fill('purple');
			stroke('black');
			strokeWeight(1);
			this.cosmicAlien.displayDialog();
			
		}

    }


}
/* json stuff I need later
{
    "scenery": {
        "background": {
			"img":	"images/marsii/testmap.png",
			"width": 4830,
			"height": 3150,
			"frames": 1,
			"positions": [
				{ "x": 2415, "y": 1575 }
			]
		}
	},
    
    "scenery": {
        "background": {
			"img":	"images/marsii/testset.png",
			"width": 1200,
			"height": 1000,
			"frames": 1,
			"positions": [
				{ "x": 700, "y": 600 }
			]
		}
	},
    
    
    
    
    "npc": {
		"static": {
			"img": "images/marsii/npcs/staticAlien.png",
			"width": 64,
			"height": 128,
			"frames": 8,
			"x": 1000,
			"y": 400,
			"dialog": "H?, you need me for energy."
		},
		"cosmica": {
			"img": "images/marsii/npcs/cosmicAlien.png",
			"width": 64,
			"height": 128,
			"frames": 6,
			"x": 1000,
			"y": 400,
			"dialog": "Hey, you need me to mark your map, freeze liquid,  ."
		},
		"creep": {
			"img": "images/marsii/npcs/creepAlien.png",
			"width": 126,
			"height": 126,
			"frames": 5,
			"x": 1000,
			"y": 400,
			"dialog": "Greetings, you need me to lift your ship, or for my translator ."
		},
		"branch": {
			"img": "images/marsii/npcs/plantAlien.png",
			"width": 64,
			"height": 128,
			"frames": 4,
			"x": 900,
			"y": 1000,
			"dialog": "Hello, you need me to for my ship, or to repair yours ."
		},
		"liqua": {
			"img": "images/marsii/npcs/liquidAlien.png",
			"width": 64,
			"height": 128,
			"frames": 4,
			"x": 2800,
			"y": 2400,
			"dialog": "Hi, you need me for a map and tools, or a key ."
		}
*/
/*
        var spriteSheet = loadSpriteSheet('/images/marsii/npcs/staticAlien.png', 64, 128, 8);
		this.sceneLinkS = new NPC(-900, 420, spriteSheet, "Hi. you need me for energy.");
        
        var spriteSheet = loadSpriteSheet('/images/marsii/npcs/cosmicAlien.png', 64, 130, 6);
		this.sceneLink = new NPC(1200, 1200, spriteSheet, "Hi");

        var spriteSheet = loadSpriteSheet('/images/marsii/npcs/liquidAlien.png', 64, 128, 4);
		this.sceneLinkL = new NPC(200, 1200, spriteSheet, "Hi");
        */